import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BoardMatrix, Piece, PlacementPreview } from './types';
import {
  calculatePreview,
  calculateScoreBreakdown,
  canPlaceAnywhere,
  canPlacePiece,
  checkGameOver,
  createEmptyBoard,
  findCompletedLines,
  generatePieceSet,
} from './utils/gameLogic';
import { sound } from './utils/sound';
import { Header } from './components/Header';
import { GameBoard, GameBoardRef } from './components/GameBoard';
import { ScorePanel } from './components/ScorePanel';
import { PieceTray } from './components/PieceTray';
import { DragPreview } from './components/DragPreview';
import { GameOverModal } from './components/GameOverModal';
import { HelpModal } from './components/HelpModal';
import { SettingsModal } from './components/SettingsModal';
import { MobileStatusBar } from './components/MobileStatusBar';
import { MobileRotateNotice } from './components/MobileRotateNotice';
import { HomeScreen } from './components/HomeScreen';

export default function App() {
  // Navigation screen state: 'home' | 'game'
  const [currentScreen, setCurrentScreen] = useState<'home' | 'game'>('home');

  // Game state
  const [board, setBoard] = useState<BoardMatrix>(() => createEmptyBoard());
  const [pieces, setPieces] = useState<(Piece | null)[]>(() => generatePieceSet(3));
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('1010_block_highscore');
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [isNewHighScore, setIsNewHighScore] = useState<boolean>(false);
  const [linesCleared, setLinesCleared] = useState<number>(0);
  const [piecesPlaced, setPiecesPlaced] = useState<number>(0);
  const [soundMuted, setSoundMuted] = useState<boolean>(() => sound.getMuted());
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('1010_block_darkmode') === 'true';
    } catch {
      return false;
    }
  });

  // Interaction state
  const [draggingPiece, setDraggingPiece] = useState<Piece | null>(null);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);
  const [isTouchDrag, setIsTouchDrag] = useState<boolean>(false);
  const [placementPreview, setPlacementPreview] = useState<PlacementPreview | null>(null);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showGameOverModal, setShowGameOverModal] = useState<boolean>(false);
  const [cellSize, setCellSize] = useState<number>(42);

  const gameBoardRef = useRef<GameBoardRef>(null);

  // Update high score
  const updateScore = useCallback(
    (newScore: number) => {
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        setIsNewHighScore(true);
        try {
          localStorage.setItem('1010_block_highscore', newScore.toString());
        } catch {
          // Ignore
        }
      }
    },
    [highScore]
  );

  // Measure cell size dynamically
  const updateCellMetrics = useCallback(() => {
    if (gameBoardRef.current) {
      const measured = gameBoardRef.current.getCellSize();
      if (measured > 0) {
        setCellSize(measured);
      }
    }
  }, []);

  useEffect(() => {
    updateCellMetrics();
    window.addEventListener('resize', updateCellMetrics);
    return () => window.removeEventListener('resize', updateCellMetrics);
  }, [updateCellMetrics, currentScreen]);

  // Restart game
  const handleRestart = useCallback(() => {
    sound.playClick();
    setBoard(createEmptyBoard());
    setPieces(generatePieceSet(3));
    setScore(0);
    setIsNewHighScore(false);
    setLinesCleared(0);
    setPiecesPlaced(0);
    setDraggingPiece(null);
    setPlacementPreview(null);
    setShowGameOverModal(false);
  }, []);

  // Start game from home
  const handleStartGame = useCallback(() => {
    sound.playPick();
    if (checkGameOver(board, pieces)) {
      handleRestart();
    }
    setCurrentScreen('game');
    if (window.CadeplaySDK) window.CadeplaySDK.gameplayStart();
  }, [board, pieces, handleRestart]);

  // Return to home screen
  const handleGoHome = useCallback(() => {
    sound.playClick();
    setDraggingPiece(null);
    setPlacementPreview(null);
    setShowGameOverModal(false);
    setShowSettingsModal(false);
    setCurrentScreen('home');
    if (window.CadeplaySDK) window.CadeplaySDK.gameplayStop();
  }, []);


  const handleToggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('1010_block_darkmode', String(next));
      } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle sound
  const handleToggleSound = useCallback(() => {
    const nextMuted = !soundMuted;
    setSoundMuted(nextMuted);
    sound.setMuted(nextMuted);
    if (!nextMuted) {
      sound.playPick();
    }
  }, [soundMuted]);

  // Handle piece placement on board
  const handlePiecePlacement = useCallback(
    (piece: Piece, startRow: number, startCol: number) => {
      if (!canPlacePiece(board, piece, startRow, startCol)) {
        sound.playInvalid();
        return;
      }

      // 1. Place piece
      const nextBoard = board.map((rArr) => rArr.map((cell) => ({ ...cell })));
      for (let r = 0; r < piece.height; r++) {
        for (let c = 0; c < piece.width; c++) {
          if (piece.matrix[r][c] === 1) {
            const br = startRow + r;
            const bc = startCol + c;
            nextBoard[br][bc] = {
              filled: true,
              colorName: piece.colorName,
              gradient: piece.gradient,
              border: piece.border,
              shadow: piece.shadow,
            };
          }
        }
      }

      // 2. Consume piece from tray IMMEDIATELY (so block is removed even if lines clear)
      const nextPieces = pieces.map((p) => (p?.id === piece.id ? null : p));
      setPieces(nextPieces);

      sound.playDrop();

      // 3. Find full lines
      const { rows, cols } = findCompletedLines(nextBoard);
      const totalLines = rows.length + cols.length;

      // 4. Calculate score
      const scoreResult = calculateScoreBreakdown(
        piece.blockCount,
        rows.length,
        cols.length
      );
      const newScore = score + scoreResult.points;
      updateScore(newScore);

      setPiecesPlaced((prev) => prev + 1);

      if (totalLines > 0) {
        // Mark cells as clearing
        rows.forEach((r) => {
          for (let c = 0; c < 10; c++) {
            nextBoard[r][c].isClearing = true;
          }
        });
        cols.forEach((c) => {
          for (let r = 0; r < 10; r++) {
            nextBoard[r][c].isClearing = true;
          }
        });

        setBoard(nextBoard);
        setLinesCleared((prev) => prev + totalLines);

        sound.playClear(totalLines);
        if (totalLines > 1) {
          sound.playCombo(totalLines);
        }

        setTimeout(() => {
          const clearedBoard = nextBoard.map((rArr) =>
            rArr.map((cell) => {
              if (cell.isClearing) {
                return { filled: false };
              }
              return cell;
            })
          );

          let finalPieces = nextPieces;
          if (finalPieces.every((p) => p === null)) {
            finalPieces = generatePieceSet(3);
            setPieces(finalPieces);
          }

          setBoard(clearedBoard);

          const gameOver = checkGameOver(clearedBoard, finalPieces);
          if (gameOver) {
            setShowGameOverModal(true);
            sound.playGameOver();
            if (window.CadeplaySDK) window.CadeplaySDK.gameplayStop();
          }
        }, 280);
      } else {
        let finalPieces = nextPieces;
        if (finalPieces.every((p) => p === null)) {
          finalPieces = generatePieceSet(3);
          setPieces(finalPieces);
        }

        setBoard(nextBoard);

        const gameOver = checkGameOver(nextBoard, finalPieces);
        if (gameOver) {
          setShowGameOverModal(true);
          sound.playGameOver();
        }
      }

      setPlacementPreview(null);
    },
    [board, pieces, score, linesCleared, updateScore]
  );

  // Tracking pointer drag vs tap intent
  const dragStartRef = useRef<{
    piece: Piece;
    startX: number;
    startY: number;
    isTouch: boolean;
  } | null>(null);

  // Handle piece drag pointer down
  const handlePiecePointerDown = useCallback(
    (piece: Piece, e: React.PointerEvent) => {
      const isTouch = e.pointerType === 'touch';
      dragStartRef.current = {
        piece,
        startX: e.clientX,
        startY: e.clientY,
        isTouch,
      };
      setIsTouchDrag(isTouch);
    },
    []
  );

  // Global pointer move for dragging
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (dragStartRef.current && !draggingPiece) {
        const dx = e.clientX - dragStartRef.current.startX;
        const dy = e.clientY - dragStartRef.current.startY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 8) {
          setDraggingPiece(dragStartRef.current.piece);
          sound.playPick();
        }
      }

      if (draggingPiece) {
        setPointerPos({ x: e.clientX, y: e.clientY });

        if (gameBoardRef.current) {
          const piecePixelW = draggingPiece.width * cellSize;
          const piecePixelH = draggingPiece.height * cellSize;
          const offsetY = isTouchDrag ? 85 : piecePixelH / 2;
          const pieceLeft = e.clientX - piecePixelW / 2;
          const pieceTop = e.clientY - offsetY;

          const placement = gameBoardRef.current.getPlacementForPiece(
            { width: draggingPiece.width, height: draggingPiece.height },
            pieceLeft,
            pieceTop
          );

          if (placement && placement.inBounds) {
            const preview = calculatePreview(
              board,
              draggingPiece,
              placement.startRow,
              placement.startCol
            );
            setPlacementPreview(preview);
          } else {
            setPlacementPreview(null);
          }
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (draggingPiece) {
        if (gameBoardRef.current) {
          const piecePixelW = draggingPiece.width * cellSize;
          const piecePixelH = draggingPiece.height * cellSize;
          const offsetY = isTouchDrag ? 85 : piecePixelH / 2;
          const pieceLeft = e.clientX - piecePixelW / 2;
          const pieceTop = e.clientY - offsetY;

          const placement = gameBoardRef.current.getPlacementForPiece(
            { width: draggingPiece.width, height: draggingPiece.height },
            pieceLeft,
            pieceTop
          );

          if (placement && placement.inBounds) {
            if (
              canPlacePiece(
                board,
                draggingPiece,
                placement.startRow,
                placement.startCol
              )
            ) {
              handlePiecePlacement(
                draggingPiece,
                placement.startRow,
                placement.startCol
              );
            } else {
              sound.playInvalid();
            }
          }
        }

        setDraggingPiece(null);
        setPointerPos(null);
        setPlacementPreview(null);
        dragStartRef.current = null;
        return;
      }

      if (dragStartRef.current) {
        dragStartRef.current = null;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [
    draggingPiece,
    cellSize,
    isTouchDrag,
    board,
    handlePiecePlacement,
  ]);

  // Hover cell for selected piece (no ghost grid indicator when tapping)
  const handleCellPointerEnter = useCallback(
    () => {
      // Keep board clean without ghost grid indicators when a block is selected
      if (!draggingPiece) {
        setPlacementPreview(null);
      }
    },
    [draggingPiece]
  );

  const handleBoardPointerLeave = useCallback(() => {
    if (!draggingPiece) {
      setPlacementPreview(null);
    }
  }, [draggingPiece]);

  // Compute playable map for current pieces
  const playableMap = React.useMemo(() => {
    const map = new Map<string, boolean>();
    pieces.forEach((p) => {
      if (p) {
        map.set(p.id, canPlaceAnywhere(board, p));
      }
    });
    return map;
  }, [board, pieces]);

  return (
    <div
      id="root-container"
      className="w-full h-screen h-[100dvh] max-h-[100dvh] overflow-hidden max-w-[1400px] mx-auto flex flex-col items-center justify-center py-1.5 sm:px-3 sm:py-3 xl:p-6 select-none bg-bg text-ink"
    >
      {currentScreen === 'home' ? (
        <HomeScreen
          highScore={highScore}
          onStartGame={handleStartGame}
          onOpenSettings={() => setShowSettingsModal(true)}
        />
      ) : (
        <div className="view-layout-container flex flex-col items-center my-auto">
          {/* Header */}
          <Header
            soundMuted={soundMuted}
            onToggleSound={handleToggleSound}
            onOpenHelp={() => setShowHelpModal(true)}
            onOpenSettings={() => setShowSettingsModal(true)}
            onGoHome={handleGoHome}
          />

          {/* Main Game Container */}
          <main className="w-full flex flex-col items-center overflow-hidden">
            {/* Centered Scores on Mobile (Clean, borderless, no table grid) */}
            <MobileStatusBar
              score={score}
              highScore={highScore}
              isNewHighScore={isNewHighScore}
            />

            {/* Main Layout: single column on mobile & tablet portrait, 2-column on landscape & PC */}
            <div className="w-full view-layout-grid items-stretch">
              {/* Left Column: Board + Piece Tray */}
              <div className="view-board-column">
                <GameBoard
                  ref={gameBoardRef}
                  board={board}
                  preview={placementPreview}
                  onCellPointerEnter={handleCellPointerEnter}
                  onBoardPointerLeave={handleBoardPointerLeave}
                />

                {/* Interactive Hint */}
                <div className="w-full flex items-center justify-between font-mono text-[8px] sm:text-[10px] tracking-wider uppercase mt-1 sm:mt-1.5 flex-shrink-0">
                  <span className="opacity-70 w-full view-text-align-hint whitespace-nowrap">
                    DRAG ANY AVAILABLE BLOCK
                  </span>
                </div>

                {/* Available Pieces Tray without popups */}
                <PieceTray
                  pieces={pieces}
                  playableMap={playableMap}
                  draggingPieceId={draggingPiece?.id ?? null}
                  onPiecePointerDown={handlePiecePointerDown}
                />
              </div>

              {/* Right Column: Score & System Controls Panel (Landscape & PC) */}
              <div className="view-pc-landscape-only w-full">
                <ScorePanel
                  score={score}
                  highScore={highScore}
                  isNewHighScore={isNewHighScore}
                  linesCleared={linesCleared}
                  piecesPlaced={piecesPlaced}
                  onRestart={handleRestart}
                />
              </div>
            </div>
          </main>
        </div>
      )}

      {/* Dragging Floating Block Preview */}
      <DragPreview
        piece={draggingPiece}
        pointerPos={pointerPos}
        isTouch={isTouchDrag}
        cellSize={cellSize}
      />

      {/* Game Over Modal */}
      {showGameOverModal && (
        <GameOverModal
          score={score}
          highScore={highScore}
          isNewHighScore={isNewHighScore}
          linesCleared={linesCleared}
          piecesPlaced={piecesPlaced}
          onPlayAgain={handleRestart}
          onGoHome={handleGoHome}
        />
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <SettingsModal
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          soundMuted={soundMuted}
          onToggleSound={handleToggleSound}
          onRestart={handleRestart}
          onOpenHelp={() => setShowHelpModal(true)}
          onClose={() => setShowSettingsModal(false)}
          isHomeScreen={currentScreen === 'home'}
          onGoHome={handleGoHome}
        />
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <HelpModal onClose={() => setShowHelpModal(false)} />
      )}

      {/* Mobile Landscape Orientation Lock Notice */}
      <MobileRotateNotice />
    </div>
  );
}
