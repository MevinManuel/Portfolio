import React, { useState, useEffect } from "react";

const ReflexClicker = () => {
  const [gameState, setGameState] = useState("waiting"); // waiting, ready, clicked
  const [message, setMessage] = useState("Click to start");
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const startGame = () => {
    setGameState("waiting");
    setMessage("Wait for green...");
    setReactionTime(null);

    const randomDelay = Math.floor(Math.random() * 3000) + 2000; // 2-5s
    const id = setTimeout(() => {
      setGameState("ready");
      setMessage("Click now!");
      setStartTime(Date.now());
    }, randomDelay);
    setTimeoutId(id);
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      clearTimeout(timeoutId);
      setMessage("Too soon! Click to try again.");
      setGameState("clicked");
    } else if (gameState === "ready") {
      const rt = Date.now() - startTime;
      setReactionTime(rt);
      setBestTime((prev) => (prev === null ? rt : Math.min(prev, rt)));
      setMessage(`Your time: ${rt}ms — Click to play again`);
      setGameState("clicked");
    } else {
      startGame();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-xl p-6 text-center transition-all duration-300 cursor-pointer select-none ${
        gameState === "ready"
          ? "bg-green-500"
          : gameState === "waiting"
          ? "bg-slate-700"
          : "bg-slate-800"
      }`}
    >
      <h3 className="text-xl text-white font-bold mb-2">⚡Scrolled Too Far? Time for a Reflex Test!</h3>
      <p className="text-slate-300 mb-4">{message}</p>

      {reactionTime !== null && (
        <p className="text-blue-400 font-semibold text-lg">
          ⏱ Reaction: {reactionTime}ms
        </p>
      )}
      {bestTime !== null && (
        <p className="text-green-400 text-sm mt-1">
          🏆 Best: {bestTime}ms
        </p>
      )}
    </div>
  );
};

export default ReflexClicker;
