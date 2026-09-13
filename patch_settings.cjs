const fs = require('fs');
let file = fs.readFileSync('src/components/SettingsModal.tsx', 'utf8');

file = file.replace(
  "Home,\n} from 'lucide-react';",
  "Home,\n  Moon,\n  Sun,\n} from 'lucide-react';"
);

file = file.replace(
  "interface SettingsModalProps {",
  "interface SettingsModalProps {\n  darkMode: boolean;\n  onToggleDarkMode: () => void;"
);

file = file.replace(
  "  soundMuted,",
  "  darkMode,\n  onToggleDarkMode,\n  soundMuted,"
);

const buttonHtml = `
          {/* Button: Dark Mode */}
          <button
            id="settings-item-dark-mode"
            onClick={onToggleDarkMode}
            aria-label={\`Dark Mode: \${darkMode ? 'On' : 'Off'}\`}
            className="w-full p-3 border border-ink/30 hover:border-ink bg-bg-card hover:bg-ink text-ink hover:text-bg active:translate-y-0.5 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer group text-center"
          >
            {darkMode ? (
              <Moon className="w-4 h-4 text-ink group-hover:text-bg" />
            ) : (
              <Sun className="w-4 h-4 text-ink group-hover:text-bg" />
            )}
            <span>{darkMode ? 'DARK MODE' : 'LIGHT MODE'}</span>
          </button>
`;

file = file.replace(
  "        {/* Direct Buttons */}\n        <div className=\"space-y-2\">",
  "        {/* Direct Buttons */}\n        <div className=\"space-y-2\">\n" + buttonHtml
);

fs.writeFileSync('src/components/SettingsModal.tsx', file);
