import { BOARD_SIZE, SHAPES } from '../constants/shapes';
import { BoardCell, BoardMatrix, Piece, PlacementPreview, ShapeTemplate } from '../types';

export function createEmptyBoard(): BoardMatrix {
  const board: BoardMatrix = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    const row: BoardCell[] = [];
    for (let c = 0; c < BOARD_SIZE; c++) {
      row.push({ filled: false });
    }
    board.push(row);
  }
  return board;
}

export function createPieceFromTemplate(template: ShapeTemplate): Piece {
  const height = template.matrix.length;
  const width = template.matrix[0].length;
  let blockCount = 0;
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (template.matrix[r][c] === 1) blockCount++;
    }
  }

  const randomId = Math.random().toString(36).substring(2, 9);

  return {
    id: `${template.id}_${randomId}`,
    shapeId: template.id,
    matrix: template.matrix,
    colorName: template.colorName,
    gradient: template.gradient,
    border: template.border,
    shadow: template.shadow,
    width,
    height,
    blockCount,
  };
}

export function pickRandomShape(): ShapeTemplate {
  const totalWeight = SHAPES.reduce((sum, s) => sum + (s.weight ?? 5), 0);
  let random = Math.random() * totalWeight;

  for (const shape of SHAPES) {
    const weight = shape.weight ?? 5;
    if (random <= weight) {
      return shape;
    }
    random -= weight;
  }

  return SHAPES[0];
}

export function generatePieceSet(count = 3): Piece[] {
  const pieces: Piece[] = [];
  for (let i = 0; i < count; i++) {
    const template = pickRandomShape();
    pieces.push(createPieceFromTemplate(template));
  }
  return pieces;
}

export function canPlacePiece(
  board: BoardMatrix,
  piece: Piece,
  startRow: number,
  startCol: number
): boolean {
  if (startRow < 0 || startCol < 0) return false;
  if (startRow + piece.height > BOARD_SIZE || startCol + piece.width > BOARD_SIZE) return false;

  for (let r = 0; r < piece.height; r++) {
    for (let c = 0; c < piece.width; c++) {
      if (piece.matrix[r][c] === 1) {
        const targetR = startRow + r;
        const targetC = startCol + c;
        if (targetR >= BOARD_SIZE || targetC >= BOARD_SIZE) return false;
        if (board[targetR][targetC].filled) {
          return false;
        }
      }
    }
  }

  return true;
}

export function canPlaceAnywhere(board: BoardMatrix, piece: Piece): boolean {
  for (let r = 0; r <= BOARD_SIZE - piece.height; r++) {
    for (let c = 0; c <= BOARD_SIZE - piece.width; c++) {
      if (canPlacePiece(board, piece, r, c)) {
        return true;
      }
    }
  }
  return false;
}

export function checkGameOver(board: BoardMatrix, pieces: (Piece | null)[]): boolean {
  const availablePieces = pieces.filter((p): p is Piece => p !== null);
  if (availablePieces.length === 0) {
    // If no pieces remain, game is not over; a new set will be dealt
    return false;
  }

  // If at least one piece can fit anywhere, game continues
  for (const piece of availablePieces) {
    if (canPlaceAnywhere(board, piece)) {
      return false;
    }
  }

  // None of the remaining pieces can be placed anywhere!
  return true;
}

export function findCompletedLines(board: BoardMatrix): { rows: number[]; cols: number[] } {
  const rows: number[] = [];
  const cols: number[] = [];

  // Check rows
  for (let r = 0; r < BOARD_SIZE; r++) {
    let full = true;
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (!board[r][c].filled) {
        full = false;
        break;
      }
    }
    if (full) rows.push(r);
  }

  // Check cols
  for (let c = 0; c < BOARD_SIZE; c++) {
    let full = true;
    for (let r = 0; r < BOARD_SIZE; r++) {
      if (!board[r][c].filled) {
        full = false;
        break;
      }
    }
    if (full) cols.push(c);
  }

  return { rows, cols };
}

