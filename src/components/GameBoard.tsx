import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { BOARD_SIZE } from '../constants/shapes';
import { BoardMatrix, FloatingNotification, PlacementPreview } from '../types';
import { BlockCell } from './BlockCell';

export interface GameBoardRef {
  getBoardBoundingRect: () => DOMRect | null;
  getCellSize: () => number;
  getCellAtPoint: (x: number, y: number) => { row: number; col: number } | null;
  getPlacementForPiece: (
    piece: { width: number; height: number },
    pieceScreenLeft: number,
    pieceScreenTop: number
  ) => { startRow: number; startCol: number; inBounds: boolean } | null;
}

interface GameBoardProps {
  board: BoardMatrix;
  preview: PlacementPreview | null;
  darkMode?: boolean;
  onCellPointerEnter: (row: number, col: number) => void;
  onBoardPointerLeave: () => void;
}

export const GameBoard = forwardRef<GameBoardRef, GameBoardProps>(({
  board,
  preview,
  onCellPointerEnter,
  onBoardPointerLeave,
}, ref) => {
  const boardContainerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    getBoardBoundingRect: () => {
      return boardContainerRef.current?.getBoundingClientRect() ?? null;
    },
    getCellSize: () => {
      if (!boardContainerRef.current) return 40;
      const rect = boardContainerRef.current.getBoundingClientRect();
      return rect.width / BOARD_SIZE;
    },
    getCellAtPoint: (x: number, y: number) => {
      if (!boardContainerRef.current) return null;
      const rect = boardContainerRef.current.getBoundingClientRect();
      if (
        x < rect.left ||
        x > rect.right ||
        y < rect.top ||
        y > rect.bottom
      ) {
        return null;
      }

      const relX = x - rect.left;
      const relY = y - rect.top;
      const cellWidth = rect.width / BOARD_SIZE;
      const cellHeight = rect.height / BOARD_SIZE;

      const col = Math.floor(relX / cellWidth);
      const row = Math.floor(relY / cellHeight);

      if (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE) {
        return { row, col };
      }
      return null;
    },
    getPlacementForPiece: (
      piece: { width: number; height: number },
      pieceScreenLeft: number,
      pieceScreenTop: number
    ) => {
      if (!boardContainerRef.current) return null;
      const rect = boardContainerRef.current.getBoundingClientRect();
      const cellWidth = rect.width / BOARD_SIZE;
      const cellHeight = rect.height / BOARD_SIZE;

      // Real time alignment: nearest grid coordinates aligned with the piece's top-left corner
      const startCol = Math.round((pieceScreenLeft - rect.left) / cellWidth);
      const startRow = Math.round((pieceScreenTop - rect.top) / cellHeight);

      // Verify the piece has overlapping proximity with the board
      if (
        startCol < -1 ||
        startCol > BOARD_SIZE ||
        startRow < -1 ||
        startRow > BOARD_SIZE
      ) {
        return null;
      }

      const inBounds =
        startRow >= 0 &&
        startRow + piece.height <= BOARD_SIZE &&
        startCol >= 0 &&
        startCol + piece.width <= BOARD_SIZE;

      return { startRow, startCol, inBounds };
    },
  }));

  const ghostCellMap = new Map<string, boolean>();

  if (preview) {
    preview.affectedCells.forEach((c) => {
      ghostCellMap.set(`${c.row},${c.col}`, preview.isValid);
    });
  }

  return (
    <div className="w-full relative flex flex-col items-center">
      {/* 10x10 Board with uniform crisp lines and responsive viewport scaling */}
      <div
        id="game-board-frame"
        className="w-full max-w-[min(100%,min(420px,calc(100dvh-240px)))] aspect-square relative select-none flex-shrink-0"
      >
        <div
          ref={boardContainerRef}
          id="game-board-grid"
          onPointerLeave={onBoardPointerLeave}
          className="w-full h-full grid grid-cols-10 grid-rows-10 border-2 border-ink bg-bg gap-0 touch-none"
        >
          {board.map((rowArr, r) =>
            rowArr.map((cell, c) => {
              const ghostKey = `${r},${c}`;
              const isGhost = ghostCellMap.has(ghostKey);
              const isGhostValid = ghostCellMap.get(ghostKey) ?? false;

              return (
                <BlockCell
                  key={`${r}-${c}`}
                  row={r}
                  col={c}
                  cell={cell}
                  isGhost={isGhost}
                  isGhostValid={isGhostValid}
                  ghostGradient={preview?.piece.gradient}
                  onPointerEnter={onCellPointerEnter}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
});

GameBoard.displayName = 'GameBoard';
