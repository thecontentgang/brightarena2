"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { Renderer, Camera, Transform, Plane, Program, Mesh, Texture, type OGLRenderingContext } from 'ogl';

// ==========================================
// 1. DATA & TYPES
// ==========================================

export interface ProjectItem {
  id: string | number;
  shortDescription: string;
  heroImage?: string;
  year: string;
  houseType: string;
  location: string;
  slug: string;
}

const projectsData: ProjectItem[] = [
  {
    id: 1,
    shortDescription: "Rajapushpa Provincia",
    heroImage: "/projectsImg/rajapushpa/RP-img7.jpg",
    year: "2026",
    houseType: "Residential",
    location: "Bangalore",
    slug: "glass-pavilion",
  },
  {
    id: 2,
    shortDescription: "Luxury Villa",
    heroImage: "/projectsImg/Villa/villa-img8.jpg",
    year: "2025",
    houseType: "Commercial",
    location: "Mumbai",
    slug: "aura-workspace",
  },
  {
    id: 3,
    shortDescription: "Forest Edge",
    heroImage: "/projectsImg/forest-edge/FE-img7.jpg",
    year: "2025",
    houseType: "Luxury",
    location: "Dubai",
    slug: "lumina-penthouse",
  },
];

const PROJECTS = projectsData.map((p) => ({
  id: p.id,
  title: p.shortDescription,
  image: p.heroImage || `https://picsum.photos/seed/${p.id}/1600/900`,
  year: p.year,
  category: p.houseType,
  location: p.location,
  slug: p.slug,
}));

const EASE_FADE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ==========================================
// 2. WEBGL / OGL ENGINE  (unchanged, aside from the responsive plane sizing fix)
// ==========================================

type GL = OGLRenderingContext;

interface ScreenSize { width: number; height: number; }
interface ViewportSize { width: number; height: number; }
interface ScrollState { ease: number; current: number; target: number; }

const vertexShader = `
precision highp float;
uniform float uIsMobile;
attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform float uPosition;
uniform float uTime;
uniform vec3 distortionAxis;
uniform vec3 rotationAxis;
uniform float uDistortion;
varying vec2 vUv;
varying vec3 vNormal;
float PI = 3.141592653589793238;

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    return mat4(
      oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
      oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
      oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
      0.0,                                0.0,                                0.0,                                1.0
    );
}
vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}
float qinticInOut(float t) {
  return t < 0.5 ? 16.0 * pow(t, 5.0) : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;
}
void main() {
  vUv = uv;
  vec3 newpos = position;
  
  if (uIsMobile < 0.5) {
    float norm = 0.5;
    float offset = (dot(distortionAxis, position) + norm / 2.) / norm;
    float localprogress = clamp((fract(uPosition * 5.0 * 0.01) - 0.01 * uDistortion * offset) / (1. - 0.01 * uDistortion), 0., 2.);
    localprogress = qinticInOut(localprogress) * PI;
    newpos = rotate(newpos, rotationAxis, localprogress);
  }
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform sampler2D tMap;
varying vec2 vUv;
void main() {
  vec2 imageSize = uImageSize;
  vec2 planeSize = uPlaneSize;
  float imageAspect = imageSize.x / imageSize.y;
  float planeAspect = planeSize.x / planeSize.y;
  vec2 scale = vec2(1.0, 1.0);
  if (planeAspect > imageAspect) {
      scale.x = imageAspect / planeAspect;
  } else {
      scale.y = planeAspect / imageAspect;
  }
  vec2 uv = vUv * scale + (1.0 - scale) * 0.5;
  gl_FragColor = texture2D(tMap, uv);
}
`;

function AutoBind(self: Record<string, unknown> | object) {
  const getAllProperties = (object: object): Set<[object, string | symbol]> => {
    const properties = new Set<[object, string | symbol]>();
    let currentObj: object | null = object; 
    while (currentObj && currentObj !== Object.prototype) {
      for (const key of Reflect.ownKeys(currentObj)) {
        properties.add([currentObj, key]);
      }
      currentObj = Reflect.getPrototypeOf(currentObj);
    }
    return properties;
  };

  const proto = Object.getPrototypeOf(self);
  if (!proto) return self;
  const target = self as Record<string | symbol, unknown>;

  for (const [obj, key] of getAllProperties(proto)) {
    if (key === 'constructor') continue;
    const descriptor = Reflect.getOwnPropertyDescriptor(obj, key);
    if (descriptor && typeof descriptor.value === 'function') {
      target[key] = descriptor.value.bind(self);
    }
  }
  return self;
}

