"use client";

import { useEffect, useState, type ComponentType } from "react";

/**
 * Talk Now popup, loaded on demand.
 *
 * ProjectModal (and @emailjs/browser, which only it and the separate Contact page form use) used to be
 * part of every page's initial JavaScript, because the Navbar renders it on every route. This wrapper
 * renders nothing until the popup is first opened, then loads the real component and keeps it mounted -
 * so closing still plays its exit animation and later opens behave exactly as before.
 *
 * A plain dynamic import() is used instead of next/dynamic / React.lazy on purpose: those reveal through a
 * Suspense boundary, and React throttles Suspense reveals (~300 ms measured here), which would delay the
 * popup's first appearance. Rendering the module once it has resolved costs only the chunk download.
 *
 * Same props as ProjectModal; callers only change their import.
 */

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalComponent = ComponentType<ProjectModalProps>;

// Shared across every instance on the page (Navbar, Hero, landing pages): the chunk is fetched once.
let modulePromise: Promise<ModalComponent> | null = null;
const loadProjectModal = () => (modulePromise ??= import("./ProjectModal").then((m) => m.default));

/**
 * Start downloading the popup when a visitor shows intent to open it, so the chunk is usually ready by the
 * time the click lands. Fetches at most once; never opens anything; nothing is fetched on page load or
 * merely because a trigger is visible.
 */
export function preloadProjectModal() {
  loadProjectModal().catch(() => {
    modulePromise = null; // a failed preload must not block the real open from retrying
  });
}

/** Spread onto every Talk Now trigger: desktop hover + keyboard focus, and touch/pen/mouse press. */
export const talkNowIntent = {
  onPointerEnter: preloadProjectModal,
  onFocus: preloadProjectModal,
  onPointerDown: preloadProjectModal,
} as const;

export default function LazyProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const [Modal, setModal] = useState<ModalComponent | null>(null);

  useEffect(() => {
    if (!isOpen || Modal) return;
    let cancelled = false;
    loadProjectModal()
      .then((component) => { if (!cancelled) setModal(() => component); })
      .catch((error) => {
        modulePromise = null; // allow a retry on the next open (e.g. after a network blip)
        console.error("Could not load the Talk Now form.", error);
      });
    return () => { cancelled = true; };
  }, [isOpen, Modal]);

  return Modal ? <Modal isOpen={isOpen} onClose={onClose} /> : null;
}
