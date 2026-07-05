import { useState } from 'react';

type Regime = 'trending' | 'ranging' | 'choppy';

export function RegimeMatcher() {
  const [regime, setRegime] = useState<Regime>('trending');

  const regimes = {
    trending: {
      label: 'Trending Market',
      description: 'Clear directional movement with higher highs and higher lows, or lower highs and lower lows.',
      bestFor: ['Trend-Following Pullback', 'Breakout & Retest', 'Momentum Continuation'],
      avoid: ['Mean Reversion Fade'],
      rationale: 'In a strong trend, fading the move is dangerous. Wait for pullbacks to join the primary direction.'
    },
    ranging: {
      label: 'Ranging (Sideways)',
      description: 'Price bouncing between clear support and resistance levels without a definitive direction.',
      bestFor: ['Mean-Reversion Fade (Range Extremes)'],
      avoid: ['Trend-Following Pullback', 'Momentum Continuation'],
      rationale: 'Breakouts often fail in ranges. Sell at resistance, buy at support. Tighten targets.'
    },
    choppy: {
      label: 'Choppy / Unclear',
      description: 'High volatility, overlapping price bars, no clear structure or boundaries.',
      bestFor: ['The Wait Protocol (Stand Aside)'],
      avoid: ['All directional strategies'],
      rationale: 'Capital preservation is key here. The edge is lowest in choppy environments. Let the market show its hand.'
    }
  };

  return (
    <div className="my-6 p-6 border rounded-lg bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold mb-4">Regime Matcher: Select Current Market State</h3>
      <div className="flex gap-2 mb-6 flex-wrap">
        {(Object.keys(regimes) as Regime[]).map(r => (
          <button
            key={r}
            onClick={() => setRegime(r)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${regime === r ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
          >
            {regimes[r].label}
          </button>
        ))}
      </div>

      <div className="p-4 bg-white dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800">
        <p className="text-slate-600 dark:text-slate-400 mb-4">{regimes[regime].description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded">
            <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">Optimal Strategies</h4>
            <ul className="list-disc pl-5 text-green-900 dark:text-green-300 space-y-1 text-sm">
              {regimes[regime].bestFor.map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>
          
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded">
            <h4 className="font-semibold text-red-800 dark:text-red-400 mb-2">Strategies to Avoid</h4>
            <ul className="list-disc pl-5 text-red-900 dark:text-red-300 space-y-1 text-sm">
              {regimes[regime].avoid.map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-900">
          <p className="text-sm text-blue-800 dark:text-blue-300"><span className="font-bold">Rationale:</span> {regimes[regime].rationale}</p>
        </div>
      </div>
    </div>
  );
}
