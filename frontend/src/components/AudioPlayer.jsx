import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { LofiGenerator } from '../utils/audioGenerator';

const AudioPlayer = ({ onAudioContextChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const lofiGeneratorRef = useRef(null);
  const analyserRef = useRef(null);

  useEffect(() => {
    lofiGeneratorRef.current = new LofiGenerator();
    
    return () => {
      if (lofiGeneratorRef.current) {
        lofiGeneratorRef.current.stop();
      }
    };
  }, []);

  const togglePlay = async () => {
    try {
      if (isPlaying) {
        if (lofiGeneratorRef.current) {
          lofiGeneratorRef.current.stop();
        }
        setIsPlaying(false);
        if (onAudioContextChange) {
          onAudioContextChange(null);
        }
      } else {
        const audioContext = await lofiGeneratorRef.current.startLofiAmbient();
        analyserRef.current = lofiGeneratorRef.current.getAnalyser();
        
        setIsPlaying(true);
        
        if (onAudioContextChange) {
          onAudioContextChange({
            analyser: analyserRef.current,
            audioContext: audioContext
          });
        }
      }
    } catch (error) {
      console.error('Error with audio:', error);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (lofiGeneratorRef.current && lofiGeneratorRef.current.masterGain) {
      lofiGeneratorRef.current.masterGain.gain.value = newVolume * 0.1;
    }
  };

  return (
    <>
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