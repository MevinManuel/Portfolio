import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import '../EasterEggSearch.css'

export default function EasterEggSearch() {
  const [input, setInput] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim().toLowerCase() === 'newjeans') {
      setUnlocked(true)
      confetti({ particleCount: 250, spread: 100, rotate:90, origin: { y: 0.6, } })
    }
  }

  return (
    <section className="easter-egg-bar" style={{ touchAction: 'auto', pointerEvents: 'auto' }}>
      <span className="easter-text">
        🧩 Psst... there's a secret word hidden in plain sight across this site! :
      </span>
      <form className="easter-form" onSubmit={handleSubmit} style={{ touchAction: 'auto', pointerEvents: 'auto' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type the word..."
          style={{ touchAction: 'manipulation', pointerEvents: 'auto' }} // Ensures tap-to-focus works on mobile
        />
        <button type="submit" style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}>
          GO
        </button>
        <button
          type="button"
          className="hint-button"
          onClick={() => setShowHint(!showHint)}
          title="Need a hint?"
          style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}
        >
          ℹ
        </button>
      </form>

      {showHint && (
        <div className="hint-box" style={{ touchAction: 'auto', pointerEvents: 'auto' }}>
          Hint: Spin around, dont look fast — 
          A letter hides where images are cast!
        </div>
      )}

      {unlocked && <p className="success-msg">🎉 You unlocked the easter egg! 🎉</p>}
    </section>
  )
}
