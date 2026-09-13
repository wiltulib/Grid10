import React from 'react';

interface ScorePanelProps {
  score: number;
  highScore: number;
  isNewHighScore: boolean;
  linesCleared?: number;
  piecesPlaced?: number;
  onRestart?: () => void;
}

export const ScorePanel: React.FC<ScorePanelProps> = ({
  score,
  highScore,
  isNewHighScore,
}) => {
  return (
    <div
      id="side-score-panel"
      className="w-full h-[258px] border-2 border-ink p-6 lg:p-7 relative flex flex-col justify-center gap-5 sm:gap-6 bg-bg select-none shadow-xs"
    >
      {/* Current Score */}
      <div className="flex flex-col">
        <div className="font-mono text-[0.68rem] sm:text-[0.72rem] uppercase tracking-[0.16em] opacity-60 mb-2 font-bold text-ink">
          Current Score
        </div>
        <div
          id="score-current-val"
          className="font-mono text-4xl sm:text-5xl font-black leading-tight tracking-tight text-ink tabular-nums"
        >
          {score}
        </div>
      </div>

      {/* High Score */}
      <div className="border-t border-ink/15 pt-4 sm:pt-5 flex flex-col">
        <div className="font-mono text-[0.68rem] sm:text-[0.72rem] uppercase tracking-[0.16em] opacity-60 mb-2 font-bold text-ink flex items-center justify-between">
          <span>High Score</span>
          {isNewHighScore && (
            <span className="text-[#FF5A5F] text-[9px] tracking-wider animate-pulse font-bold">
              NEW BEST!
            </span>
          )}
        </div>
        <div
          id="score-high-val"
          className="font-mono text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-[#FF5A5F] tabular-nums"
        >
          {highScore}
        </div>
      </div>
    </div>
  );
};
