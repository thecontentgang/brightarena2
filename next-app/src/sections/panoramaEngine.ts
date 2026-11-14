import * as THREE from "three";
import { imageVariants } from "@/lib/responsiveImage";

/**
 * WebGL side of the 360° panorama (see PanoromaSection.tsx). Kept in its own module so three.js is only
 * downloaded - via a dynamic import - when the section approaches the viewport.
 *
 * Rendering policy:
 * - Frames are only drawn while the section is on screen (`setVisible`) and the tab is visible.
 * - When nothing changes (no drag, zoom easing finished, auto-rotate off/idle-wait) the loop goes idle and is
 *   woken by interaction; auto-rotate keeps it running while visible, exactly as before.
 * - The texture is decoded with createImageBitmap (off the main thread) and uploaded to the GPU in strips
 *   across several frames. Together these remove the ~1.5 s main-thread stall the 8192px texture caused
 *   on desktop (decode + one synchronous 128 MB upload).
 */

export interface PanoramaOptions {
  src: string;
  autoRotateSpeed: number;
  reducedMotion: boolean;
  onLoad: () => void;
  onError: () => void;
}

export interface PanoramaController {
  setVisible(visible: boolean): void;
  zoomIn(): void;
  zoomOut(): void;
  resetView(): void;
  dispose(): void;
}

const IDLE_BEFORE_AUTOROTATE_MS = 2500;
/** Pixels uploaded to the GPU per frame while streaming the panorama texture (~4 MB of RGBA). */
const STRIP_PIXELS = 1024 * 1024;

