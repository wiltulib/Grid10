import React from 'react';
import { Settings } from 'lucide-react';

interface HeaderProps {
  soundMuted?: boolean;
  onToggleSound?: () => void;
  onOpenHelp?: () => void;
  onOpenSettings: () => void;
  onGoHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSettings,
  onGoHome,
}) => {
  return (
    <header className="w-full flex justify-between items-center gap-2 mb-1 sm:mb-2 select-none flex-shrink-0">
      {/* Brand & Edition */}
      <div className="flex items-center gap-1.5 xs:gap-2 flex-shrink-0">

        <h1 className="font-syne font-black view-title-size leading-none tracking-tight text-ink m-0 whitespace-nowrap">
          GRID10
        </h1>
        <span className="font-mono text-[9px] font-bold tracking-widest text-[#FF5A5F] uppercase border border-[#FF5A5F] px-1 py-0.5 whitespace-nowrap">
          PRO
        </span>
      </div>

      {/* Header Actions */}
      <div className="flex items-center font-mono text-ink flex-shrink-0">
        <button
          id="btn-header-settings"
          onClick={onOpenSettings}
          title="Open Settings (SFX, Restart, Help)"
          aria-label="Settings"
          className="h-7 sm:h-8 px-2.5 sm:px-3 border border-ink bg-ink text-bg hover:bg-[#26262A] active:bg-[#333] transition-colors cursor-pointer text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5 whitespace-nowrap shadow-xs"
        >
          <Settings className="w-3.5 h-3.5 text-[#10B981]" />
          <span>SETTINGS</span>
        </button>
      </div>
    </header>
  );
};
