import { useState, type FC, type MouseEvent } from 'react';

export const LevelPlotter: FC = () => {
  const [high, setHigh] = useState<number | null>(null);
  const [low, setLow] = useState<number | null>(null);

  const handleSvgClick = (e: MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = ((e.clientY - rect.top) / rect.height) * 400; // viewBox height is 400

    if (high === null) {
      setHigh(y);
    } else if (low === null) {
      // Ensure high is visually above low (smaller y is higher visually)
      if (y > high) {
        setLow(y);
      } else {
        setLow(high);
        setHigh(y);
      }
    } else {
      // Reset if both are set
      setHigh(y);
      setLow(null);
    }
  };

  const getStatusMessage = () => {
    if (high === null) return 'Click anywhere on the chart to set the Swing High.';
    if (low === null) return 'Click lower on the chart to set the Swing Low.';
    return 'Range defined! Premium, Discount, and OTE zones are plotted.';
  };

  let eq = null;
  let oteHigh = null;
  let oteLow = null;

  if (high !== null && low !== null) {
    const range = low - high;
    eq = high + range * 0.5; // 50%
    oteHigh = high + range * 0.62; // 62%
    oteLow = high + range * 0.79; // 79%
  }

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-text m-0">Interactive: Level Plotter</h3>
        <button 
          onClick={() => { setHigh(null); setLow(null); }}
          className="px-3 py-1 bg-bg-elevated hover:bg-border border border-border rounded text-sm text-text-muted transition-colors"
        >
          Reset
        </button>
      </div>
      
      <p className="text-sm text-text-muted mb-4 self-start bg-bg-base p-3 rounded border border-border w-full">
        <strong>Status:</strong> {getStatusMessage()}
      </p>

      <div className="relative w-full max-w-3xl overflow-hidden rounded-lg bg-bg-elevated border border-border cursor-crosshair select-none">
        <svg 
          viewBox="0 0 800 400" 
          className="w-full h-auto" 
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleSvgClick}
        >
          <defs>
            <pattern id="grid-plotter" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-border" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="800" height="400" fill="url(#grid-plotter)" />

          {/* Draw Zones if both are set */}
          {high !== null && low !== null && eq !== null && oteHigh !== null && oteLow !== null && (
            <g className="animate-in fade-in duration-500">
              {/* Premium Zone */}
              <rect x="0" y={high} width="800" height={eq - high} fill="var(--color-bear)" opacity="0.1" />
              <text x="790" y={high + 20} fill="var(--color-bear)" fontSize="12" fontWeight="bold" textAnchor="end" opacity="0.7">PREMIUM (SELL ZONE)</text>

              {/* Discount Zone */}
              <rect x="0" y={eq} width="800" height={low - eq} fill="var(--color-bull)" opacity="0.1" />
              <text x="790" y={low - 10} fill="var(--color-bull)" fontSize="12" fontWeight="bold" textAnchor="end" opacity="0.7">DISCOUNT (BUY ZONE)</text>

              {/* OTE Zone */}
              <rect x="0" y={oteHigh} width="800" height={oteLow - oteHigh} fill="var(--color-ok)" opacity="0.2" />
              
              {/* EQ Line */}
              <line x1="0" y1={eq} x2="800" y2={eq} stroke="var(--color-text-muted)" strokeWidth="2" strokeDasharray="5,5" />
              <text x="10" y={eq - 5} fill="var(--color-text-muted)" fontSize="12" fontWeight="bold">0.50 (EQ)</text>

              {/* OTE Lines */}
              <line x1="0" y1={oteHigh} x2="800" y2={oteHigh} stroke="var(--color-ok)" strokeWidth="1" strokeDasharray="3,3" />
              <text x="10" y={oteHigh - 5} fill="var(--color-ok)" fontSize="12" fontWeight="bold">0.62</text>
              <line x1="0" y1={oteLow} x2="800" y2={oteLow} stroke="var(--color-ok)" strokeWidth="1" strokeDasharray="3,3" />
              <text x="10" y={oteLow + 15} fill="var(--color-ok)" fontSize="12" fontWeight="bold">0.79</text>
              <text x="790" y={oteHigh + 15} fill="var(--color-ok)" fontSize="12" fontWeight="bold" textAnchor="end">OPTIMAL TRADE ENTRY</text>
            </g>
          )}

          {/* High Line */}
          {high !== null && (
            <g>
              <line x1="0" y1={high} x2="800" y2={high} stroke="var(--color-text)" strokeWidth="2" />
              <text x="10" y={high - 5} fill="var(--color-text)" fontSize="12" fontWeight="bold">0.00 (HIGH)</text>
              <circle cx="400" cy={high} r="5" fill="var(--color-text)" />
            </g>
          )}

          {/* Low Line */}
          {low !== null && (
            <g>
              <line x1="0" y1={low} x2="800" y2={low} stroke="var(--color-text)" strokeWidth="2" />
              <text x="10" y={low + 15} fill="var(--color-text)" fontSize="12" fontWeight="bold">1.00 (LOW)</text>
              <circle cx="400" cy={low} r="5" fill="var(--color-text)" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
