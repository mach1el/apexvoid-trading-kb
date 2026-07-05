import { useState, type FC } from 'react';

export const DisplacementSpotter: FC = () => {
  const [showAnnotation, setShowAnnotation] = useState(false);

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-text m-0">Interactive: Displacement Spotter</h3>
        <button 
          onClick={() => setShowAnnotation(!showAnnotation)}
          className={`px-3 py-1 rounded border text-sm transition-colors ${
            showAnnotation 
              ? 'bg-accent/20 border-accent text-accent' 
              : 'bg-bg-elevated hover:bg-border border-border text-text-muted'
          }`}
        >
          {showAnnotation ? 'Hide Institutional Footprint' : 'Reveal Institutional Footprint'}
        </button>
      </div>

      <p className="text-sm text-text-muted mb-4 self-start">
        Can you spot where institutional volume enters the market? Toggle the button to reveal the displacement and the resulting inefficiency (FVG).
      </p>

      <div className="relative w-full max-w-2xl overflow-hidden rounded-lg bg-bg-elevated border border-border p-4">
        <svg viewBox="0 0 500 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          {/* Grid */}
          <defs>
            <pattern id="grid-disp" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M 25 0 L 0 0 0 25" fill="none" stroke="currentColor" className="text-border" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="500" height="300" fill="url(#grid-disp)" />

          {/* Candle 1 (Choppy) */}
          <line x1="50" y1="180" x2="50" y2="240" stroke="var(--color-text)" strokeWidth="2" />
          <rect x="40" y="200" width="20" height="30" fill="var(--color-bear)" />

          {/* Candle 2 (Choppy) */}
          <line x1="100" y1="210" x2="100" y2="260" stroke="var(--color-text)" strokeWidth="2" />
          <rect x="90" y="220" width="20" height="30" fill="var(--color-bull)" />

          {/* Candle 3 (Pre-Displacement High) */}
          <line x1="150" y1="170" x2="150" y2="230" stroke="var(--color-text)" strokeWidth="2" />
          <rect x="140" y="190" width="20" height="30" fill="var(--color-bear)" />

          {/* Candle 4 (DISPLACEMENT CANDLE) */}
          <line x1="200" y1="70" x2="200" y2="200" stroke="var(--color-text)" strokeWidth="2" />
          <rect x="190" y="80" width="20" height="110" fill="var(--color-bull)" />

          {/* Candle 5 (Post-Displacement Low) */}
          <line x1="250" y1="40" x2="250" y2="100" stroke="var(--color-text)" strokeWidth="2" />
          <rect x="240" y="50" width="20" height="40" fill="var(--color-bull)" />

          {/* Candle 6 (Chop continues) */}
          <line x1="300" y1="30" x2="300" y2="70" stroke="var(--color-text)" strokeWidth="2" />
          <rect x="290" y="40" width="20" height="20" fill="var(--color-bear)" />

          {/* Annotations */}
          {showAnnotation && (
            <g className="animate-in fade-in duration-500">
              {/* Highlight Displacement Candle */}
              <rect x="180" y="65" width="40" height="140" fill="var(--color-bull)" opacity="0.1" stroke="var(--color-bull)" strokeWidth="2" strokeDasharray="4,4" />
              <text x="200" y="55" fill="var(--color-bull)" fontSize="12" fontWeight="bold" textAnchor="middle">DISPLACEMENT</text>

              {/* FVG Highlight (Gap between C3 High and C5 Low) */}
              <rect x="150" y="100" width="100" height="70" fill="var(--color-warn)" opacity="0.2" />
              <line x1="150" y1="170" x2="250" y2="170" stroke="var(--color-warn)" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="150" y1="100" x2="250" y2="100" stroke="var(--color-warn)" strokeWidth="1" strokeDasharray="2,2" />
              
              <text x="360" y="140" fill="var(--color-warn)" fontSize="12" fontWeight="bold">FAIR VALUE GAP (FVG)</text>
              <line x1="260" y1="135" x2="350" y2="135" stroke="var(--color-warn)" strokeWidth="2" markerEnd="url(#arrow)" />
              
              {/* C3 High Label */}
              <text x="140" y="245" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle">C1</text>
              <line x1="150" y1="170" x2="180" y2="170" stroke="var(--color-text-muted)" strokeWidth="1" />
              
              {/* C5 Low Label */}
              <text x="260" y="115" fill="var(--color-text-muted)" fontSize="10">C3</text>
              <line x1="250" y1="100" x2="220" y2="100" stroke="var(--color-text-muted)" strokeWidth="1" />
            </g>
          )}

          {/* Arrow Marker Def */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-warn)" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
};