export function calculatePreview(
  board: BoardMatrix,
  piece: Piece,
  startRow: number,
  startCol: number
): PlacementPreview | null {
  const isValid = canPlacePiece(board, piece, startRow, startCol);
  const affectedCells: { row: number; col: number }[] = [];

  for (let r = 0; r < piece.height; r++) {
    for (let c = 0; c < piece.width; c++) {
      if (piece.matrix[r][c] === 1) {
        affectedCells.push({ row: startRow + r, col: startCol + c });
      }
    }
  }

  if (!isValid) {
    return {
      piece,
      startRow,
      startCol,
      isValid: false,
      affectedCells,
      predictedRows: [],
      predictedCols: [],
    };
  }

  // Simulate board with piece placed to see which lines WOULD complete
  const tempBoard = board.map((row) => row.map((cell) => ({ ...cell })));
  for (const cell of affectedCells) {
    if (cell.row >= 0 && cell.row < BOARD_SIZE && cell.col >= 0 && cell.col < BOARD_SIZE) {
      tempBoard[cell.row][cell.col] = { filled: true };
    }
  }

  const { rows, cols } = findCompletedLines(tempBoard);

  return {
    piece,
    startRow,
    startCol,
    isValid: true,
    affectedCells,
    predictedRows: rows,
    predictedCols: cols,
  };
}

export function calculateScoreBreakdown(
  blockCount: number,
  clearedRowCount: number,
  clearedColCount: number
): { points: number; bonus: number; totalClearedLines: number; label?: string } {
  const totalClearedLines = clearedRowCount + clearedColCount;

  // Base placement score: 1 point per block
  let points = blockCount;
  let bonus = 0;
  let label: string | undefined = undefined;

  if (totalClearedLines > 0) {
    // 1 line = 10 pts
    // 2 lines = 30 pts (Double Line!)
    // 3 lines = 60 pts (Triple Clear!)
    // 4 lines = 100 pts (Mega Combo!)
    // 5+ lines = 150+ pts (Unbelievable!)
    const lineMultiplier =
      totalClearedLines === 1
        ? 1
        : totalClearedLines === 2
        ? 1.5
        : totalClearedLines === 3
        ? 2.0
        : totalClearedLines === 4
        ? 2.5
        : 3.0;

    bonus = Math.round(totalClearedLines * 10 * lineMultiplier);
    points += bonus;

    if (totalClearedLines === 2) label = 'Double Clear! +30';
    else if (totalClearedLines === 3) label = 'Triple Combo! +60';
    else if (totalClearedLines === 4) label = 'Quad Smash! +100';
    else if (totalClearedLines >= 5) label = `Ultra Combo x${totalClearedLines}! +${bonus}`;
    else label = 'Line Clear! +10';
  }

  return { points, bonus, totalClearedLines, label };
}

export function findBestPlacementForTap(
  board: BoardMatrix,
  piece: Piece,
  tappedRow: number,
  tappedCol: number
): { startRow: number; startCol: number } | null {
  // 1. Try standard centered placement first
  const centerRow = tappedRow - Math.floor(piece.height / 2);
  const centerCol = tappedCol - Math.floor(piece.width / 2);
  if (canPlacePiece(board, piece, centerRow, centerCol)) {
    return { startRow: centerRow, startCol: centerCol };
  }

  // 2. Search for any valid placement of piece where (tappedRow, tappedCol) is a filled cell
  interface Candidate {
    startRow: number;
    startCol: number;
    distance: number;
  }
  const candidates: Candidate[] = [];

  for (let r = 0; r < piece.height; r++) {
    for (let c = 0; c < piece.width; c++) {
      if (piece.matrix[r][c] === 1) {
        const startRow = tappedRow - r;
        const startCol = tappedCol - c;
        if (canPlacePiece(board, piece, startRow, startCol)) {
          const dist = Math.abs(startRow - centerRow) + Math.abs(startCol - centerCol);
          candidates.push({ startRow, startCol, distance: dist });
        }
      }
    }
  }

  if (candidates.length > 0) {
    candidates.sort((a, b) => a.distance - b.distance);
    return { startRow: candidates[0].startRow, startCol: candidates[0].startCol };
  }

  return null;
}
