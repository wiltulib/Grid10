import React from 'react';
import { Piece } from '../types';

interface PieceItemProps {
  piece: Piece;
  isPlayable: boolean;
  isDragging: boolean;
  onPointerDown: (piece: Piece, e: React.PointerEvent) => void;
}

export const PieceItem: React.FC<PieceItemProps> = ({
  piece,
  isPlayable,
  isDragging,
  onPointerDown,
}) => {
  const maxDim = Math.max(piece.width, piece.height);
  const cellClass =
    maxDim >= 5
      ? 'w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5'
      : maxDim >= 4
      ? 'w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4'
      : 'w-3.5 h-3.5 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5';

  return (
    <button
      type="button"
      id={`piece-slot-${piece.id}`}
      aria-label={`Drag ${piece.name} block`}
      title="Drag to board"
      onPointerDown={(e) => {
        if (!isPlayable) return;
        onPointerDown(piece, e);
      }}
      disabled={!isPlayable}
      className={`relative w-full aspect-square flex flex-col items-center justify-center p-1 sm:p-2 select-none touch-none transition-transform duration-100 ${
        isPlayable
          ? 'hover:scale-[1.04] active:scale-95 cursor-pointer'
          : 'opacity-25 cursor-not-allowed'
      } ${isDragging ? 'opacity-15' : ''}`}
    >
      {/* Visual blocks layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${piece.width}, minmax(0, 1fr))`,
          gap: '1.5px',
        }}
        className="w-auto h-auto max-w-[85%] max-h-[85%]"
      >
        {piece.matrix.map((rowArr, r) =>
          rowArr.map((val, c) => (
            <div
              key={`${r}-${c}`}
              className={`${cellClass} aspect-square flex items-center justify-center`}
            >
              {val === 1 ? (
                <div className={`w-full h-full ${piece.gradient} ring-1 ring-inset ring-ink`} />
              ) : (
                <div className="w-full h-full opacity-0 pointer-events-none" />
              )}
            </div>
          ))
        )}
      </div>
    </button>
  );
};
