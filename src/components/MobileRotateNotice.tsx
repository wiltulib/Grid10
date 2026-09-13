import React from 'react';
import { Smartphone, RotateCcw } from 'lucide-react';

export const MobileRotateNotice: React.FC = () => {
  return (
    <div
      id="mobile-rotate-notice"
      className="fixed inset-0 z-[100] hidden flex-col items-center justify-center p-4 bg-bg text-ink select-none text-center"
    >
      <div className="max-w-xs w-full border-2 border-ink p-4 sm:p-5 bg-bg shadow-[4px_4px_0px_0px_var(--ink)] flex flex-col items-center">
        {/* Animated Phone Icon */}
        <div className="relative mb-2.5 flex items-center justify-center w-12 h-12 border-2 border-ink bg-ink text-bg">
          <Smartphone className="w-6 h-6 animate-pulse" />
          <RotateCcw className="w-3.5 h-3.5 absolute -top-1.5 -right-1.5 text-[#FF5A5F] bg-ink rounded-full p-0.5 border border-[#FF5A5F]" />
        </div>

        {/* System Tag */}
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF5A5F] font-bold border border-[#FF5A5F] px-1.5 py-0.5 mb-1.5">
          [ORIENTATION LOCK]
        </span>

        {/* Headline */}
        <h2 className="font-syne font-black text-lg tracking-tight leading-none text-ink mb-1.5">
          PORTRAIT MODE ONLY
        </h2>

        {/* Instructions */}
        <p className="font-mono text-[11px] text-ink/80 leading-relaxed mb-3">
          Landscape mode is disabled on mobile devices. Please rotate your phone to portrait to play GRID10.
        </p>

        {/* Status Indicator */}
        <div className="w-full font-mono text-[9px] uppercase tracking-wider py-1 border-t border-ink/20 text-ink/60 flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F] animate-ping" />
          <span>Awaiting Portrait Rotation</span>
        </div>
      </div>
    </div>
  );
};
