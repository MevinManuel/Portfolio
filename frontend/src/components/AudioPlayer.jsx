import React, { useState } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Music, X } from 'lucide-react';

const spotifyTrackIds = [
    '25h0TqC9H3BcMA7KjK5nHK',
  '5expoVGQPvXuwBBFuNGqBd',
  '7pc3hxGf3xLsYXGKitStzP',
  '3FiNmQRoJNoqQ8UXbTv1zt',
  '7mVobUmGP12Y5SQJgBice3'
];

const AudioPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const nextTrack = () => {
    setTrackIndex((prev) => (prev + 1) % spotifyTrackIds.length);
  };

  const prevTrack = () => {
    setTrackIndex((prev) => (prev === 0 ? spotifyTrackIds.length - 1 : prev - 1));
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div
        className={`bg-slate-900/90 w-[320px] rounded-xl p-3 border border-slate-700 backdrop-blur-md shadow-xl transition-all duration-500 ${
          isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none h-0'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <Button onClick={prevTrack} size="sm" variant="ghost" className="text-slate-300 hover:text-blue-400">
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="text-slate-300 text-sm flex items-center gap-1 font-medium">
            <Music className="w-4 h-4 text-blue-400" />
            Recent Favs :)
          </div>

          <Button onClick={nextTrack} size="sm" variant="ghost" className="text-slate-300 hover:text-blue-400">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Spotify Embed */}
        <div className="overflow-hidden rounded-lg">
          <iframe
            title="Spotify Preview"
            src={`https://open.spotify.com/embed/track/${spotifyTrackIds[trackIndex]}?utm_source=generator`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="encrypted-media"
            className="rounded-md"
          ></iframe>
        </div>

        <div className="mt-3 flex justify-end">
          <Button
            onClick={toggleExpand}
            size="sm"
            variant="ghost"
            className="text-slate-400 hover:text-green-400 text-xs"
          >
            <X className="w-4 h-4 mr-1" />
            minimize
          </Button>
        </div>
      </div>

      {!isExpanded && (
        <button
          onClick={toggleExpand}
          className="bg-slate-900/90 border border-slate-700 hover:border-blue-500 backdrop-blur-md p-3 rounded-full text-white shadow-lg transition-all duration-300"
        >
          <Music className="w-5 h-5 text-blue-400" />
        </button>
      )}
    </div>
  );
};

export default AudioPlayer;
