const fs = require('fs');
let file = fs.readFileSync('src/App.tsx', 'utf8');

file = file.replace(
  "const handleGoHome = useCallback(() => {\n    sound.playClick();\n    setDraggingPiece(null);\n    setPlacementPreview(null);\n    setCurrentScreen('home');\n  }, []);",
  "const handleGoHome = useCallback(() => {\n    sound.playClick();\n    setDraggingPiece(null);\n    setPlacementPreview(null);\n    setShowGameOverModal(false);\n    setShowSettingsModal(false);\n    setCurrentScreen('home');\n  }, []);"
);

fs.writeFileSync('src/App.tsx', file);
