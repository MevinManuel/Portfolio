import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import '../EasterEggSearch.css';

export default function EasterEggSearch() {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === 'newjeans') {
      setUnlocked(true);
      confetti({ particleCount: 250, spread: 100, rotate: 90, origin: { y: 0.6 } });
    }
  };

  // Handler to ensure touch events propagate to input (prevents blocking)
  const handleTouchStart = (e) => {
    e.stopPropagation(); // Stop bubbling to parents that might block
  };

  return (
    <section
      className="easter-egg-bar"
      style={{
        touchAction: 'auto',
        pointerEvents: 'auto',
        position: 'relative', // Ensures it's positioned correctly
        zIndex: 9999, // High z-index to avoid overlays
      }}
      onTouchStart={handleTouchStart}
    >
      <span className="easter-text">
        🧩 Psst... there's a secret word hidden in plain sight across this site! :
      </span>
      <form
        className="easter-form"
        onSubmit={handleSubmit}
        style={{
          touchAction: 'auto',
          pointerEvents: 'auto',
          zIndex: 9999,
        }}
        onTouchStart={handleTouchStart}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type the word..."
          tabIndex={0} // Improves focusability
          style={{
            touchAction: 'manipulation',
            pointerEvents: 'auto',
            userSelect: 'text', // Allows text selection and focus on mobile
            WebkitUserSelect: 'text', // Safari/iOS fix
            zIndex: 9999,
          }}
          onTouchStart={handleTouchStart}
          onFocus={(e) => e.target.focus()} // Force focus on tap
        />
        <button
          type="submit"
          style={{
            touchAction: 'manipulation',
            pointerEvents: 'auto',
            zIndex: 9999,
          }}
          onTouchStart={handleTouchStart}
        >
          GO
        </button>
        <button
          type="button"
          className="hint-button"
          onClick={() => setShowHint(!showHint)}
          title="Need a hint?"
          style={{
            touchAction: 'manipulation',
            pointerEvents: 'auto',
            zIndex: 9999,
          }}
          onTouchStart={handleTouchStart}
        >
          ℹ
        </button>
      </form>

      {showHint && (
        <div
          className="hint-box"
          style={{
            touchAction: 'auto',
            pointerEvents: 'auto',
            zIndex: 9999,
          }}
          onTouchStart={handleTouchStart}
        >
          Hint: Spin around, dont look fast — A letter hides where images are cast!
        </div>
      )}

      {unlocked && <p className="success-msg">🎉 You unlocked the easter egg! 🎉</p>}
    </section>
  );
}
