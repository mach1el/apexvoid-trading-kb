import { useState, type FC } from 'react';

export const LevelStrengthRater: FC = () => {
  const [touches, setTouches] = useState(false);
  const [fresh, setFresh] = useState(false);
  const [confluence, setConfluence] = useState(false);
  const [fastApproach, setFastApproach] = useState(false);
  
  let score = 0;
  if (touches) score += 1;
  if (fresh) score += 2;
  if (confluence) score += 2;
  if (fastApproach) score += 1;
  
  let grade = 'F';
  let color = 'text-red-500';
  if (score >= 5) {
    grade = 'A';
    color = 'text-green-500';
  } else if (score >= 4) {
    grade = 'B';
    color = 'text-blue-400';
  } else if (score >= 2) {
    grade = 'C';
    color = 'text-yellow-400';
  }

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text m-0">Level Strength Rater</h3>
        <p className="text-sm text-text-muted mt-1">Check the properties of your S/R or Supply/Demand zone to grade its probability.</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <label className="flex items-center gap-3 cursor-pointer p-3 bg-bg-elevated border border-border rounded hover:border-accent transition-colors">
            <input type="checkbox" checked={touches} onChange={e => setTouches(e.target.checked)} className="w-5 h-5 accent-accent" />
            <span className="text-sm font-mono text-text">Multiple Touches / Strong Rejection Prior</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-3 bg-bg-elevated border border-border rounded hover:border-accent transition-colors">
            <input type="checkbox" checked={fresh} onChange={e => setFresh(e.target.checked)} className="w-5 h-5 accent-accent" />
            <span className="text-sm font-mono text-text">Fresh Zone (Untested)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-3 bg-bg-elevated border border-border rounded hover:border-accent transition-colors">
            <input type="checkbox" checked={confluence} onChange={e => setConfluence(e.target.checked)} className="w-5 h-5 accent-accent" />
            <span className="text-sm font-mono text-text">Confluence (Fib, Trendline, MAs, etc.)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-3 bg-bg-elevated border border-border rounded hover:border-accent transition-colors">
            <input type="checkbox" checked={fastApproach} onChange={e => setFastApproach(e.target.checked)} className="w-5 h-5 accent-accent" />
            <span className="text-sm font-mono text-text">Fast Approach Speed (Imbalance/Momentum)</span>
          </label>
        </div>
        
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-6 bg-bg-elevated border border-border rounded">
          <span className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Zone Grade</span>
          <div className={`text-6xl font-bold ${color} drop-shadow-md`}>{grade}</div>
          <div className="mt-4 text-xs text-center text-text-muted">
            {grade === 'A' && 'High Probability Trade Setup. Great R:R potential.'}
            {grade === 'B' && 'Good Setup. Manage risk carefully.'}
            {grade === 'C' && 'Mediocre Level. Consider waiting for confirmation.'}
            {grade === 'F' && 'Low Probability. Best to avoid.'}
          </div>
        </div>
      </div>
    </div>
  );
};
