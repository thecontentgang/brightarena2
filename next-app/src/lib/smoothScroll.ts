"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isPageScrollLocked, onPageScrollLockChange } from "./scrollLock";

/**
 * One shared Lenis smooth-scroll instance.
 *
 * HeroSection and ProjectShowcase each used to create their own Lenis, so the homepage ran two instances
 * driving the same window scroll, two GSAP ticker callbacks and two ScrollTrigger.update subscriptions.
 * Components now call `useSmoothScroll()`: the first one to mount creates the instance, later ones share
 * it, and it is destroyed when the last one unmounts. Pages without those components keep native
 * scrolling, exactly as before.
 *
 * Visitors who ask for reduced motion get native scrolling (no Lenis is created).
 *
 * While an overlay holds the page scroll lock (src/lib/scrollLock.ts) Lenis is paused with its own
 * stop()/start(): body overflow alone does not stop it scrolling the window on wheel input.
 */

let lenis: Lenis | null = null;
let tick: ((time: number) => void) | null = null;
let unsubscribeLock: (() => void) | null = null;
let users = 0;

function acquire() {
  users++;
  if (lenis || window.__IS_PRERENDERING__) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.registerPlugin(ScrollTrigger);
  // Same options both previous instances used.
  const instance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  instance.on("scroll", ScrollTrigger.update); // keep ScrollTrigger in sync with the smoothed position
  tick = (time) => instance.raf(time * 1000); // drive Lenis from GSAP's ticker (one rAF loop for both)
  gsap.ticker.add(tick);
  // As before: no lag smoothing, so scroll-linked tweens never jump after a slow frame. (This is a global
  // GSAP setting; the previous code also left it in place after leaving the homepage.)
  gsap.ticker.lagSmoothing(0);
  if (isPageScrollLocked()) instance.stop();
  unsubscribeLock = onPageScrollLockChange((locked) => (locked ? instance.stop() : instance.start()));
  lenis = instance;
}

function release() {
  users = Math.max(0, users - 1);
  if (users > 0 || !lenis) return;
  if (tick) gsap.ticker.remove(tick);
  unsubscribeLock?.();
  unsubscribeLock = null;
  lenis.destroy();
  lenis = null;
  tick = null;
}

/** Use the shared smooth scroll while the calling component is mounted. */
export function useSmoothScroll() {
  useEffect(() => {
    acquire();
    return release;
  }, []);
}
