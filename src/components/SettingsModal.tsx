import React, { useState } from 'react';
import {
  X,
  Settings,
  Volume2,
  VolumeX,
  RotateCcw,
  HelpCircle,
  Check,
  Home,
  Moon,
  Sun,
} from 'lucide-react';

interface SettingsModalProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  soundMuted: boolean;
  onToggleSound: () => void;
  onRestart?: () => void;
  onOpenHelp: () => void;
  onClose: () => void;
  isHomeScreen?: boolean;
  onGoHome?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  darkMode,
  onToggleDarkMode,
  soundMuted,
  onToggleSound,
  onRestart,
  onOpenHelp,
  onClose,
  isHomeScreen = false,
  onGoHome,
}) => {
  const [confirmRestart, setConfirmRestart] = useState(false);

  const handleRestartClick = () => {
    if (!confirmRestart) {
      setConfirmRestart(true);
      return;
    }
    if (onRestart) {
      onRestart();
    }
    onClose();
  };

  const handleHomeClick = () => {
    onClose();
    if (onGoHome) {
      onGoHome();
    }
  };

  return (
    <div
      id="settings-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-xs select-none animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="settings-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-heading"
        className="w-full max-w-xs p-4 sm:p-5 border-2 border-ink bg-bg shadow-2xl flex flex-col font-mono text-ink"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink/15 pb-2.5 mb-3 flex-shrink-0">
          <h2
            id="settings-heading"
            className="font-syne font-black text-xl tracking-tight flex items-center gap-2"
          >
            <Settings className="w-5 h-5 text-[#10B981]" />
            <span>SETTINGS</span>
          </h2>
          <button
            id="btn-close-settings"
            onClick={onClose}
            aria-label="Close Settings"
            className="p-1 border border-ink hover:bg-ink hover:text-bg active:bg-ink active:text-bg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Direct Buttons */}
        <div className="space-y-2">

          {/* Button: Dark Mode */}
          <button
            id="settings-item-dark-mode"
            onClick={onToggleDarkMode}
            aria-label={`Dark Mode: ${darkMode ? 'On' : 'Off'}`}
            className="w-full p-3 border border-ink/30 hover:border-ink bg-bg-card hover:bg-ink text-ink hover:text-bg active:translate-y-0.5 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer group text-center"
          >
            {darkMode ? (
              <Moon className="w-4 h-4 text-ink group-hover:text-bg" />
            ) : (
              <Sun className="w-4 h-4 text-ink group-hover:text-bg" />
            )}
            <span>{darkMode ? 'DARK MODE' : 'LIGHT MODE'}</span>
          </button>

          {/* Button 1: Sound Effects (SFX) */}
          <button
            id="settings-item-sfx"
            onClick={onToggleSound}
            aria-label={`Sound effects: ${soundMuted ? 'Off' : 'On'}`}
            className="w-full p-3 border border-ink/30 hover:border-ink bg-bg-card hover:bg-ink text-ink hover:text-bg active:translate-y-0.5 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer group text-center"
          >
            {soundMuted ? (
              <VolumeX className="w-4 h-4 text-[#FF5A5F]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#10B981]" />
            )}
            <span>SFX</span>
          </button>

          {/* Button 2: Restart Game (Hidden on Home Screen) */}
          {!isHomeScreen && onRestart && (
            confirmRestart ? (
              <div className="flex gap-2 w-full">
                <button
                  id="settings-item-restart"
                  onClick={handleRestartClick}
                  className="flex-1 p-3 border border-[#FF5A5F] bg-[#FF5A5F] text-bg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#E0484D] active:translate-y-0.5 transition-colors cursor-pointer text-center"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm</span>
                </button>
                <button
                  id="settings-item-restart-cancel"
                  onClick={() => setConfirmRestart(false)}
                  className="flex-1 p-3 border border-ink bg-bg-card text-ink font-bold text-xs uppercase tracking-wider flex items-center justify-center hover:bg-ink hover:text-bg active:translate-y-0.5 transition-colors cursor-pointer text-center"
                >
                  <X className="w-4 h-4 mr-1" />
                  <span>Cancel</span>
                </button>
              </div>
            ) : (
              <button
                id="settings-item-restart"
                onClick={handleRestartClick}
                aria-label="Restart Game"
                className="w-full p-3 border border-ink/30 hover:border-ink bg-bg-card hover:bg-ink text-ink hover:text-bg active:translate-y-0.5 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer group text-center"
              >
                <RotateCcw className="w-4 h-4 text-ink group-hover:text-bg" />
                <span>Restart</span>
              </button>
            )
          )}

          {/* Button 3: Home Button (Only on Game Screen) */}
          {!isHomeScreen && onGoHome && (
            <button
              id="settings-item-home"
              onClick={handleHomeClick}
              aria-label="Return to Home Screen"
              className="w-full p-3 border border-ink/30 hover:border-ink bg-bg-card hover:bg-ink text-ink hover:text-bg active:translate-y-0.5 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer group text-center"
            >
              <Home className="w-4 h-4 text-ink group-hover:text-bg" />
              <span>Home</span>
            </button>
          )}

          {/* Button 4: Help */}
          <button
            id="settings-item-help"
            onClick={() => {
              onClose();
              onOpenHelp();
            }}
            aria-label="How to play"
            className="w-full p-3 border border-ink/30 hover:border-ink bg-bg-card hover:bg-ink text-ink hover:text-bg active:translate-y-0.5 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer group text-center"
          >
            <HelpCircle className="w-4 h-4 text-ink group-hover:text-bg" />
            <span>How To Play</span>
          </button>
        </div>
      </div>
    </div>
  );
};
