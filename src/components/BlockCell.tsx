import React from 'react';
import { BoardCell } from '../types';

interface BlockCellProps {
  row: number;
  col: number;
  cell: BoardCell;
  darkMode?: boolean;
  isGhost?: boolean;
  isGhostValid?: boolean;
  ghostGradient?: string;
  isPredictedClear?: boolean;
  onPointerDown?: (row: number, col: number) => void;
  onPointerEnter?: (row: number, col: number) => void;
}

export const BlockCell: React.FC<BlockCellProps> = React.memo(({
  row,
  col,
  cell,
  isGhost = false,
  isGhostValid = true,
  ghostGradient,
  onPointerDown,
  onPointerEnter,
}) => {
  const isFilled = cell.filled;
  const isClearing = cell.isClearing;
  const isLastCol = col === 9;
  const isLastRow = row === 9;

  return (
    <div
      id={`cell-${row}-${col}`}
      data-row={row}
      data-col={col}
      onPointerDown={() => onPointerDown?.(row, col)}
      onPointerEnter={() => onPointerEnter?.(row, col)}
      className={`relative w-full h-full aspect-square select-none flex items-center justify-center cursor-pointer box-border transition-colors duration-75 bg-bg hover:bg-[#EFECE6] ${
        !isLastCol ? 'border-r border-ink/30' : ''
      } ${
        !isLastRow ? 'border-b border-ink/30' : ''
      }`}
    >
      {/* The actual filled block */}
      {isFilled && (
        <div 
          className={`absolute inset-0 ${
            isClearing 
              ? 'animate-cell-clear z-30' 
              : `${cell.gradient ?? 'bg-[#F59E0B]'} ring-1 ring-inset ring-ink z-10`
          }`}
        />
      )}

      {/* Ghost placement preview on table - static, clear preview */}
      {isGhost && !isFilled && (
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            isGhostValid
              ? `${ghostGradient ?? 'bg-[#F59E0B]'} ring-1 ring-inset ring-ink opacity-80`
              : 'bg-[#FF5A5F]/35'
          }`}
        />
      )}
      
      {isGhost && isFilled && !isGhostValid && (
        <div className="absolute inset-0 bg-[#FF5A5F]/35 z-20 pointer-events-none" />
      )}
    </div>
  );
});

BlockCell.displayName = 'BlockCell';
