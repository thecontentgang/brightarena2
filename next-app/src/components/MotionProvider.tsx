"use client";

import { MotionConfig } from "framer-motion";

/**
 * Honours the visitor's OS "reduce motion" setting for every Framer Motion animation: transform and layout
 * animations are skipped (opacity fades remain). Visitors without that setting see exactly the original motion.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
