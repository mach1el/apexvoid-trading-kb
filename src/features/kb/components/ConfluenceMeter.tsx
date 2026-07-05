import { useState } from 'react';

type FactorType = 'trend' | 'structure' | 'liquidity' | 'momentum' | 'time';

interface Factor {
  id: string;
  label: string;
  type: FactorType;
  description: string;
}

const factors: Factor[] = [
  { id: 'htf-trend', label: 'HTF Trend Alignment', type: 'trend', description: 'Trading in the direction of the higher timeframe trend.' },
  { id: 'market-structure', label: 'Market Structure Shift', type: 'structure', description: 'Local break of structure or CHoCH.' },
  { id: 'fvg', label: 'Fair Value Gap (FVG)', type: 'momentum', description: 'Imbalance in price delivery.' },
  { id: 'ob', label: 'Order Block (OB)', type: 'momentum', description: 'Institutional footprint before displacement.' },
  { id: 'sweep', label: 'Liquidity Sweep', type: 'liquidity', description: 'Stop hunt of previous session/day highs or lows.' },
  { id: 'session', label: 'Killzone / Session Open', type: 'time', description: 'Trading during high-volume algorithmic windows.' },
  { id: 'ote', label: 'Optimal Trade Entry (OTE)', type: 'structure', description: 'Pullback into the 62-79% Fibonacci retracement.' }
];

export function ConfluenceMeter() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleFactor = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  // Determine redundancy
  const selectedTypes = selected.map(id => factors.find(f => f.id === id)!.type);
  const typeCounts = selectedTypes.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const redundantTypes = Object.keys(typeCounts).filter(type => typeCounts[type] > 1);
  const isRedundant = redundantTypes.length > 0;

  // Calculate score
  const uniqueCategories = Object.keys(typeCounts).length;
  
  let grade = 'C';
  let gradeColor = 'text-warn border-warn';
  let barColor = 'bg-warn';
  let message = 'Low probability. Needs more structural and time confluence.';

  if (uniqueCategories >= 4) {
    grade = 'A';
    gradeColor = 'text-ok border-ok';
    barColor = 'bg-ok';
    message = 'High probability setup! Strong multi-factor alignment.';
  } else if (uniqueCategories >= 2) {
    grade = 'B';
    gradeColor = 'text-accent border-accent';
    barColor = 'bg-accent';
    message = 'Playable setup, but consider waiting for deeper confluence.';
  }

  if (selected.length === 0) {
    grade = '-';
    gradeColor = 'text-text-muted border-border';
    barColor = 'bg-bg-base';
    message = 'Select factors to build your thesis.';
  }

  const pct = (uniqueCategories / 5) * 100;

  return (
    <div className="bg-bg-elevated border border-border rounded-lg p-6 my-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side: Toggles */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-text mb-4 mt-0">Technical Factors</h3>
          <div className="space-y-2">
            {factors.map(factor => {
              const isSelected = selected.includes(factor.id);
              return (
                <button
                  key={factor.id}
                  onClick={() => toggleFactor(factor.id)}
                  className={`w-full text-left p-3 rounded-md border transition-colors flex items-center justify-between
                    ${isSelected ? 'bg-accent/10 border-accent/50' : 'bg-bg-base border-border hover:border-text-muted'}
                  `}
                >
                  <div>
                    <span className={`font-semibold block ${isSelected ? 'text-accent' : 'text-text'}`}>
                      {factor.label}
                    </span>
                    <span className="text-xs text-text-muted">{factor.description}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-sm border flex items-center justify-center shrink-0
                    ${isSelected ? 'bg-accent border-accent text-bg-base' : 'border-text-muted'}
                  `}>
                    {isSelected && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right side: Meter */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-bg-base rounded-xl p-6 border border-border text-center">
            <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4 mt-0">Trade Quality</h4>
            
            <div className="flex justify-center mb-6">
              <div className={`w-24 h-24 flex items-center justify-center text-4xl font-bold border-4 rounded-full transition-colors duration-300 ${gradeColor}`}>
                {grade}
              </div>
            </div>

            <div className="w-full h-3 bg-bg-elevated rounded-full overflow-hidden mb-4">
              <div
                className={`h-full transition-all duration-500 ${barColor}`}
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
            
            <p className="text-text font-medium min-h-[48px] m-0 mb-4 flex items-center justify-center">
              {message}
            </p>

            {isRedundant && (
              <div className="bg-warn/10 border border-warn/30 text-warn text-sm p-3 rounded-md text-left">
                <strong>⚠️ Redundancy Warning:</strong> You have selected multiple factors of the same category ({redundantTypes.join(', ')}). E.g. A FVG and an OB are both momentum concepts; they don't count as independent confluence.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
