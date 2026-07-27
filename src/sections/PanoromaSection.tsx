"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * InteractivePanorama360
 * ------------------------------------------------------------------
 * A true 360-degree panorama viewer (like renderstuff.com's viewer).
 *
 * Unlike a pan/zoom image viewer, this projects your equirectangular
 * panorama photo onto the inside of a sphere and renders it through
 * a WebGL camera. Dragging rotates the camera's look direction
 * (yaw/pitch), giving a real "look around the room" effect instead
 * of just sliding a flat image around.
 *
 * Requirements:
 *   npm install three
 *   (types) npm install -D @types/three   // if using TypeScript
 *
 * Usage:
 *   <InteractivePanorama360 src="/Panorama.jpeg" />
 * ------------------------------------------------------------------
 */

interface InteractivePanorama360Props {
  src: string;
  className?: string;
  /** Degrees per second for gentle auto-rotation when idle. 0 disables it. */
  autoRotateSpeed?: number;
  /** Section headline shown above the viewer */
  title?: string;
  /** Short supporting line shown under the headline */
  description?: string;
}

export default function InteractivePanorama360({
  src,
  className = "",
  autoRotateSpeed = 1.2,
  title = "Step Inside, Virtually",
  description = "Explore this space in full 360°. Drag to look around, scroll to zoom in on the details.",
}: InteractivePanorama360Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Mutable refs for the three.js scene graph + interaction state,
  // kept out of React state so drags don't trigger re-renders.
  const sceneState = useRef<{
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    lon: number;
    lat: number;
    targetFov: number;
    isDragging: boolean;
    pointerId: number | null;
    lastX: number;
    lastY: number;
    lastInteraction: number;
    frameId: number | null;
  }>({
    camera: null,
    renderer: null,
    scene: null,
    lon: 180,
    lat: 0,
    targetFov: 75,
    isDragging: false,
    pointerId: null,
    lastX: 0,
    lastY: 0,
    lastInteraction: 0,
    frameId: null,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const state = sceneState.current;

    // --- Scene / camera / renderer setup -----------------------------
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      1,
      1100
    );
    const scene = new THREE.Scene();

    // Sphere geometry, inverted so the texture renders on the INSIDE
    // (we are the viewer standing at the center of the room).
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    loader.load(
      src,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        material.map = texture;
        material.needsUpdate = true;
        setIsLoading(false);
      },
      undefined,
      () => {
        setIsLoading(false);
        setHasError(true);
      }
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    state.camera = camera;
    state.scene = scene;
    state.renderer = renderer;
    state.lastInteraction = performance.now();

    // --- Pointer interaction (drag to look around) --------------------
    const onPointerDown = (e: PointerEvent) => {
      state.isDragging = true;
      state.pointerId = e.pointerId;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      container.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      state.lastInteraction = performance.now();
      if (!state.isDragging || e.pointerId !== state.pointerId) return;
      const deltaX = e.clientX - state.lastX;
      const deltaY = e.clientY - state.lastY;
      state.lastX = e.clientX;
      state.lastY = e.clientY;

      // Sensitivity scales with current FOV so zoomed-in drags feel
      // proportional rather than overshooting.
      const sensitivity = state.targetFov / 7500;
      state.lon -= deltaX * sensitivity * 100;
      state.lat += deltaY * sensitivity * 100;
      state.lat = Math.max(-85, Math.min(85, state.lat));
    };

    const onPointerUp = () => {
      state.isDragging = false;
      state.pointerId = null;
      container.style.cursor = "grab";
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      state.lastInteraction = performance.now();
      state.targetFov = Math.max(30, Math.min(100, state.targetFov + e.deltaY * 0.05));
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: false });

    // --- Resize handling -----------------------------------------------
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    // --- Render loop -----------------------------------------------------
    const animate = () => {
      state.frameId = requestAnimationFrame(animate);

      // Gentle auto-rotate only after a period of no interaction.
      const idleFor = performance.now() - state.lastInteraction;
      if (autoRotateSpeed > 0 && !state.isDragging && idleFor > 2500) {
        state.lon += autoRotateSpeed * 0.016;
      }

      camera.fov += (state.targetFov - camera.fov) * 0.1;
      camera.updateProjectionMatrix();

      const phi = THREE.MathUtils.degToRad(90 - state.lat);
      const theta = THREE.MathUtils.degToRad(state.lon);

      const target = new THREE.Vector3(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
      );

      camera.lookAt(target);
      renderer.render(scene, camera);
    };
    animate();

    // --- Cleanup ---------------------------------------------------------
    return () => {
      if (state.frameId) cancelAnimationFrame(state.frameId);
      resizeObserver.disconnect();
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("wheel", onWheel);
      geometry.dispose();
      material.map?.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [src, autoRotateSpeed]);

  const zoomIn = () => {
    sceneState.current.targetFov = Math.max(30, sceneState.current.targetFov - 15);
    sceneState.current.lastInteraction = performance.now();
  };
  const zoomOut = () => {
    sceneState.current.targetFov = Math.min(100, sceneState.current.targetFov + 15);
    sceneState.current.lastInteraction = performance.now();
  };
  const resetView = () => {
    sceneState.current.lon = 180;
    sceneState.current.lat = 0;
    sceneState.current.targetFov = 75;
    sceneState.current.lastInteraction = performance.now();
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-12 flex flex-col items-center font-sans">
      {(title || description) && (
        <div className="max-w-2xl text-center mb-8 md:mb-10">
          {title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-primary font-semibold text-[#4a1c13] tracking-tight leading-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-3 text-sm md:text-base text-[#4a1c13]/70 leading-relaxed">
              {description}
            </p>
          )}
          <div className="mt-4 mx-auto w-12 h-[2px] bg-[#ff7043]" />
        </div>
      )}

      <section
        className={`relative w-full h-[55vh] md:h-[70vh] lg:h-[80vh] bg-black overflow-hidden rounded-md border border-gray-300 shadow-[0_10px_40px_rgba(0,0,0,0.1)] cursor-grab ${className}`}
      >
        <div ref={containerRef} className="absolute inset-0" />

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30 text-white text-sm tracking-wide">
            Loading 360&deg; view&hellip;
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-30 text-white text-sm tracking-wide px-6 text-center">
            Couldn&apos;t load the panorama image. Check that the file at
            <span className="mx-1 font-mono">{src}</span>
            exists and is a valid equirectangular (2:1) panorama.
          </div>
        )}

        {/* Controls (top left) */}
        <div className="absolute top-4 left-4 z-20 flex flex-col shadow-lg rounded-sm overflow-hidden border border-gray-200">
          <button
            onClick={zoomIn}
            className="w-8 h-8 bg-white text-black flex items-center justify-center hover:bg-gray-100 transition-colors border-b border-gray-200"
            title="Zoom In"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>

          <button
            onClick={zoomOut}
            className="w-8 h-8 bg-white text-black flex items-center justify-center hover:bg-gray-100 transition-colors border-b border-gray-200"
            title="Zoom Out"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>

          <button
            onClick={resetView}
            className="w-8 h-8 bg-white text-black flex items-center justify-center hover:bg-gray-100 transition-colors"
            title="Reset View"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M3 8V5a2 2 0 0 1 2-2h3"></path>
              <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
              <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
              <path d="M21 16v3a2 2 0 0 1-2 2h-3"></path>
            </svg>
          </button>
        </div>

        {/* Compass (bottom right) */}
        <div className="absolute bottom-4 right-4 z-20 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg pointer-events-none opacity-90">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-black transform -rotate-45">
            <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v16.19l6.22-6.22a.75.75 0 111.06 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06l6.22 6.22V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
        </div>
      </section>

      <div className="mt-4 text-[#5D4037]/70 text-sm tracking-wide text-center">
        Drag to <strong className="text-[#2A2220] font-bold">Look Around</strong>, Scroll to <strong className="text-[#2A2220] font-bold">Zoom</strong>
      </div>
    </div>
  );
}