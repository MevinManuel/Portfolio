import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const tailRef = useRef(null);
  const rippleRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
  }, []);

  // Track mouse
  useEffect(() => {
    if (isMobile) return;

    const move = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
      if (rippleRef.current) {
        rippleRef.current.style.left = `${e.clientX}px`;
        rippleRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile]);

  // Tail follow
  useEffect(() => {
    if (isMobile) return;

    const follow = () => {
      if (tailRef.current) {
        tailRef.current.style.left = `${coords.x}px`;
        tailRef.current.style.top = `${coords.y}px`;
      }
      requestAnimationFrame(follow);
    };
    follow();
  }, [coords, isMobile]);

  // Ripple on click
  useEffect(() => {
    if (isMobile) return;

    const click = () => {
      if (rippleRef.current) {
        rippleRef.current.classList.remove("ripple");
        void rippleRef.current.offsetWidth;
        rippleRef.current.classList.add("ripple");
      }
    };

    window.addEventListener("click", click);
    return () => window.removeEventListener("click", click);
  }, [isMobile]);

  if (isMobile) return null; // ❌ Skip rendering on mobile

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
        }

        .ripple {
          animation: rippleAnim 0.4s ease-out;
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
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: "white",
          border: "1px solid white",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          zIndex: 9999,
        }}
      />

      {/* Tail */}
      <div
        ref={tailRef}
        style={{
          position: "fixed",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: "white",
          opacity: 0.1,
          filter: "blur(6px)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          mixBlendMode: "difference",
          zIndex: 9998,
        }}
      />

      {/* Ripple */}
      <div ref={rippleRef} className="ripple-effect"></div>
    </>
  );
};

export default CustomCursor;
