import React, { useRef, useState, useEffect } from "react";
const bgImg = "/data/bg2.png";

const BUBBLE_SIZE = 25;
const BALL_RADIUS = 12;
const SLIDER_WIDTH = 140;
const SLIDER_HEIGHT = 16;

const IntroGame = ({ onEnter }) => {
  const [dimensions, setDimensions] = useState({
    width: Math.min(window.innerWidth * 0.9, 1200),
    height: Math.min(window.innerHeight * 0.7, 700),
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: Math.min(window.innerWidth * 0.9, 1200),
        height: Math.min(window.innerHeight * 0.7, 700),
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const GAME_WIDTH = dimensions.width;
  const GAME_HEIGHT = dimensions.height;

  const [bubbles, setBubbles] = useState(() => {
    const bubblesArray = [];
    const gameW = GAME_WIDTH;
    const gameH = GAME_HEIGHT;

    const letterPatterns = {
      P: [
        [1, 1, 1, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
      ],
      O: [
        [0, 1, 1, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
      ],
      R: [
        [1, 1, 1, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 1, 0, 0],
        [1, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 1, 0],
      ],
      T: [
        [1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
      ],
      F: [
        [1, 1, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
      ],
      L: [
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0],
      ],
      I: [
        [1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0],
      ],
      X: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
    };

    const word = "OOXFOLIOXOO";
    const bubbleSize = Math.max(15, Math.min(25, gameW / 40));
    const letterSpacing = bubbleSize * 0.4;
    const totalWordWidth = word.length * 8 * bubbleSize + (word.length - 1) * letterSpacing;
    const startX = (gameW - totalWordWidth) / 2;
    const startY = gameH * 0.15;

    let currentX = startX;
    let id = 0;

    for (let letterIndex = 0; letterIndex < word.length; letterIndex++) {
      const letter = word[letterIndex];
      const pattern = letterPatterns[letter];

      if (pattern) {
        for (let row = 0; row < pattern.length; row++) {
          for (let col = 0; col < pattern[row].length; col++) {
            if (pattern[row][col] === 1) {
              bubblesArray.push({
                x: currentX + col * bubbleSize,
                y: startY + row * bubbleSize,
                popped: false,
                id: id++,
                size: bubbleSize,
              });
            }
          }
        }
        currentX += 8 * bubbleSize + letterSpacing;
      }
    }

    return bubblesArray;
  });

  const [ball, setBall] = useState({
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT - 100,
    dx: 5, // Increased from 4
    dy: -6, // Increased from -5
  });
  const [sliderX, setSliderX] = useState(GAME_WIDTH / 2 - SLIDER_WIDTH / 2);
  const [gameStarted, setGameStarted] = useState(false);
  const [keys, setKeys] = useState({ left: false, right: false });
  const [progress, setProgress] = useState(0);
  const [swipeOut, setSwipeOut] = useState(false);
  const gameAreaRef = useRef(null);

  // Utility: Check collision between two circles
  const checkCollision = (obj1, obj2, r1, r2) => {
    const dx = obj1.x - obj2.x;
    const dy = obj1.y - obj2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < r1 + r2;
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") setKeys((prev) => ({ ...prev, left: true }));
      else if (e.key === "ArrowRight") setKeys((prev) => ({ ...prev, right: true }));
    };
    const handleKeyUp = (e) => {
      if (e.key === "ArrowLeft") setKeys((prev) => ({ ...prev, left: false }));
      else if (e.key === "ArrowRight") setKeys((prev) => ({ ...prev, right: false }));
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Paddle movement
  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      setSliderX((prev) => {
        let newX = prev;
        if (keys.left) newX -= 8;
        if (keys.right) newX += 8;
        return Math.max(0, Math.min(GAME_WIDTH - SLIDER_WIDTH, newX));
      });
    }, 16);
    return () => clearInterval(interval);
  }, [gameStarted, keys, GAME_WIDTH]);

  // Game loop: Move ball and check collisions
  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      setBall((prev) => {
        let { x, y, dx, dy } = prev;
        x += dx;
        y += dy;

        // Wall collisions
        if (x < BALL_RADIUS || x > GAME_WIDTH - BALL_RADIUS) dx = -dx;
        if (y < BALL_RADIUS) dy = -dy;

        // Paddle collision
        if (
          y >= GAME_HEIGHT - SLIDER_HEIGHT - BALL_RADIUS - 20 &&
          x > sliderX &&
          x < sliderX + SLIDER_WIDTH &&
          dy > 0
        ) {
          dy = -dy;
          const hitPos = (x - sliderX) / SLIDER_WIDTH;
          dx = (hitPos - 0.5) * 6;
        }

        // Reset if off bottom
        if (y > GAME_HEIGHT + BALL_RADIUS) {
          x = GAME_WIDTH / 2;
          y = GAME_HEIGHT - 100;
          dx = 5; // Increased from 4
          dy = -6; // Increased from -5
        }

        return { x, y, dx, dy };
      });

      // Check ball-bubble collisions (after ball update)
      setBubbles((prevBubbles) => {
        let poppedThisFrame = 0;
        const newBubbles = prevBubbles.map((b) => {
          if (!b.popped) {
            const bubbleCenterX = b.x + (b.size || BUBBLE_SIZE) / 2;
            const bubbleCenterY = b.y + (b.size || BUBBLE_SIZE) / 2;
            if (
              checkCollision(
                ball,
                { x: bubbleCenterX, y: bubbleCenterY },
                BALL_RADIUS,
                (b.size || BUBBLE_SIZE) / 2
              )
            ) {
              poppedThisFrame++;
              return { ...b, popped: true };
            }
          }
          return b;
        });

        if (poppedThisFrame > 0) {
          setProgress((prev) => Math.min(prev + poppedThisFrame * 2, 100));
          // Bounce the ball on pop
          setBall((prev) => ({ ...prev, dy: -prev.dy }));
        }

        return newBubbles;
      });
    }, 16);
    return () => clearInterval(interval);
  }, [gameStarted, sliderX, GAME_WIDTH, GAME_HEIGHT, ball]); // Depend on ball for collision checks

  // Slider drag handler (mouse/touch)
  const handleSliderDrag = (clientX) => {
    const rect = gameAreaRef.current.getBoundingClientRect();
    let x = clientX - rect.left - SLIDER_WIDTH / 2;
    x = Math.max(0, Math.min(GAME_WIDTH - SLIDER_WIDTH, x));
    setSliderX(x);
  };

  // Pop bubble on click/tap (+1 progress)
  const handleBubblePop = (id) => {
    setBubbles((prev) =>
      prev.map((bubble) =>
        bubble.id === id && !bubble.popped ? { ...bubble, popped: true } : bubble
      )
    );
    setProgress((prev) => Math.min(prev + 1, 100));
  };

  const showEnter = progress >= 100;

  // Enter handler
  const handleEnter = () => {
    setSwipeOut(true);
    setTimeout(() => {
      onEnter();
    }, 500);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center 
        ${swipeOut ? "animate-disperse pointer-events-none" : ""}
      `}
      style={{
        backgroundColor: "#1e293b",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <div className="relative">
        {/* Progress Display */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="text-center">
            <div className="text-6xl font-bold text-white mb-2">{progress}%</div>
          </div>
        </div>

        {/* Game Area */}
        <div
          ref={gameAreaRef}
          className="relative bg-gradient-to-b from-slate-100 to-slate-200 rounded-2xl shadow-2xl overflow-hidden border border-slate-300"
          style={{
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {/* Enter button */}
          <div className="absolute inset-0 flex items-center justify-center z-40">
            <button
              className={`text-white font-bold text-2xl px-12 py-6 rounded-xl shadow-2xl border-2 border-blue-400 backdrop-blur-md bg-white/10 transition-all duration-700 transform hover:scale-105 ${
                showEnter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
              }`}
              onClick={handleEnter}
            >
              Enter Portfolio
            </button>

            {/* Mobile Left/Right Controls */}
            <div className="absolute bottom-0 left-0 w-full z-40 flex justify-between md:hidden px-8 pb-6">
              <button
                className="bg-white/30 backdrop-blur-md border border-white/50 text-white rounded-full px-6 py-4 shadow-lg text-2xl active:scale-95 transition"
                onTouchStart={() => setKeys((prev) => ({ ...prev, left: true }))}
                onTouchEnd={() => setKeys((prev) => ({ ...prev, left: false }))}
                style={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  touchAction: "none",
                }}
              >
                ◀
              </button>
              <button
                className="bg-white/30 backdrop-blur-md border border-white/50 text-white rounded-full px-6 py-4 shadow-lg text-2xl active:scale-95 transition"
                onTouchStart={() => setKeys((prev) => ({ ...prev, right: true }))}
                onTouchEnd={() => setKeys((prev) => ({ ...prev, right: false }))}
                style={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  touchAction: "none",
                }}
              >
                ▶
              </button>
            </div>
          </div>

          {/* Bubbles */}
          {bubbles.map((b) =>
            !b.popped ? (
              <div
                key={b.id}
                className="absolute rounded-full bg-white border border-blue-300 shadow-[0_0_10px_rgba(147,197,253,0.5)] animate-glow cursor-pointer transition-transform duration-200 hover:scale-110"
                style={{
                  width: b.size || BUBBLE_SIZE,
                  height: b.size || BUBBLE_SIZE,
                  left: b.x,
                  top: b.y,
                  zIndex: 10,
                  background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(59,130,246,0.3))`,
                }}
                title="Click to pop!"
                onClick={() => handleBubblePop(b.id)}
              />
            ) : null
          )}

          {/* Ball */}
          <div
            className="absolute rounded-full shadow-2xl"
            style={{
              width: BALL_RADIUS * 2,
              height: BALL_RADIUS * 2,
              left: ball.x - BALL_RADIUS,
              top: ball.y - BALL_RADIUS,
              zIndex: 20,
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,1), rgba(255,255,255,0.85))`,
              boxShadow: `0 0 15px rgba(255,255,255,0.7), 0 0 30px rgba(255,255,255,0.5)`,
            }}
          />

          {/* Slider */}
          <div
            className="absolute bottom-6 left-0 w-full flex justify-center z-30"
            onMouseMove={(e) => {
              if (e.buttons === 1) handleSliderDrag(e.clientX);
            }}
            onTouchMove={(e) => {
              if (e.touches.length > 0) {
                handleSliderDrag(e.touches[0].clientX);
              }
            }}
          >
            <div
              className="bg-gradient-to-r from-slate-600 to-slate-700 rounded-full cursor-pointer shadow-xl hover:shadow-2xl transition-all"
              style={{
                height: SLIDER_HEIGHT,
                width: SLIDER_WIDTH,
                left: sliderX,
                position: "absolute",
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                const move = (ev) => handleSliderDrag(ev.clientX);
                const up = () => {
                  window.removeEventListener("mousemove", move);
                  window.removeEventListener("mouseup", up);
                };
                window.addEventListener("mousemove", move);
                window.addEventListener("mouseup", up);
              }}
              onTouchStart={() => {
                const move = (ev) => {
                  if (ev.touches.length > 0) {
                    handleSliderDrag(ev.touches[0].clientX);
                  }
                };
                const end = () => {
                  window.removeEventListener("touchmove", move);
                  window.removeEventListener("touchend", end);
                };
                window.addEventListener("touchmove", move);
                window.addEventListener("touchend", end);
              }}
            />
          </div>

          {/* Start Game */}
          {!gameStarted && (
            <div
              className="absolute inset-0 flex items-center justify-center z-50 pointer-events-auto"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.04) 100%)",
              }}
            >
              <div className="text-center">
                <button
                  className="mt-60 px-8 py-4 rounded-xl text-xl font-bold border-2 border-blue-400 bg-white/30 backdrop-blur-md text-black shadow-xl transition-all duration-300 hover:bg-white/60 hover:scale-105 hover:shadow-2xl"
                  onClick={() => setGameStarted(true)}
                >
                  POP!
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white text-sm">
            Use arrow keys ← → to control the paddle • Play to Unlock Portfolio!
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroGame;
