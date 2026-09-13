export interface ShapeTemplate {
  id: string;
  name: string;
  matrix: number[][]; // 1 = filled block, 0 = empty
  colorName: string;
  gradient: string;
  border: string;
  shadow: string;
  weight?: number;
}

export interface Piece {
  id: string;
  shapeId: string;
  matrix: number[][];
  colorName: string;
  gradient: string;
  border: string;
  shadow: string;
  width: number;
  height: number;
  blockCount: number;
}

export interface BoardCell {
  filled: boolean;
  colorName?: string;
  gradient?: string;
  border?: string;
  shadow?: string;
  isClearing?: boolean;
}

export type BoardMatrix = BoardCell[][];

export interface PlacementPreview {
  piece: Piece;
  startRow: number;
  startCol: number;
  isValid: boolean;
  affectedCells: { row: number; col: number }[];
  predictedRows: number[];
  predictedCols: number[];
}

export interface FloatingNotification {
  id: string;
  text: string;
  subText?: string;
  row: number;
  col: number;
  color: string;
}

export interface LineClearPopup {
  id: string;
  lines: number;
  points: number;
  comboLabel?: string;
}

export interface GameSnapshot {
  board: BoardMatrix;
  pieces: (Piece | null)[];
  score: number;
  linesCleared: number;
  piecesPlaced: number;
}
