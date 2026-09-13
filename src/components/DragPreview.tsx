import React from 'react';
import { Piece } from '../types';

interface DragPreviewProps {
  piece: Piece | null;
  pointerPos: { x: number; y: number } | null;
  isTouch: boolean;
  cellSize: number;
}

export const DragPreview: React.FC<DragPreviewProps> = ({
  piece,
  pointerPos,
  isTouch,
  cellSize,
}) => {
  if (!piece || !pointerPos) return null;

  // Match touch offset and screen centering
  const offsetY = isTouch
    ? -((piece.height * cellSize) + 28)
    : -((piece.height * cellSize) / 2);
  const offsetX = -((piece.width * cellSize) / 2);

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        transform: `translate3d(${pointerPos.x + offsetX}px, ${pointerPos.y + offsetY}px, 0)`,
        willChange: 'transform',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      className="select-none"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${piece.width}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${piece.height}, ${cellSize}px)`,
          gap: '1px',
        }}
        className="drop-shadow-lg"
      >
        {piece.matrix.map((rowArr, r) =>
          rowArr.map((val, c) => (
            <div
              key={`drag-${r}-${c}`}
              style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
              className="flex items-center justify-center"
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
    </div>
  );
};
