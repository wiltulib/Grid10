import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Home } from 'lucide-react';

interface GameOverModalProps {
  score: number;
  highScore: number;
  isNewHighScore: boolean;
  linesCleared: number;
  piecesPlaced: number;
  onPlayAgain: () => void;
  onGoHome?: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  highScore,
  isNewHighScore,
  linesCleared,
  piecesPlaced,
  onPlayAgain,
  onGoHome,
}) => {
  useEffect(() => {
    if (isNewHighScore && score > 0) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#111113', '#FF5A5F', '#F8F7F4'],
        });
      } catch {
        // Ignore
      }
    }
  }, [isNewHighScore, score]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-xs select-none">
      <div
        id="game-over-dialog"
        className="w-full max-w-md p-5 sm:p-8 border-2 border-ink bg-bg shadow-2xl flex flex-col font-mono max-h-[90dvh] overflow-y-auto"
      >
        <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60 mb-1 font-bold text-[#FF5A5F]">
          System Alert // NO MOVES REMAINING
        </div>

        <h2 className="font-syne font-black text-4xl sm:text-5xl tracking-[-0.05em] text-ink mb-2">
          {isNewHighScore ? 'NEW RECORD!' : 'GAME OVER'}
        </h2>

        <p className="text-xs text-ink/70 mb-6 leading-relaxed">
          {isNewHighScore
            ? 'Outstanding performance! A new personal best score has been recorded.'
            : 'No available moves exist on the 10x10 grid for the remaining blocks.'}
        </p>

        {/* Score values */}
        <div className="border border-ink p-4 mb-6 bg-bg-card shadow-xs">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-[10px] uppercase tracking-widest opacity-60 font-bold">Final Score</span>
            <span className="text-4xl sm:text-5xl font-bold font-mono text-ink tabular-nums">{score}</span>
          </div>
          <div className="flex justify-between items-baseline border-t border-ink/20 pt-2">
            <span className="text-[10px] uppercase tracking-widest opacity-60 font-bold">High Score</span>
            <span className="text-xl font-bold font-mono text-[#FF5A5F] tabular-nums">{highScore}</span>
          </div>
        </div>

        {/* Telemetry */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-xs border border-ink/30 p-3">
          <div>
            <div className="text-[9px] uppercase tracking-widest opacity-50">Lines Cleared</div>
            <div className="text-lg font-bold text-ink">{linesCleared}</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-widest opacity-50">Blocks Placed</div>
            <div className="text-lg font-bold text-ink">{piecesPlaced}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            id="btn-play-again"
            onClick={onPlayAgain}
            className="flex-1 py-3.5 px-5 font-mono text-xs uppercase font-bold tracking-[0.12em] border border-ink bg-ink text-bg hover:bg-[#2A2A2E] active:translate-y-0.5 transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Play Again</span>
          </button>
          {onGoHome && (
            <button
              id="btn-game-over-home"
              onClick={onGoHome}
              className="py-3.5 px-5 font-mono text-xs uppercase font-bold tracking-[0.12em] border border-ink bg-bg-card text-ink hover:bg-ink hover:text-bg active:translate-y-0.5 transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
