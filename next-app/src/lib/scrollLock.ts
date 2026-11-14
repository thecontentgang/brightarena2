/**
 * Shared page scroll lock for overlays (Talk Now popup, testimonial lightbox).
 *
 * Each overlay used to write `document.body.style.overflow` itself, so whichever wrote last won: the
 * homepage testimonials section resetting it to "unset" on mount silently cancelled an open popup's lock.
 * Overlays now take a lock and release it; the page stays locked while any lock is held.
 *
 * Body overflow alone does not stop Lenis (it scrolls the window from script on wheel input), so the
 * shared smooth scroll (src/lib/smoothScroll.ts) subscribes and pauses while the page is locked.
 */

type Listener = (locked: boolean) => void;

let locks = 0;
const listeners = new Set<Listener>();

/** Lock page scrolling; call the returned function to release (safe to call more than once). */
export function lockPageScroll(): () => void {
  locks++;
  if (locks === 1) {
    document.body.style.overflow = "hidden";
    listeners.forEach((listener) => listener(true));
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks = Math.max(0, locks - 1);
    if (locks === 0) {
      document.body.style.overflow = "unset"; // same value the overlays restored before
      listeners.forEach((listener) => listener(false));
    }
  };
}

export function isPageScrollLocked() {
  return locks > 0;
}

/** Be told when the page becomes locked / unlocked. Returns an unsubscribe function. */
export function onPageScrollLockChange(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
