import type { FC } from 'react';

interface MarketCycleChartProps {
  variant?: 'bull' | 'bear';
}

export const MarketCycleChart: FC<MarketCycleChartProps> = ({ variant = 'bull' }) => {
  const isBull = variant === 'bull';
  const lineColor = isBull ? 'var(--bull)' : '#F97316';
  
  // Path points based on variant
  const pathD = isBull 
    ? "M 50,300 L 150,280 L 250,290 L 350,180 L 450,150 L 550,70 L 650,90 L 750,80" // Bullish cycle
    : "M 50,80 L 150,100 L 250,90 L 350,200 L 450,230 L 550,310 L 650,290 L 750,300"; // Bearish cycle

  const p1Label = isBull ? "Phase 1: Accumulation" : "Phase 1: Distribution";
  const p1Desc = isBull ? "Smart Money Buys" : "Smart Money Sells";
  const p2Label = "Phase 2: Public Participation";
  const p2Desc = "Trend Followers Enter";
  const p3Label = isBull ? "Phase 3: Distribution (Excess)" : "Phase 3: Panic (Despair)";
  const p3Desc = isBull ? "Retail Buys, Smart Money Exits" : "Retail Panic Sells, Smart Money Covers";

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6 flex flex-col items-center">
      <h3 className="text-lg font-bold text-text mb-4">
        {isBull ? "Primary Bull Market Phases" : "Primary Bear Market Phases"}
      </h3>
      <svg
        viewBox="0 0 800 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-2xl h-auto"
      >
        <defs>
          <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-border" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="800" height="400" fill="url(#grid2)" />

        {/* Phase Demarcation Lines */}
        <line x1="275" y1="0" x2="275" y2="400" stroke="#333" strokeWidth="2" strokeDasharray="5 5" />
        <line x1="525" y1="0" x2="525" y2="400" stroke="#333" strokeWidth="2" strokeDasharray="5 5" />

        {/* Price Action Path */}
        <path
          d={pathD}
          fill="none"
          stroke={lineColor}
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Annotations */}
        {/* Phase 1 */}
        <rect x="50" y={isBull ? 320 : 20} width="200" height="60" fill="#1A1A1A" rx="4" stroke="#333" />
        <text x="150" y={isBull ? 345 : 45} fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">{p1Label}</text>
        <text x="150" y={isBull ? 365 : 65} fill="#888" fontSize="12" textAnchor="middle">{p1Desc}</text>

        {/* Phase 2 */}
        <rect x="300" y={isBull ? 320 : 20} width="200" height="60" fill="#1A1A1A" rx="4" stroke="#333" />
        <text x="400" y={isBull ? 345 : 45} fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">{p2Label}</text>
        <text x="400" y={isBull ? 365 : 65} fill="#888" fontSize="12" textAnchor="middle">{p2Desc}</text>

        {/* Phase 3 */}
        <rect x="550" y={isBull ? 320 : 20} width="200" height="60" fill="#1A1A1A" rx="4" stroke="#333" />
        <text x="650" y={isBull ? 345 : 45} fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">{p3Label}</text>
        <text x="650" y={isBull ? 365 : 65} fill="#888" fontSize="12" textAnchor="middle">{p3Desc}</text>
      </svg>
    </div>
  );
};
