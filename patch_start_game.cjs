const fs = require('fs');
let file = fs.readFileSync('src/App.tsx', 'utf8');

file = file.replace(
  "  const handleStartGame = useCallback(() => {\n    sound.playPick();\n    if (showGameOverModal) {\n      handleRestart();\n    }\n    setCurrentScreen('game');\n  }, [showGameOverModal, handleRestart]);",
  "  const handleStartGame = useCallback(() => {\n    sound.playPick();\n    if (checkGameOver(board, pieces)) {\n      handleRestart();\n    }\n    setCurrentScreen('game');\n  }, [board, pieces, handleRestart]);"
);

fs.writeFileSync('src/App.tsx', file);
