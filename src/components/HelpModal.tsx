import React from 'react';
import { X } from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-xs select-none">
      <div
        id="help-rules-dialog"
        className="w-full max-w-md p-5 sm:p-8 border-2 border-ink bg-bg shadow-2xl flex flex-col font-mono text-ink max-h-[90dvh] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-ink/20 pb-4 mb-5">
          <div>
            <div className="text-[0.65rem] uppercase tracking-[0.15em] opacity-60 font-bold">
              Manual // [01_GUIDE]
            </div>
            <h2 className="font-syne font-black text-3xl tracking-tight">
              RULES & LOGIC
            </h2>
          </div>
          <button
            id="btn-close-help"
            onClick={onClose}
            className="p-1.5 border border-ink hover:bg-ink hover:text-bg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs leading-relaxed text-ink/80">
          <div className="border border-ink/30 p-3 bg-bg-card">
            <div className="font-bold uppercase tracking-wider text-ink mb-1">
              01 // Placement
            </div>
            <p>
              Drag shapes from the bottom slot tray onto the 10x10 matrix, or tap a block to select it, then tap a grid cell.
            </p>
          </div>

          <div className="border border-ink/30 p-3 bg-bg-card">
            <div className="font-bold uppercase tracking-wider text-ink mb-1">
              02 // Line Clearance
            </div>
            <p>
              Fill any complete row or column (10 blocks) to clear it. Rows and columns can be cleared simultaneously.
            </p>
          </div>

          <div className="border border-ink/30 p-3 bg-bg-card">
            <div className="font-bold uppercase tracking-wider text-ink mb-1">
              03 // Combo Multipliers
            </div>
            <p>
              Clearing 2 or more lines at once yields exponential score bonuses. Plan ahead to trigger multi-line sweeps.
            </p>
          </div>

          <div className="border border-ink/30 p-3 bg-bg-card">
            <div className="font-bold uppercase tracking-wider text-[#FF5A5F] mb-1">
              04 // Termination
            </div>
            <p>
              Game ends when no remaining piece can fit anywhere on the current 10x10 board. Always leave space for 3x3 squares and 5-bars!
            </p>
          </div>
        </div>

        <button
          id="btn-got-it-help"
          onClick={onClose}
          className="mt-6 w-full py-3.5 px-6 font-mono text-xs uppercase font-bold tracking-[0.1em] border border-ink bg-ink text-bg hover:bg-[#2A2A2E] active:translate-y-0.5 transition-colors cursor-pointer"
        >
          Close Manual
        </button>
      </div>
    </div>
  );
};