function lerp(p1: number, p2: number, t: number): number { return p1 + (p2 - p1) * t; }
function map(num: number, min1: number, max1: number, min2: number, max2: number): number {
  return ((num - min1) / (max1 - min1)) * (max2 - min2) + min2;
}

interface MediaParams {
  gl: GL; geometry: Plane; scene: Transform; screen: ScreenSize; viewport: ViewportSize;
  image: string; length: number; index: number; planeWidth: number; planeHeight: number; distortion: number;
}

class Media {
  gl!: GL; geometry!: Plane; scene!: Transform; screen!: ScreenSize; viewport!: ViewportSize;
  image!: string; length!: number; index!: number; planeWidth!: number; planeHeight!: number; distortion!: number;
  program!: Program; plane!: Mesh;
  padding = 0; height = 0; y = 0;

  constructor(params: MediaParams) {
    Object.assign(this, params);
    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    this.program = new Program(this.gl, {
      depthTest: false, depthWrite: false, fragment: fragmentShader, vertex: vertexShader,
      uniforms: {
        tMap: { value: texture }, uPosition: { value: 0 }, uPlaneSize: { value: [0, 0] },
        uImageSize: { value: [0, 0] }, rotationAxis: { value: [0, 1, 0] },
        distortionAxis: { value: [1, 1, 0] }, uDistortion: { value: this.distortion },
        uViewportSize: { value: [this.viewport.width, this.viewport.height] }, uTime: { value: 0 },uIsMobile: { value: 0 }

      }, cullFace: false
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSize.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  setScale() {
    this.plane.scale.x = (this.viewport.width * this.planeWidth) / this.screen.width;
    this.plane.scale.y = (this.viewport.height * this.planeHeight) / this.screen.height;
    this.plane.position.x = 0;
    this.program.uniforms.uPlaneSize.value = [this.plane.scale.x, this.plane.scale.y];
  }

 onResize({ screen, viewport, planeWidth, planeHeight }: { screen?: ScreenSize; viewport?: ViewportSize; planeWidth?: number; planeHeight?: number } = {}) {
  if (screen) this.screen = screen;
  if (viewport) {
    this.viewport = viewport;
    this.program.uniforms.uViewportSize.value = [viewport.width, viewport.height];
  }
  if (planeWidth) this.planeWidth = planeWidth;
  if (planeHeight) this.planeHeight = planeHeight;

  this.program.uniforms.uIsMobile.value = this.screen.width < 768 ? 1 : 0;

  this.setScale();
    this.padding = 1.5; 
    this.height = this.plane.scale.y + this.padding;
    this.y = -this.index * this.height;
  }

  update(scroll: ScrollState) {
    this.plane.position.y = this.y + scroll.current;
    
    const position = map(this.plane.position.y, -this.viewport.height, this.viewport.height, 5, 15);
    this.program.uniforms.uPosition.value = position;
    this.program.uniforms.uTime.value += 0.04;
  }
}

interface CanvasParams {
  container: HTMLElement; canvas: HTMLCanvasElement; items: string[];
  distortion: number; scrollEase: number; cameraFov: number; cameraZ: number;
  onIndexChange?: (index: number) => void;
}

class Canvas {
  container!: HTMLElement; canvas!: HTMLCanvasElement; items!: string[]; distortion!: number; scroll!: ScrollState;
  cameraFov!: number; cameraZ!: number; onIndexChange?: (index: number) => void;
  
  renderer!: Renderer; gl!: GL; camera!: Camera; scene!: Transform; planeGeometry!: Plane; medias!: Media[];
  screen!: ScreenSize; viewport!: ViewportSize;
  maxScroll = 0; activeIndex = 0; animationFrameId = 0;

  constructor(params: CanvasParams) {
    Object.assign(this, params);
    
    this.scroll = { ease: params.scrollEase, current: 0, target: 0 };

    AutoBind(this);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias();
    if (this.medias.length > 0) this.maxScroll = (this.medias.length - 1) * this.medias[0].height;
    this.update();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  createRenderer() {
    this.renderer = new Renderer({ canvas: this.canvas, alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio, 2) });
    this.gl = this.renderer.gl;
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = this.cameraFov;
    this.camera.position.z = this.cameraZ;
  }

  createScene() { this.scene = new Transform(); }
  createGeometry() { this.planeGeometry = new Plane(this.gl, { heightSegments: 1, widthSegments: 100 }); }

  createMedias() {
    this.medias = this.items.map((image, index) => new Media({
      gl: this.gl, geometry: this.planeGeometry, scene: this.scene, screen: this.screen, viewport: this.viewport,
      image, length: this.items.length, index, planeWidth: 900, planeHeight: 550, distortion: this.distortion
    }));
  }

  onResize() {
    const rect = this.container.getBoundingClientRect();
    this.screen = { width: rect.width, height: rect.height };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.gl.canvas.width / this.gl.canvas.height });

    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };

    // Responsive plane sizing — a real fraction of the actual screen at
    // every breakpoint, instead of a fixed desktop size that left large
    // empty margins around the image.
    let widthFrac: number;
    let heightFrac: number;

    if (this.screen.width < 640) {
      widthFrac = 0.9;
      heightFrac = 0.56;
    } else if (this.screen.width < 1024) {
      widthFrac = 0.72;
      heightFrac = 0.62;
    } else if (this.screen.width < 1536) {
      widthFrac = 0.42;
      heightFrac = 0.7;
    } else {
      widthFrac = 0.32;
      heightFrac = 0.72;
    }

    const planeW = this.screen.width * widthFrac;
    const planeH = this.screen.height * heightFrac;

    this.medias?.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport, planeWidth: planeW, planeHeight: planeH }));
    
    if (this.medias && this.medias.length > 0) {
      this.maxScroll = (this.medias.length - 1) * this.medias[0].height;
    }
  }

  setScrollProgress(progress: number) {
    this.scroll.target = progress * this.maxScroll;
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    
    let closestIndex = 0;
    let minDistance = Infinity;

    this.medias?.forEach(media => {
      media.update(this.scroll);
      const dist = Math.abs(media.plane.position.y);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = media.index;
      }
    });

    if (this.activeIndex !== closestIndex && this.onIndexChange) {
      this.activeIndex = closestIndex;
      this.onIndexChange(closestIndex);
    }

    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.animationFrameId = requestAnimationFrame(this.update);
  }

  destroy() {
    window.removeEventListener('resize', this.onResize.bind(this));
    cancelAnimationFrame(this.animationFrameId);
  }
}

