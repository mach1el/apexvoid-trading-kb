import { useState, type FC } from 'react';

export const OTECalculator: FC = () => {
  const [high, setHigh] = useState<number>(1.1000);
  const [low, setLow] = useState<number>(1.0800);
  const [direction, setDirection] = useState<'long' | 'short'>('long');

  const range = high - low;
  
  // Calculate Fib levels based on direction
  // For Longs: 100% is Low, 0% is High. Discount is below 50%.
  // For Shorts: 100% is High, 0% is Low. Premium is above 50%.
  
  const getLevel = (pct: number) => {
    if (direction === 'long') {
      return high - (range * (pct / 100));
    } else {
      return low + (range * (pct / 100));
    }
  };

  const levels = [
    { pct: 0, label: 'Swing High', value: getLevel(0) },
    { pct: 50, label: 'Equilibrium (EQ)', value: getLevel(50) },
    { pct: 62, label: 'OTE Start', value: getLevel(62) },
    { pct: 70.5, label: 'OTE Sweet Spot', value: getLevel(70.5) },
    { pct: 79, label: 'OTE End', value: getLevel(79) },
    { pct: 100, label: 'Swing Low', value: getLevel(100) }
  ];

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6 flex flex-col md:flex-row gap-8">
      
      {/* Controls */}
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <h3 className="text-lg font-bold text-text m-0">OTE Calculator</h3>
        <p className="text-sm text-text-muted">
          Input your swing points to calculate the Optimal Trade Entry band.
        </p>
        
        <div className="flex bg-bg-elevated p-1 rounded border border-border">
          <button 
            onClick={() => setDirection('long')}
            className={`flex-1 py-1 text-sm font-medium rounded ${direction === 'long' ? 'bg-bull text-bg-base' : 'text-text-muted hover:text-text'}`}
          >
            Long Setup
          </button>
          <button 
            onClick={() => setDirection('short')}
            className={`flex-1 py-1 text-sm font-medium rounded ${direction === 'short' ? 'bg-bear text-bg-base' : 'text-text-muted hover:text-text'}`}
          >
            Short Setup
          </button>
        </div>

        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">Swing High Price</label>
          <input 
            type="number" 
            value={high}
            onChange={(e) => setHigh(Math.max(low + 0.0001, Number(e.target.value)))}
            step="0.0010"
            className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono focus:border-accent outline-none"
          />
        </div>
        
        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">Swing Low Price</label>
          <input 
            type="number" 
            value={low}
            onChange={(e) => setLow(Math.min(high - 0.0001, Number(e.target.value)))}
            step="0.0010"
            className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono focus:border-accent outline-none"
          />
        </div>
      </div>

      {/* Visualization */}
      <div className="w-full md:w-2/3 bg-bg-elevated rounded border border-border p-6 relative min-h-[300px]">
        <div className="absolute inset-x-6 top-6 bottom-6 flex flex-col justify-between">
          
          {/* We map the physical rendering such that 0% is top and 100% is bottom visually,
              regardless of direction, but the LABELS map to the levels array. */}
              
          {levels.map((lvl) => {
            // Visual position (0% top, 100% bottom)
            const topPos = `${lvl.pct}%`;
            
            // Is it an OTE level?
            const isOte = [62, 70.5, 79].includes(lvl.pct);
            const isEq = lvl.pct === 50;
            const isExtreme = lvl.pct === 0 || lvl.pct === 100;

            return (
              <div 
                key={lvl.pct} 
                className="absolute w-full border-t flex justify-between items-end pb-1"
                style={{ 
                  top: topPos,
                  borderColor: isOte ? 'var(--color-accent)' : isEq ? 'var(--color-text)' : 'var(--color-border)',
                  borderTopStyle: isExtreme ? 'solid' : 'dashed',
                  opacity: isExtreme || isEq || isOte ? 1 : 0.3
                }}
              >
                <div className="flex gap-2">
                  <span className={`text-[10px] font-bold ${isOte ? 'text-accent' : isEq ? 'text-text' : 'text-text-muted'}`}>
                    {lvl.pct}%
                  </span>
                  <span className={`text-[10px] ${isOte ? 'text-accent' : 'text-text-muted'}`}>
                    {lvl.label}
                  </span>
                </div>
                <span className={`text-xs font-mono font-bold ${isOte ? 'text-accent' : 'text-text'}`}>
                  {lvl.value.toFixed(4)}
                </span>
              </div>
            );
          })}
          
          {/* Background Shading for OTE Zone */}
          <div 
            className="absolute left-0 right-0 bg-accent/10 border-l-2 border-r-2 border-accent"
            style={{ top: '62%', height: '17%' }} // 79 - 62 = 17%
          />

          {/* Background Shading for Discount/Premium */}
          <div 
            className="absolute left-0 w-2 h-1/2 opacity-20"
            style={{ top: '0%', backgroundColor: direction === 'long' ? 'var(--color-bear)' : 'var(--color-bull)' }}
          />
          <div 
            className="absolute left-0 w-2 h-1/2 opacity-20"
            style={{ top: '50%', backgroundColor: direction === 'long' ? 'var(--color-bull)' : 'var(--color-bear)' }}
          />
        </div>
      </div>
    </div>
  );
};
