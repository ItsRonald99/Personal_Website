"use client";

// Decorative pixel-art inspired dot grid background
export default function PixelBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] dark:opacity-[0.06]"
      style={{
        backgroundImage: `radial-gradient(circle, #78716c 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }}
    />
  );
}
