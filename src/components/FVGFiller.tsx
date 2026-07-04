import { useState, type FC } from 'react';

export const FVGFiller: FC = () => {
  const [frame, setFrame] = useState(0); // 0: Formed, 1: Partial Fill, 2: Full Fill, 3: Reversal
  
  const handlePlay = () => {
    if (frame === 3) {
      setFrame(0);
      return;
    }
    setFrame(frame + 1);
  };

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-text m-0">Interactive: FVG Fill & Mitigation</h3>
        <button 
          onClick={handlePlay}
          className="px-4 py-1.5 rounded border border-accent bg-accent/20 text-accent font-medium hover:bg-accent/30 transition-colors"
        >
          {frame === 3 ? 'Reset' : 'Play Next Frame'}
        </button>
      </div>
      <p className="text-sm text-text-muted mb-4 self-start">
        Watch how a Fair Value Gap acts as a magnet for price, drawing it back to fill the inefficiency before continuing the trend.
      </p>

      <div className="relative w-full max-w-lg overflow-hidden rounded-lg bg-bg-elevated border border-border p-4 h-[320px] flex items-center justify-center">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          
          {/* Static Background / Grid */}
          <defs>
            <pattern id="grid-fvg" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" className="text-border" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="400" height="300" fill="url(#grid-fvg)" />

          {/* Core 3-Candle Displacement Sequence */}
          <g>
            <text x="10" y="290" fill="var(--color-text-muted)" fontSize="10">Time →</text>
            
            {/* Candle 1 */}
            <line x1="50" y1="210" x2="50" y2="280" stroke="var(--color-text)" strokeWidth="2" />
            <rect x="40" y="220" width="20" height="50" fill="var(--color-bull)" />
            <text x="50" y="295" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle">C1</text>
            
            {/* Candle 2 (Displacement) */}
            <line x1="90" y1="80" x2="90" y2="240" stroke="var(--color-text)" strokeWidth="2" />
            <rect x="80" y="90" width="20" height="140" fill="var(--color-bull)" />
            <text x="90" y="295" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle">C2</text>
            
            {/* Candle 3 */}
            <line x1="130" y1="40" x2="130" y2="120" stroke="var(--color-text)" strokeWidth="2" />
            <rect x="120" y="50" width="20" height="60" fill="var(--color-bull)" />
            <text x="130" y="295" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle">C3</text>
            
            {/* The FVG Zone (C1 High to C3 Low) */}
            <rect x="30" y="120" width="350" height="90" fill="var(--color-warn)" opacity={frame === 3 ? "0.05" : "0.2"} stroke={frame === 3 ? "none" : "var(--color-warn)"} strokeWidth="1" strokeDasharray="4,4" />
            <text x="320" y="145" fill="var(--color-warn)" fontSize="12" fontWeight="bold">FVG Gap</text>
            
            {/* FVG Boundary Lines */}
            <line x1="45" y1="210" x2="380" y2="210" stroke="var(--color-warn)" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="125" y1="120" x2="380" y2="120" stroke="var(--color-warn)" strokeWidth="1" strokeDasharray="2,2" />
            <text x="320" y="205" fill="var(--color-text-muted)" fontSize="10">C1 High</text>
            <text x="320" y="115" fill="var(--color-text-muted)" fontSize="10">C3 Low</text>
          </g>

          {/* Frame 1: Partial Fill */}
          {frame >= 1 && (
            <g className="animate-in fade-in duration-300">
              <line x1="170" y1="50" x2="170" y2="150" stroke="var(--color-text)" strokeWidth="2" />
              <rect x="160" y="60" width="20" height="80" fill="var(--color-bear)" />
              <text x="170" y="170" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle">Partial Fill</text>
              
              {/* Highlight partial fill */}
              <rect x="160" y="120" width="20" height="30" fill="var(--color-warn)" opacity="0.5" />
            </g>
          )}

          {/* Frame 2: Full Fill */}
          {frame >= 2 && (
            <g className="animate-in fade-in duration-300">
              <line x1="210" y1="130" x2="210" y2="220" stroke="var(--color-text)" strokeWidth="2" />
              <rect x="200" y="140" width="20" height="70" fill="var(--color-bear)" />
              <text x="210" y="235" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle">Full Fill</text>
              
              {/* Highlight full fill */}
              <circle cx="210" cy="210" r="15" fill="none" stroke="var(--color-ok)" strokeWidth="2" className="animate-ping opacity-50" />
              <circle cx="210" cy="210" r="4" fill="var(--color-ok)" />
            </g>
          )}

          {/* Frame 3: Reversal / Continuation */}
          {frame >= 3 && (
            <g className="animate-in slide-in-from-bottom-4 duration-500">
              <line x1="250" y1="110" x2="250" y2="190" stroke="var(--color-text)" strokeWidth="2" />
              <rect x="240" y="120" width="20" height="60" fill="var(--color-bull)" />
              
              <line x1="290" y1="20" x2="290" y2="140" stroke="var(--color-text)" strokeWidth="2" />
              <rect x="280" y="30" width="20" height="100" fill="var(--color-bull)" />
              
              <text x="290" y="15" fill="var(--color-ok)" fontSize="12" fontWeight="bold" textAnchor="middle">Continuation</text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
