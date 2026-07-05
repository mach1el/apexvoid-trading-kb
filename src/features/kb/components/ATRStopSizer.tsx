import { useState, type FC } from 'react';

export const ATRStopSizer: FC = () => {
  const [entry, setEntry] = useState(2340.0);
  const [atr, setAtr] = useState(2.5);
  const [atrMult, setAtrMult] = useState(1.5);
  const [acct, setAcct] = useState(10000);
  const [riskPct, setRiskPct] = useState(1.0);
  const [isLong, setIsLong] = useState(true);

  const riskAmt = acct * (riskPct / 100);
  const stopDist = atr * atrMult;
  const stopPrice = isLong ? entry - stopDist : entry + stopDist;
  
  // Assuming 100 multiplier (Gold) for standard calculation in this standalone comp
  const positionSize = stopDist > 0 ? riskAmt / (stopDist * 100) : 0;

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text m-0">ATR Stop Sizer</h3>
        <p className="text-sm text-text-muted mt-1">Calculate your stop-loss distance and position size based on current market volatility (ATR).</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="flex gap-4 mb-2">
            <button 
              onClick={() => setIsLong(true)}
              className={`flex-1 py-2 rounded text-sm font-mono border ${isLong ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-bg-elevated border-border text-text-muted'}`}
            >LONG</button>
            <button 
              onClick={() => setIsLong(false)}
              className={`flex-1 py-2 rounded text-sm font-mono border ${!isLong ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-bg-elevated border-border text-text-muted'}`}
            >SHORT</button>
          </div>
          <div>
            <label className="block text-xs font-mono text-text-muted uppercase mb-1">Entry Price</label>
            <input type="number" value={entry} onChange={e => setEntry(Number(e.target.value))} className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono outline-none focus:border-accent" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-mono text-text-muted uppercase mb-1">Current ATR</label>
              <input type="number" value={atr} onChange={e => setAtr(Number(e.target.value))} step="0.1" className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono outline-none focus:border-accent" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-mono text-text-muted uppercase mb-1">ATR Multiple</label>
              <input type="number" value={atrMult} onChange={e => setAtrMult(Number(e.target.value))} step="0.1" className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono outline-none focus:border-accent" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-mono text-text-muted uppercase mb-1">Account Size ($)</label>
              <input type="number" value={acct} onChange={e => setAcct(Number(e.target.value))} className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono outline-none focus:border-accent" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-mono text-text-muted uppercase mb-1">Risk %</label>
              <input type="number" value={riskPct} onChange={e => setRiskPct(Number(e.target.value))} step="0.1" className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono outline-none focus:border-accent" />
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 bg-bg-elevated border border-border rounded-lg p-5 flex flex-col justify-center gap-4">
          <div className="flex justify-between items-center pb-3 border-b border-dashed border-border">
            <span className="text-sm text-text-muted">Stop-Loss Price</span>
            <span className={`text-xl font-mono font-bold ${isLong ? 'text-red-400' : 'text-green-400'}`}>{stopPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-dashed border-border">
            <span className="text-sm text-text-muted">Stop Distance (Points)</span>
            <span className="text-lg font-mono font-bold text-text">{stopDist.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-dashed border-border">
            <span className="text-sm text-text-muted">Risk Amount</span>
            <span className="text-lg font-mono font-bold text-text">${riskAmt.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm text-text-muted">Position Size (Lots)</span>
            <span className="text-2xl font-mono font-bold text-accent">{positionSize.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
