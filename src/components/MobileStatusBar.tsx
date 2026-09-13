import React from 'react';

interface MobileStatusBarProps {
  score: number;
  highScore: number;
  isNewHighScore: boolean;
  linesCleared?: number;
  piecesPlaced?: number;
  onRestart?: () => void;
}

export const MobileStatusBar: React.FC<MobileStatusBarProps> = ({
  score,
  highScore,
  isNewHighScore,
}) => {
  return (
    <div
      id="mobile-status-bar"
      className="w-full mb-1.5 flex items-center justify-center view-mobile-portrait-only select-none flex-shrink-0"
    >
      {/* Live Scores Centered Without Grid / Table Borders */}
      <div className="flex items-center justify-center gap-8 sm:gap-10 py-1 whitespace-nowrap">
        {/* Score */}
        <div className="text-center">
          <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest font-bold opacity-60 mb-0.5">
            Score
          </div>
          <div
            id="mobile-score-val"
            className="font-mono text-xl sm:text-2xl font-black leading-none tracking-tight text-ink tabular-nums"
          >
            {score}
          </div>
        </div>

        {/* Best High Score */}
        <div className="text-center">
          <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest font-bold opacity-60 mb-0.5 flex items-center justify-center gap-1">
            <span>Best</span>
            {isNewHighScore && (
              <span className="text-[#FF5A5F] text-[8px] font-bold animate-pulse">
                NEW!
              </span>
            )}
          </div>
          <div
            id="mobile-high-score-val"
            className="font-mono text-xl sm:text-2xl font-black leading-none tracking-tight text-[#FF5A5F] tabular-nums"
          >
            {highScore}
          </div>
        </div>
      </div>
    </div>
  );
};
