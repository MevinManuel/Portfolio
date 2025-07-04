import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Volume2, VolumeX, Music } from 'lucide-react';

const AudioPlayer = ({ onAudioContextChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  // Using a copyright-free lofi track (placeholder URL - we'll use a real one)
  const audioSrc = "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3";

  useEffect(() => {
    // Initialize audio context for rhythm analysis
    if (window.AudioContext || window.webkitAudioContext) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        if (onAudioContextChange) {
          onAudioContextChange(null);
        }
      } else {
        // Resume audio context if suspended
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        // Connect audio to analyser for rhythm detection
        if (audioContextRef.current && analyserRef.current && !audioRef.current.connectedToAnalyser) {
          const source = audioContextRef.current.createMediaElementSource(audioRef.current);
          source.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
          audioRef.current.connectedToAnalyser = true;
        }

        await audioRef.current.play();
        setIsPlaying(true);
        
        if (onAudioContextChange) {
          onAudioContextChange({
            analyser: analyserRef.current,
            audioContext: audioContextRef.current
          });
        }
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        volume={volume}
        onEnded={() => setIsPlaying(false)}
        onError={(e) => console.error('Audio error:', e)}
      />

      {/* Music toggle button - bottom left corner */}
      <div className="fixed bottom-4 left-4 z-50 bg-slate-900/90 backdrop-blur-md rounded-xl p-3 border border-slate-700 hover:border-blue-500 transition-all duration-300">
        <div className="flex items-center space-x-3">
          <Button
            onClick={togglePlay}
            variant="ghost"
            size="sm"
            className="text-slate-300 hover:text-blue-400 hover:bg-slate-800 transition-all duration-300"
          >
            {isPlaying ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </Button>
          
          {/* Volume slider - shows when playing */}
          {isPlaying && (
            <div className="flex items-center space-x-2 animate-in slide-in-from-left duration-300">
              <Music className="w-4 h-4 text-blue-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume * 100}%, #475569 ${volume * 100}%, #475569 100%)`
                }}
              />
            </div>
          )}
        </div>
        
        {/* Now playing indicator */}
        {isPlaying && (
          <div className="text-xs text-slate-400 mt-1 animate-pulse">
            ♪ Lo-fi ambient
          </div>
        )}
      </div>

      {/* CSS for volume slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 0 6px rgba(59, 130, 246, 0.5);
        }

        .slider::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 6px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </>
  );
};

export default AudioPlayer;