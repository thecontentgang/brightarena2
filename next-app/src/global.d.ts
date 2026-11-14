interface Window {
  /**
   * Set by the Vite app's scripts/prerender.js while static pages were generated. Never set in the
   * Next.js app (effects do not run during server rendering), so checks against it are always false
   * in the browser - the same runtime behaviour the Vite site had after hydration.
   */
  __IS_PRERENDERING__?: boolean;
}
