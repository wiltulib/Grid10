import React from 'react';
import { Play, Settings, Trophy } from 'lucide-react';

interface HomeScreenProps {
  highScore: number;
  onStartGame: () => void;
  onOpenSettings: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  highScore,
  onStartGame,
  onOpenSettings,
}) => {
  return (
    <div
      id="home-screen-container"
      className="w-full max-w-md mx-auto my-auto flex flex-col items-center justify-center py-6 px-4 select-none animate-fadeIn font-mono"
    >
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="font-syne font-black text-5xl sm:text-6xl tracking-tight text-ink leading-none">
            GRID10
          </h1>
          <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#FF5A5F] uppercase border-2 border-[#FF5A5F] px-1.5 py-0.5">
            PRO
          </span>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-ink/60 font-semibold">
          Tactical 10×10 Block Matrix
        </p>
      </div>

      {/* Decorative Matrix Accent */}
      <div
        id="home-matrix-preview"
        className="grid grid-cols-4 grid-rows-4 gap-1 p-3 border-2 border-ink bg-bg-card shadow-md mb-8"
        aria-hidden="true"
      >
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-ink border border-ink/30" />
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-ink border border-ink/30" />
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#FF5A5F] border border-ink/30" />
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-bg border border-ink/15" />

        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-bg border border-ink/15" />
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#10B981] border border-ink/30" />
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#FF5A5F] border border-ink/30" />
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#FF5A5F] border border-ink/30" />

        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#3B82F6] border border-ink/30" />
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#10B981] border border-ink/30" />
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#10B981] border border-ink/30" />
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-bg border border-ink/15" />

        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#3B82F6] border border-ink/30" />
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#3B82F6] border border-ink/30" />
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-bg border border-ink/15" />
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-bg border border-ink/15" />
      </div>

      {/* High Score Badge */}
      {highScore > 0 && (
        <div
          id="home-high-score"
          className="flex items-center gap-2 px-4 py-2 border border-ink/30 bg-bg-card mb-6 text-xs uppercase tracking-wider"
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span className="opacity-60 font-semibold">High Score:</span>
          <span className="font-bold text-ink tabular-nums text-sm">
            {highScore}
          </span>
        </div>
      )}

      {/* Main Display Actions: Game Start & Settings */}
      <div className="w-full max-w-xs flex flex-col gap-3">
        <button
          id="btn-home-start"
          onClick={onStartGame}
          className="w-full py-3.5 px-6 border-2 border-ink bg-ink text-bg hover:bg-bg-card hover:text-ink active:translate-y-0.5 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg"
        >
          <Play className="w-4 h-4 fill-current text-[#10B981]" />
          <span>START GAME</span>
        </button>

        <button
          id="btn-home-settings"
          onClick={onOpenSettings}
          className="w-full py-3 px-6 border-2 border-ink bg-bg-card text-ink hover:bg-ink hover:text-bg active:translate-y-0.5 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all cursor-pointer group shadow-sm"
        >
          <Settings className="w-4 h-4 text-[#10B981] group-hover:text-[#10B981]" />
          <span>SETTINGS</span>
        </button>
      </div>

      {/* Version Footer */}
      <div className="mt-8 text-[10px] uppercase tracking-widest opacity-40">
        GRID10 PRO // EDITION 2026
      </div>
    </div>
  );
};