// ==========================================
// 3. MAIN REACT COMPONENT
// ==========================================

export default function ProjectsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<Canvas | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    instanceRef.current = new Canvas({
      container: containerRef.current,
      canvas: canvasRef.current,
      items: PROJECTS.map(p => p.image),
      distortion: 2.5,
      scrollEase: 0.05,
      cameraFov: 45,
      cameraZ: 20,
      onIndexChange: (idx: number) => setActiveIndex(idx),
    });

    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latestProgress) => {
      if (instanceRef.current) {
        instanceRef.current.setScrollProgress(latestProgress);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleNext = () => window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  const handlePrev = () => window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });

  const activeProject = PROJECTS[activeIndex];

  if (!activeProject) return null;

  const containerHeight = `${100 + (PROJECTS.length - 1) * 85}vh`;

  return (
    <section 
      ref={sectionRef} 
      style={{ height: containerHeight }} 
      className="relative w-full bg-[#2a110a] select-none"
    >
      
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

        {/* Faint blueprint grid — same drafting-paper texture as Trusted By, ties the section back to the brand */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffc107 1px, transparent 1px), linear-gradient(to bottom, #ffc107 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Ambient glow so any exposed margin around the image reads as designed atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[900px] max-h-[900px] bg-[#ffc107]/[0.05] blur-[120px] rounded-full pointer-events-none z-0" />

        {/* 3D CANVAS BACKGROUND */}
        <div ref={containerRef} className="absolute inset-0 z-[1]">
          <canvas ref={canvasRef} className="block w-full h-full" />
        </div>

        {/* GRADIENT OVERLAYS */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none z-10" />

        {/* TOP-LEFT EYEBROW — corner-bracket label, consistent with Trusted By */}
        <div className="absolute top-10 left-6 md:top-14 md:left-16 z-20 pointer-events-none">
          <div className="relative px-5 py-2">
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#ffc107]/60" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#ffc107]/60" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#ffc107]/60" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#ffc107]/60" />
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-[#ffc107] uppercase">
              Selected Works
            </span>
          </div>
        </div>

        {/* SIGNATURE ELEMENT — vertical project index rail.
            A datum line running top-to-bottom with a tick per project;
            the active tick gets a brass diamond marker and the project name,
            so it doubles as wayfinding, not just a "1 / 3" counter. */}
        <div className="hidden md:flex absolute top-1/2 right-10 lg:right-16 -translate-y-1/2 z-20 flex-col items-end gap-0 pointer-events-none">
          {PROJECTS.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={project.id} className="relative flex items-center gap-4 py-5">
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.4, ease: EASE_FADE }}
                      className="text-white text-xs tracking-[0.2em] uppercase font-medium whitespace-nowrap"
                    >
                      {project.title}
                    </motion.span>
                  )}
                </AnimatePresence>
                <span className="text-white/40 text-[10px] font-mono tabular-nums w-5 text-right">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative w-px h-8 bg-white/15">
                  {isActive && (
                    <motion.span
                      layoutId="rail-marker"
                      transition={{ duration: 0.5, ease: EASE_FADE }}
                      className="absolute -left-[3px] top-1/2 -translate-y-1/2 w-[7px] h-[7px] rotate-45 bg-[#ffc107]"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE COUNTER — simple fallback where the rail doesn't fit */}
        <div className="flex md:hidden absolute top-10 right-6 z-20 items-center gap-4 pointer-events-none">
          <span className="text-white text-xs tracking-widest font-mono tabular-nums">
            {String(activeIndex + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </span>
        </div>

        {/* MAIN UI PANEL */}
        <div className="absolute bottom-0 left-0 w-full px-6 pb-14 pt-24 md:px-16 md:pb-20 lg:px-24 lg:pb-24 z-20 flex flex-col justify-end pointer-events-none">
          <div className="pointer-events-auto w-full max-w-[92%] sm:max-w-xl md:max-w-2xl">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`meta-${activeProject.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: EASE_FADE }}
                className="flex items-center gap-3 text-[9px] md:text-xs tracking-[0.3em] uppercase font-bold text-white/70 mb-5 md:mb-7"
              >
                <span>{activeProject.category}</span>
                <span className="w-1 h-1 rounded-full bg-[#ff7043]" />
                <span>{activeProject.location}</span>
                <span className="w-1 h-1 rounded-full bg-[#ff7043]" />
                <span>{activeProject.year}</span>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h2
                key={`title-${activeProject.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: EASE_FADE, delay: 0.1 }}
                className="text-[clamp(2.25rem,6vw,6rem)] font-light leading-[1.05] tracking-tight text-white mb-10 md:mb-20 font-primary drop-shadow-lg"
              >
                {activeProject.title}
              </motion.h2>
            </AnimatePresence>

            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-6">
              <Link 
                to={`/portfolio/${activeProject.slug}`}
                className="group relative inline-flex items-center gap-6 px-9 py-4 border border-white/20 rounded-full overflow-hidden transition-all duration-500 hover:border-white/50 w-fit"
              >
                <div className="absolute inset-0 bg-[#ff7043] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                <span className="relative z-10 text-[10px] md:text-xs font-bold tracking-widest uppercase text-white transition-colors duration-500">
                  Explore Space
                </span>
              </Link>

              <div className="flex items-center gap-5">
                <button 
                  onClick={handlePrev}
                  className="w-[52px] h-[52px] rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={activeIndex === 0}
                  aria-label="Previous Project"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                <button 
                  onClick={handleNext}
                  className="w-[52px] h-[52px] rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={activeIndex === PROJECTS.length - 1}
                  aria-label="Next Project"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}