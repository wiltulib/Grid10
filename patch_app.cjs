const fs = require('fs');
let file = fs.readFileSync('src/App.tsx', 'utf8');

file = file.replace(
  "  const [soundMuted, setSoundMuted] = useState<boolean>(() => sound.getMuted());",
  "  const [soundMuted, setSoundMuted] = useState<boolean>(() => sound.getMuted());\n  const [darkMode, setDarkMode] = useState<boolean>(() => {\n    try {\n      return localStorage.getItem('1010_block_darkmode') === 'true';\n    } catch {\n      return false;\n    }\n  });"
);

// Toggle dark mode function
const handleToggleDarkMode = `
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
`;

file = file.replace(
  "  // Toggle sound",
  handleToggleDarkMode + "\n  // Toggle sound"
);

// Settings Modal props
file = file.replace(
  "<SettingsModal\n          soundMuted={soundMuted}",
  "<SettingsModal\n          darkMode={darkMode}\n          onToggleDarkMode={handleToggleDarkMode}\n          soundMuted={soundMuted}"
);

// And we also want to pass `darkMode={darkMode}` to GameBoard if it accepts it.
// Oh wait, does GameBoard accept darkMode? It had a `darkMode?` prop, but did we use it?
// Let's not worry about `GameBoard` since it now uses CSS variables globally.

fs.writeFileSync('src/App.tsx', file);
