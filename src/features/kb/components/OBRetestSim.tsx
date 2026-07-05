import { useState, type FC } from 'react';

export const OBRetestSim: FC = () => {
  const [frame, setFrame] = useState(0); // 0 = start, 1 = drop, 2 = tap, 3 = reaction
  
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
        <h3 className="text-lg font-bold text-text m-0">Interactive: Mitigation Simulator</h3>
        <button 
          onClick={handlePlay}
          className="px-4 py-1.5 rounded border border-accent bg-accent/20 text-accent font-medium hover:bg-accent/30 transition-colors"
        >
          {frame === 3 ? 'Reset' : 'Play Next Frame'}
        </button>
      </div>
      <p className="text-sm text-text-muted mb-4 self-start">
        Watch how price interacts with an unmitigated Order Block. The "Retest" is where the trade is executed.
      </p>

      <div className="relative w-full max-w-lg overflow-hidden rounded-lg bg-bg-elevated border border-border p-4 h-[320px] flex items-center justify-center">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          
          {/* Static Background / Grid */}
          <defs>
            <pattern id="grid-sim" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" className="text-border" strokeWidth="0.5" />
            </pattern>
            <marker id="arrow-sim" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-text)" />
            </marker>
          </defs>
          <rect width="400" height="300" fill="url(#grid-sim)" />

          {/* Initial OB Creation (Always Visible) */}
          <g>
            <text x="10" y="290" fill="var(--color-text-muted)" fontSize="10">Time →</text>
            
            {/* The Bearish OB Candle */}
            <line x1="50" y1="210" x2="50" y2="270" stroke="var(--color-text)" strokeWidth="2" />
            <rect x="40" y="220" width="20" height="40" fill="var(--color-bear)" />
            
            {/* Bullish Displacement */}
            <line x1="90" y1="120" x2="90" y2="230" stroke="var(--color-text)" strokeWidth="2" />
            <rect x="80" y="130" width="20" height="90" fill="var(--color-bull)" />
            
            <line x1="130" y1="50" x2="130" y2="140" stroke="var(--color-text)" strokeWidth="2" />
            <rect x="120" y="60" width="20" height="70" fill="var(--color-bull)" />
            
            {/* The OB Zone */}
            <rect x="30" y="210" width="350" height="60" fill="var(--color-bull)" opacity="0.15" stroke="var(--color-bull)" strokeWidth="1" strokeDasharray="4,4" />
            <text x="310" y="235" fill="var(--color-bull)" fontSize="12" fontWeight="bold">Bullish OB</text>
            <text x="310" y="250" fill="var(--color-text-muted)" fontSize="10">(Unmitigated)</text>
          </g>

          {/* Frame 1: Pullback Begins */}
          {frame >= 1 && (
            <g className="animate-in fade-in duration-300">
              <line x1="170" y1="40" x2="170" y2="100" stroke="var(--color-text)" strokeWidth="2" />
              <rect x="160" y="50" width="20" height="40" fill="var(--color-bear)" />
              
              <line x1="210" y1="80" x2="210" y2="150" stroke="var(--color-text)" strokeWidth="2" />
              <rect x="200" y="90" width="20" height="50" fill="var(--color-bear)" />
              
              <text x="210" y="30" fill="var(--color-text-muted)" fontSize="11" textAnchor="middle">Retail sees "Downtrend"</text>
            </g>
          )}

          {/* Frame 2: The Tap (Mitigation) */}
          {frame >= 2 && (
            <g className="animate-in fade-in duration-300">
              <line x1="250" y1="130" x2="250" y2="225" stroke="var(--color-text)" strokeWidth="2" />
              <rect x="240" y="140" width="20" height="80" fill="var(--color-bear)" />
              
              {/* Tap highlight */}
              <circle cx="250" cy="225" r="15" fill="none" stroke="var(--color-bull)" strokeWidth="2" className="animate-ping opacity-50" />
              <circle cx="250" cy="225" r="5" fill="var(--color-bull)" />
              
              <line x1="260" y1="240" x2="290" y2="260" stroke="var(--color-text)" strokeWidth="1.5" />
              <text x="295" y="270" fill="var(--color-text)" fontSize="12" fontWeight="bold">The Mitigation (Entry)</text>
            </g>
          )}

          {/* Frame 3: The Reaction */}
          {frame >= 3 && (
            <g className="animate-in slide-in-from-bottom-4 duration-500">
              <line x1="290" y1="120" x2="290" y2="210" stroke="var(--color-text)" strokeWidth="2" />
              <rect x="280" y="130" width="20" height="70" fill="var(--color-bull)" />
              
              <line x1="330" y1="30" x2="330" y2="140" stroke="var(--color-text)" strokeWidth="2" />
              <rect x="320" y="40" width="20" height="90" fill="var(--color-bull)" />
              
              <text x="330" y="20" fill="var(--color-bull)" fontSize="12" fontWeight="bold" textAnchor="middle">Trend Resumes</text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