export function createPanorama(container: HTMLElement, opts: PanoramaOptions): PanoramaController {
  const state = {
    lon: 180,
    lat: 0,
    targetFov: 75,
    isDragging: false,
    pointerId: null as number | null,
    lastX: 0,
    lastY: 0,
    lastInteraction: performance.now(),
    frameId: null as number | null,
    visible: false,
    contextLost: false,
    disposed: false,
  };
  const autoRotate = opts.autoRotateSpeed > 0 && !opts.reducedMotion;

  // --- Scene / camera / renderer --------------------------------------
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 1, 1100);
  const scene = new THREE.Scene();
  // Sphere geometry, inverted so the texture renders on the INSIDE (the viewer stands at the centre).
  const geometry = new THREE.SphereGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1);
  const material = new THREE.MeshBasicMaterial();
  scene.add(new THREE.Mesh(geometry, material));

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true });
  } catch {
    // WebGL unavailable or blocked: show the section's error overlay instead of throwing.
    geometry.dispose();
    material.dispose();
    opts.onError();
    return { setVisible() {}, zoomIn() {}, zoomOut() {}, resetView() {}, dispose() {} };
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Compile + link the shader now, while the GPU is idle. The program for a textured material is the same
  // whatever the texture, so a 1x1 white placeholder (what the untextured sphere showed behind the loading
  // overlay before) lets the real texture swap in later without a blocking link-status check queued behind
  // the 128 MB texture upload.
  const placeholder = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
  placeholder.colorSpace = THREE.SRGBColorSpace;
  placeholder.needsUpdate = true;
  material.map = placeholder;
  renderer.render(scene, camera);

  // --- Texture: same variant choice as before -----------------------------
  // Desktop GPUs that support 8192px textures keep the full-resolution sphere; phones and smaller GPUs get
  // 4096/2048px. Falls back to the original file if no build-time variants exist.
  const maxTexture = renderer.capabilities.maxTextureSize;
  const wanted = window.innerWidth >= 1024 && maxTexture >= 8192 ? 8192 : Math.min(4096, maxTexture);
  const variants = imageVariants(opts.src).filter((v) => v.width <= wanted);
  const textureSrc = variants.length ? variants[variants.length - 1].url : opts.src;

  let texture: THREE.Texture | null = null;
  const onTexture = (t: THREE.Texture) => {
    if (state.disposed) { t.dispose(); return; }
    texture = t;
    material.map = t; // same shader variant as the placeholder: no recompile/relink
    placeholder.dispose();
    opts.onLoad();
    invalidate();
  };
  const onTextureError = () => { if (!state.disposed) opts.onError(); };
  const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  // Resolve once the GPU has executed everything submitted so far, polling a fence once per frame.
  // (Fence status queries never block in WebGL 2, unlike readbacks such as getParameter.) Pacing uploads
  // this way keeps at most one strip in flight, so a busy GPU process can never make texSubImage2D wait
  // for transfer-buffer space on the main thread.
  const gpuCaughtUp = async (gl: WebGL2RenderingContext) => {
    const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    if (!sync) return;
    gl.flush();
    try {
      while (gl.getSyncParameter(sync, gl.SYNC_STATUS) !== gl.SIGNALED) {
        await nextFrame();
        if (state.disposed || state.contextLost) return;
      }
    } finally {
      gl.deleteSync(sync);
    }
  };

  // Upload a decoded bitmap to the GPU in horizontal strips, at most one per frame and only once the GPU has
  // finished the previous one. A single texImage2D of the 8192x4096 texture (128 MB) blocked the main
  // thread for ~0.5 s; paced strips keep each frame's work small.
  // Same texture, filtering and mipmaps as a normal upload: storage is allocated once with all mip levels,
  // and the mip chain is generated after the last strip.
  const uploadInStrips = async (bitmap: ImageBitmap) => {
    const { width, height } = bitmap;
    const dst = new THREE.DataTexture(null, width, height);
    dst.source.dataReady = false; // allocate storage only - no pixel upload yet
    dst.colorSpace = THREE.SRGBColorSpace;
    dst.flipY = false; // the bitmap was flipped while decoding
    dst.magFilter = THREE.LinearFilter; // THREE.Texture defaults (DataTexture defaults to Nearest)
    dst.minFilter = THREE.LinearMipmapLinearFilter;
    dst.unpackAlignment = 4;
    dst.generateMipmaps = true; // so the allocation includes every mip level
    dst.needsUpdate = true;
    renderer.initTexture(dst);
    dst.generateMipmaps = false; // the mip chain is generated once, after the last strip

    // Upload with texSubImage2D through three's own state cache. (renderer.copyTextureToTexture reads five
    // pixel-store parameters back from the GPU per call; each readback stalls the main thread until every
    // queued upload has finished, which is exactly the blocking this streaming is meant to avoid.)
    const gl = renderer.getContext() as WebGL2RenderingContext; // three.js r163+ is WebGL 2 only
    const glTexture = (renderer.properties.get(dst) as { __webglTexture?: WebGLTexture }).__webglTexture;
    if (!glTexture) throw new Error("panorama texture allocation failed");
    const rowsPerStrip = Math.max(16, Math.floor(STRIP_PIXELS / width));
    try {
      await gpuCaughtUp(gl); // let the storage allocation finish first
      for (let y = 0; y < height; y += rowsPerStrip) {
        const rows = Math.min(rowsPerStrip, height - y);
        const strip = await createImageBitmap(bitmap, 0, y, width, rows);
        await nextFrame();
        if (state.disposed || state.contextLost) { strip.close(); dst.dispose(); return; }
        renderer.state.activeTexture(gl.TEXTURE0);
        renderer.state.bindTexture(gl.TEXTURE_2D, glTexture);
        renderer.state.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        renderer.state.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        renderer.state.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, y, width, rows, gl.RGBA, gl.UNSIGNED_BYTE, strip);
        if (y + rows >= height) gl.generateMipmap(gl.TEXTURE_2D); // build the mip chain once, at the end
        renderer.state.unbindTexture();
        strip.close();
        await gpuCaughtUp(gl);
      }
    } finally {
      bitmap.close();
    }
    onTexture(dst);
  };

  const loadTexture = () => {
    if (typeof createImageBitmap === "function") {
      const loader = new THREE.ImageBitmapLoader();
      // ImageBitmaps cannot be flipped at upload time, so flip while decoding (texture.flipY = false).
      loader.setOptions({ imageOrientation: "flipY", premultiplyAlpha: "none" });
      loader.load(textureSrc, (bitmap) => { uploadInStrips(bitmap).catch(onTextureError); }, undefined, onTextureError);
    } else {
      new THREE.TextureLoader().load(
        textureSrc,
        (t) => { t.colorSpace = THREE.SRGBColorSpace; onTexture(t); },
        undefined,
        onTextureError
      );
    }
  };
  loadTexture();

  // --- Render loop ------------------------------------------------------------
  const target = new THREE.Vector3();
  const shouldRun = () => state.visible && !state.contextLost && !state.disposed && document.visibilityState === "visible";

  const frame = () => {
    state.frameId = null;
    if (!shouldRun()) return;

    const idleFor = performance.now() - state.lastInteraction;
    const rotating = autoRotate && !state.isDragging && idleFor > IDLE_BEFORE_AUTOROTATE_MS;
    if (rotating) state.lon += opts.autoRotateSpeed * 0.016;

    camera.fov += (state.targetFov - camera.fov) * 0.1;
    const easing = Math.abs(state.targetFov - camera.fov) > 0.01;
    camera.updateProjectionMatrix();

    const phi = THREE.MathUtils.degToRad(90 - state.lat);
    const theta = THREE.MathUtils.degToRad(state.lon);
    target.set(500 * Math.sin(phi) * Math.cos(theta), 500 * Math.cos(phi), 500 * Math.sin(phi) * Math.sin(theta));
    camera.lookAt(target);
    renderer.render(scene, camera);

    // Auto-rotate keeps the loop running while visible (as before; it also needs the clock to know when the
    // idle wait is over). Without it, the loop only runs while a drag or zoom easing is in progress.
    if (autoRotate || easing || state.isDragging) state.frameId = requestAnimationFrame(frame);
  };

  function invalidate() {
    if (state.frameId === null && shouldRun()) state.frameId = requestAnimationFrame(frame);
  }
  const stop = () => {
    if (state.frameId !== null) cancelAnimationFrame(state.frameId);
    state.frameId = null;
  };

  // --- Pointer interaction (drag to look around) ---------------------------
  const touch = () => { state.lastInteraction = performance.now(); invalidate(); };
  const onPointerDown = (e: PointerEvent) => {
    state.isDragging = true;
    state.pointerId = e.pointerId;
    state.lastX = e.clientX;
    state.lastY = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    container.style.cursor = "grabbing";
    touch();
  };
  const onPointerMove = (e: PointerEvent) => {
    state.lastInteraction = performance.now();
    if (!state.isDragging || e.pointerId !== state.pointerId) return;
    const deltaX = e.clientX - state.lastX;
    const deltaY = e.clientY - state.lastY;
    state.lastX = e.clientX;
    state.lastY = e.clientY;
    // Sensitivity scales with current FOV so zoomed-in drags feel proportional rather than overshooting.
    const sensitivity = state.targetFov / 7500;
    state.lon -= deltaX * sensitivity * 100;
    state.lat += deltaY * sensitivity * 100;
    state.lat = Math.max(-85, Math.min(85, state.lat));
    invalidate();
  };
  const onPointerUp = () => {
    state.isDragging = false;
    state.pointerId = null;
    container.style.cursor = "grab";
  };
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    state.targetFov = Math.max(30, Math.min(100, state.targetFov + e.deltaY * 0.05));
    touch();
  };
  container.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  container.addEventListener("wheel", onWheel, { passive: false });

  // --- Resize, tab visibility, WebGL context loss -----------------------------
  const resizeObserver = new ResizeObserver(() => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    invalidate();
  });
  resizeObserver.observe(container);

  const onVisibilityChange = () => (document.visibilityState === "visible" ? invalidate() : stop());
  document.addEventListener("visibilitychange", onVisibilityChange);

  const canvas = renderer.domElement;
  const onContextLost = (e: Event) => { e.preventDefault(); state.contextLost = true; stop(); };
  const onContextRestored = () => {
    state.contextLost = false;
    // GPU resources died with the old context (three.js re-initialises its own state) and the decoded
    // bitmap was released after upload: drop the stale texture - disposing it would try to delete a GL
    // object from the dead context - then fetch (HTTP-cached) and stream the texture again.
    if (texture) { material.map = placeholder; texture = null; }
    loadTexture();
    invalidate();
  };
  canvas.addEventListener("webglcontextlost", onContextLost);
  canvas.addEventListener("webglcontextrestored", onContextRestored);

  return {
    setVisible(visible) {
      state.visible = visible;
      if (visible) invalidate();
      else stop();
    },
    zoomIn() { state.targetFov = Math.max(30, state.targetFov - 15); touch(); },
    zoomOut() { state.targetFov = Math.min(100, state.targetFov + 15); touch(); },
    resetView() { state.lon = 180; state.lat = 0; state.targetFov = 75; touch(); },
    dispose() {
      if (state.disposed) return;
      state.disposed = true;
      stop();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      geometry.dispose();
      placeholder.dispose();
      if (texture) {
        const image = texture.image as { close?: () => void } | undefined;
        texture.dispose();
        image?.close?.(); // free the decoded ImageBitmap
      }
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss(); // release the GL context now, not at GC time
      if (canvas.parentNode === container) container.removeChild(canvas);
    },
  };
}
