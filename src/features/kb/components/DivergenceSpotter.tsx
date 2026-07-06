import { useState, type FC } from 'react';

export const DivergenceSpotter: FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  
  const options = [
    "Regular Bullish",
    "Hidden Bullish",
    "Regular Bearish",
    "Hidden Bearish",
    "No Divergence"
  ];
  
  const handleSelect = (opt: string) => {
    setSelected(opt);
  };
  
  const isCorrect = selected === "Regular Bullish";

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text m-0">Divergence Spotter</h3>
        <p className="text-sm text-text-muted mt-1">Identify the divergence in the chart below.</p>
      </div>
      
      <div className="bg-bg-elevated border border-border rounded p-4 mb-6 relative overflow-hidden h-64 flex flex-col justify-between">
        {/* Mock Price Chart */}
        <div className="h-32 border-b border-border border-dashed relative">
           <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
             <path d="M 0,20 Q 50,80 100,50 T 200,90 T 300,60 T 400,30" fill="none" stroke="currentColor" className="text-accent" strokeWidth="2" />
             <line x1="100" y1="50" x2="200" y2="90" stroke="#ef4444" strokeDasharray="4" strokeWidth="2" />
           </svg>
           <div className="absolute top-2 left-2 text-xs font-mono text-text-muted">PRICE (Lower Lows)</div>
        </div>
        {/* Mock RSI Chart */}
        <div className="h-24 relative mt-2">
           <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
             <path d="M 0,50 Q 50,90 100,80 T 200,60 T 300,50 T 400,40" fill="none" stroke="currentColor" className="text-purple-400" strokeWidth="2" />
             <line x1="100" y1="80" x2="200" y2="60" stroke="#22c55e" strokeDasharray="4" strokeWidth="2" />
           </svg>
           <div className="absolute top-2 left-2 text-xs font-mono text-text-muted">RSI (Higher Lows)</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {options.map(opt => (
          <button 
            key={opt}
            onClick={() => handleSelect(opt)}
            className={`px-4 py-2 rounded text-sm font-mono transition-colors ${selected === opt ? 'bg-accent text-white border-transparent' : 'bg-bg-elevated border border-border text-text hover:border-accent'}`}
          >
            {opt}
          </button>
        ))}
      </div>
      
      {selected && (
        <div className={`p-4 rounded border ${isCorrect ? 'bg-green-900/20 border-green-500/50 text-green-200' : 'bg-red-900/20 border-red-500/50 text-red-200'}`}>
          <h4 className="font-bold text-sm mb-1">{isCorrect ? 'Correct!' : 'Incorrect.'}</h4>
          <p className="text-sm">
            {isCorrect 
              ? 'Price is making Lower Lows, while the RSI is making Higher Lows. This indicates exhausted selling momentum and a potential reversal (Regular Bullish Divergence).' 
              : 'Look closely at the lows. Price is making a lower low, but the oscillator is making a higher low.'}
          </p>
        </div>
      )}
    </div>
  );
};
