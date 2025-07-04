import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Play, Pause, RotateCcw, Music } from 'lucide-react';

const RhythmClicker = ({ audioContext, isAudioPlaying }) => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [beats, setBeats] = useState([]);
  const [gameTime, setGameTime] = useState(0);
  const [beatStrength, setBeatStrength] = useState(0);
  
  const gameRef = useRef(null);
  const animationRef = useRef(null);
  const lastBeatTimeRef = useRef(0);
  const beatThresholdRef = useRef(80);

  // Analyze audio for beats
  const analyzeAudio = useCallback(() => {
    if (!audioContext?.analyser || !isGameActive) return;

    const bufferLength = audioContext.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    audioContext.analyser.getByteFrequencyData(dataArray);

    // Calculate average amplitude in bass frequencies (0-4 range for beat detection)
    const bassData = dataArray.slice(0, 4);
    const bassAverage = bassData.reduce((sum, value) => sum + value, 0) / bassData.length;
    
    setBeatStrength(bassAverage);

    // Detect beats based on sudden increases in bass
    const currentTime = Date.now();
    if (bassAverage > beatThresholdRef.current && 
        currentTime - lastBeatTimeRef.current > 300) { // Minimum 300ms between beats
      
      createBeat();
      lastBeatTimeRef.current = currentTime;
    }

    animationRef.current = requestAnimationFrame(analyzeAudio);
  }, [audioContext, isGameActive]);

  // Create a new beat circle
  const createBeat = () => {
    const newBeat = {
      id: Date.now(),
      x: Math.random() * 250 + 25, // Random position within game area
      y: Math.random() * 200 + 25,
      timeLeft: 2000, // 2 seconds to click
      size: 40,
      clicked: false
    };

    setBeats(prev => [...prev, newBeat]);
  };

  // Handle beat click
  const handleBeatClick = (beatId) => {
    setBeats(prev => 
      prev.map(beat => 
        beat.id === beatId ? { ...beat, clicked: true } : beat
      )
    );

    // Update score and combo
    setScore(prev => prev + 10 + (combo * 2));
    setCombo(prev => {
      const newCombo = prev + 1;
      setMaxCombo(current => Math.max(current, newCombo));
      return newCombo;
    });
  };

  // Game loop
  useEffect(() => {
    if (!isGameActive) return;

    const gameLoop = setInterval(() => {
      setGameTime(prev => prev + 100);
      
      setBeats(prev => {
        const updatedBeats = prev.map(beat => ({
          ...beat,
          timeLeft: beat.timeLeft - 100,
          size: beat.clicked ? beat.size * 0.8 : beat.size
        })).filter(beat => {
          // Remove expired beats
          if (beat.timeLeft <= 0 && !beat.clicked) {
            setCombo(0); // Reset combo on miss
            return false;
          }
          // Remove clicked beats after animation
          if (beat.clicked && beat.size < 10) {
            return false;
          }
          return true;
        });

        return updatedBeats;
      });
    }, 100);

    return () => clearInterval(gameLoop);
  }, [isGameActive]);

  // Start audio analysis when game starts
  useEffect(() => {
    if (isGameActive && audioContext) {
      analyzeAudio();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isGameActive, audioContext, analyzeAudio]);

  const startGame = () => {
    if (!isAudioPlaying) {
      alert('Please turn on the background music first to play Rhythm Clicker!');
      return;
    }
    setIsGameActive(true);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setBeats([]);
    setGameTime(0);
  };

  const pauseGame = () => {
    setIsGameActive(false);
  };

  const resetGame = () => {
    setIsGameActive(false);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setBeats([]);
    setGameTime(0);
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center">
          <Music className="w-6 h-6 mr-2 text-blue-400" />
          Rhythm Clicker
        </h3>
        <p className="text-slate-400 text-sm">
          Click the beats as they appear! Sync with the lo-fi music.
        </p>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{score}</div>
          <div className="text-xs text-slate-500">Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{combo}</div>
          <div className="text-xs text-slate-500">Combo</div>
        </div>
      </div>

      {/* Game Area */}
      <div 
        ref={gameRef}
        className="relative w-full h-64 bg-slate-900 rounded-lg border-2 border-slate-700 overflow-hidden mb-4"
        style={{
          background: `radial-gradient(circle at center, 
            rgba(59, 130, 246, ${beatStrength / 255 * 0.1}) 0%, 
            rgba(15, 23, 42, 1) 70%)`
        }}
      >
        {/* Game instructions or start message */}
        {!isGameActive && beats.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-center">
            <div>
              <Music className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                {!isAudioPlaying 
                  ? 'Turn on music to start!' 
                  : 'Click Play to begin rhythm game'
                }
              </p>
            </div>
          </div>
        )}

        {/* Beat circles */}
        {beats.map(beat => (
          <div
            key={beat.id}
            className={`absolute cursor-pointer transition-all duration-100 ${
              beat.clicked 
                ? 'bg-green-400 animate-ping' 
                : 'bg-blue-500 hover:bg-blue-400 animate-pulse'
            }`}
            style={{
              left: beat.x,
              top: beat.y,
              width: beat.size,
              height: beat.size,
              borderRadius: '50%',
              opacity: beat.timeLeft / 2000,
              transform: `scale(${beat.clicked ? 0.5 : 1})`,
              boxShadow: beat.clicked 
                ? '0 0 20px rgba(34, 197, 94, 0.8)' 
                : '0 0 15px rgba(59, 130, 246, 0.6)'
            }}
            onClick={() => !beat.clicked && handleBeatClick(beat.id)}
          />
        ))}

        {/* Audio visualization */}
        {isGameActive && (
          <div 
            className="absolute bottom-2 left-2 right-2 h-1 bg-slate-700 rounded-full overflow-hidden"
          >
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-100"
              style={{ width: `${(beatStrength / 128) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Game Controls */}
      <div className="flex justify-center space-x-2 mb-4">
        {!isGameActive ? (
          <Button
            onClick={startGame}
            disabled={!isAudioPlaying}
            className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            <Play className="w-4 h-4 mr-2" />
            Play
          </Button>
        ) : (
          <Button
            onClick={pauseGame}
            className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
        )}
        
        <Button
          onClick={resetGame}
          variant="outline"
          className="border-slate-600 text-slate-300 hover:border-blue-500 hover:text-blue-300 px-4 py-2 rounded-lg transition-all duration-300"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Best Score Display */}
      {maxCombo > 0 && (
        <div className="text-center">
          <Badge variant="secondary" className="bg-slate-700 text-slate-300">
            Best Combo: {maxCombo}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default RhythmClicker;