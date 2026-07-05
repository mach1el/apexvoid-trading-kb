import { useState, type FC } from 'react';

// Pre-defined swing points for our SVG
const SWINGS = [
  { id: '1', cx: 100, cy: 300, type: 'LL', label: 'Lower Low' },
  { id: '2', cx: 200, cy: 150, type: 'LH', label: 'Lower High' },
  { id: '3', cx: 300, cy: 250, type: 'HL', label: 'Higher Low (CHoCH)' },
  { id: '4', cx: 400, cy: 100, type: 'HH', label: 'Higher High' },
  { id: '5', cx: 500, cy: 180, type: 'HL', label: 'Higher Low' },
  { id: '6', cx: 600, cy: 50, type: 'HH', label: 'Higher High' },
  { id: '7', cx: 700, cy: 150, type: 'HL', label: 'Higher Low' },
];

export const StructureLabeler: FC = () => {
  const [labeledIds, setLabeledIds] = useState<Set<string>>(new Set());

  const toggleLabel = (id: string) => {
    setLabeledIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getTrendState = () => {
    if (labeledIds.size === 0) return 'Click the swing points to identify structure.';
    if (labeledIds.has('1') && labeledIds.has('2') && !labeledIds.has('3')) return 'Bearish structure (LL, LH).';
    if (labeledIds.has('3') && labeledIds.has('4')) return 'Trend reversed! Bullish structure forming (HL, HH).';
    if (labeledIds.size === SWINGS.length) return 'Full bullish trend mapped! (HH, HL sequence).';
    return 'Mapping structure...';
  };

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-text m-0">Interactive: Structure Labeler</h3>
        <button 
          onClick={() => setLabeledIds(new Set())}
          className="px-3 py-1 bg-bg-elevated hover:bg-border border border-border rounded text-sm text-text-muted transition-colors"
        >
          Reset
        </button>
      </div>
      
      <p className="text-sm text-text-muted mb-4 self-start bg-bg-base p-3 rounded border border-border w-full">
        <strong>Status:</strong> {getTrendState()}
      </p>

      <div className="relative w-full max-w-3xl overflow-hidden rounded-lg bg-bg-elevated border border-border">
        <svg viewBox="0 0 800 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-border" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="800" height="400" fill="url(#grid)" />

          {/* Price Path */}
          <path
            d="M 0,200 L 100,300 L 200,150 L 300,250 L 400,100 L 500,180 L 600,50 L 700,150 L 800,20"
            fill="none"
            stroke="var(--color-text-muted)"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Interactive Swing Points */}
          {SWINGS.map((swing) => {
            const isLabeled = labeledIds.has(swing.id);
            const isBullish = swing.type === 'HH' || swing.type === 'HL';
            const color = isBullish ? 'var(--color-bull)' : 'var(--color-bear)';

            return (
              <g key={swing.id} className="cursor-pointer" onClick={() => toggleLabel(swing.id)}>
                {/* Hitbox */}
                <circle cx={swing.cx} cy={swing.cy} r="25" fill="transparent" />
                
                {/* Visible node */}
                <circle 
                  cx={swing.cx} 
                  cy={swing.cy} 
                  r={isLabeled ? "8" : "6"} 
                  fill={isLabeled ? color : 'var(--color-bg-base)'}
                  stroke={isLabeled ? color : 'var(--color-text)'}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />

                {/* Label */}
                {isLabeled && (
                  <g className="animate-in fade-in zoom-in duration-200">
                    <rect 
                      x={swing.cx - 20} 
                      y={swing.type.includes('H') ? swing.cy - 40 : swing.cy + 20} 
                      width="40" 
                      height="20" 
                      rx="4" 
                      fill="var(--color-bg-base)" 
                      stroke={color}
                      strokeWidth="1"
                    />
                    <text 
                      x={swing.cx} 
                      y={swing.type.includes('H') ? swing.cy - 26 : swing.cy + 34} 
                      fill="var(--color-text)" 
                      fontSize="12" 
                      fontWeight="bold" 
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {swing.type}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
