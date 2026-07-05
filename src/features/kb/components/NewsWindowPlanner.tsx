import { useState, type FC } from 'react';

export const NewsWindowPlanner: FC = () => {
  const [impact, setImpact] = useState('Medium');
  
  const recommendations: Record<string, { desc: string, rec: string, color: string }> = {
    'Low': {
      desc: 'Minor data points (e.g. routine speeches, minor index releases).',
      rec: 'Trade normally. Impact on volatility is negligible.',
      color: 'text-green-400 border-green-400/30 bg-green-400/10'
    },
    'Medium': {
      desc: 'Significant data (e.g. GDP, Retail Sales, Unemployment).',
      rec: 'Wait 15 mins before and 15 mins after the release to avoid erratic spread widening.',
      color: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10'
    },
    'High': {
      desc: 'Major macroeconomic events (NFP, CPI, FOMC, Rate Decisions).',
      rec: 'Stand aside for the session. Re-assess the macro context after the dust settles (1-2 hours).',
      color: 'text-red-400 border-red-400/30 bg-red-400/10'
    }
  };
  
  const current = recommendations[impact];

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text m-0">News Window Planner</h3>
        <p className="text-sm text-text-muted mt-1">Select the economic event impact level to receive trading window recommendations.</p>
      </div>
      
      <div className="flex gap-4 mb-6">
        {['Low', 'Medium', 'High'].map(level => (
          <button
            key={level}
            onClick={() => setImpact(level)}
            className={`flex-1 py-3 rounded text-sm font-mono border transition-colors ${impact === level ? 'bg-accent text-white border-transparent' : 'bg-bg-elevated border-border text-text hover:border-accent'}`}
          >
            {level} Impact
          </button>
        ))}
      </div>
      
      <div className={`p-5 rounded-lg border ${current.color}`}>
        <h4 className="font-bold text-sm mb-2 font-mono uppercase tracking-wide text-text">Event Context</h4>
        <p className="text-sm mb-4 text-text">{current.desc}</p>
        
        <h4 className="font-bold text-sm mb-2 font-mono uppercase tracking-wide text-text">Trading Recommendation</h4>
        <p className="text-lg font-bold text-text">{current.rec}</p>
      </div>
    </div>
  );
};
