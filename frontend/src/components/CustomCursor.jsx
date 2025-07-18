import React, { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const tailRef = useRef(null);
  const rippleRef = useRef(null);
  const isMobile = window.innerWidth <= 768;

  // Track mouse and update positions directly (no state)
  useEffect(() => {
    if (isMobile) return;

    const move = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Update main cursor immediately
      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`;
        cursorRef.current.style.top = `${y}px`;
      }

      // Update tail (CSS transition handles smoothness)
      if (tailRef.current) {
        tailRef.current.style.left = `${x}px`;
        tailRef.current.style.top = `${y}px`;
      }

      // Update ripple position
      if (rippleRef.current) {
        rippleRef.current.style.left = `${x}px`;
        rippleRef.current.style.top = `${y}px`;
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile]);

  // Ripple on click
  useEffect(() => {
    if (isMobile) return;

    const click = () => {
      if (rippleRef.current) {
        rippleRef.current.classList.remove("ripple");
        void rippleRef.current.offsetWidth; // Force reflow
        rippleRef.current.classList.add("ripple");
      }
    };

    window.addEventListener("click", click);
    return () => window.removeEventListener("click", click);
  }, [isMobile]);

  if (isMobile) return null; // Skip rendering on mobile

  return (
    <>
      <style>{`
        @media (min-width: 769px) {
          body, *, button, a, input, textarea, select {
            cursor: none !important;
          }
        }

        .ripple-effect {
          position: fixed;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid white;
          transform: translate(-50%, -50%);
          pointer-events: none;
          mix-blend-mode: difference;
          z-index: 9998;
          will-change: transform, opacity;
        }

        .ripple {
          animation: rippleAnim 0.3s ease-out;
        }

        @keyframes rippleAnim {
          0% {
            transform: translate(-50%, -50%) scale(0.3);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>

      {/* Main Cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: "white",
          border: "1px solid white",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          zIndex: 9999,
          willChange: "transform",
        }}
      />

      {/* Tail (with CSS transition for smooth trailing) */}
      <div
        ref={tailRef}
        style={{
          position: "fixed",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: "white",
          opacity: 0.15, // Slightly increased from 0.1 for visibility, but still subtle
          filter: "blur(4px)", // Reduced from 6px to lessen GPU load
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          mixBlendMode: "difference",
          zIndex: 9998,
          transition: "left 0.1s ease-out, top 0.1s ease-out", // Smooth trailing effect
          willChange: "transform",
        }}
      />

      {/* Ripple */}
      <div ref={rippleRef} className="ripple-effect" />
    </>
  );
};

export default CustomCursor;
