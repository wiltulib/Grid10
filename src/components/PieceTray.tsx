import React from 'react';
import { Piece } from '../types';
import { PieceItem } from './PieceItem';

interface PieceTrayProps {
  pieces: (Piece | null)[];
  playableMap: Map<string, boolean>;
  draggingPieceId: string | null;
  onPiecePointerDown: (piece: Piece, e: React.PointerEvent) => void;
}

export const PieceTray: React.FC<PieceTrayProps> = ({
  pieces,
  playableMap,
  draggingPieceId,
  onPiecePointerDown,
}) => {
  return (
    <div className="w-full select-none mt-1 sm:mt-2 flex-shrink-0">
      <div
        id="piece-tray-container"
        className="w-full grid grid-cols-3 gap-2 sm:gap-2.5 items-center"
      >
        {pieces.map((piece, index) => {
          if (!piece) {
            return (
              <div
                key={`empty-slot-${index}`}
                className="w-full aspect-square flex items-center justify-center"
              />
            );
          }

          const isPlayable = playableMap.get(piece.id) ?? true;
          const isDragging = draggingPieceId === piece.id;

          return (
            <PieceItem
              key={piece.id}
              piece={piece}
              isPlayable={isPlayable}
              isDragging={isDragging}
              onPointerDown={onPiecePointerDown}
            />
          );
        })}
      </div>
    </div>
  );
};
