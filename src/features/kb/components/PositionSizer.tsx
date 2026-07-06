import { useState, type FC } from 'react';

export const PositionSizer: FC = () => {
  const [acct, setAcct] = useState(10000);
  const [riskPct, setRiskPct] = useState(1.0);
  const [inst, setInst] = useState('100');
  const [cv, setCv] = useState(100);
  const [entry, setEntry] = useState(2340.0);
  const [stop, setStop] = useState(2337.0);

  // ATR Mode
  const [atrMode, setAtrMode] = useState(false);
  const [atr, setAtr] = useState(2.5);
  const [atrMult, setAtrMult] = useState(1.5);
  const [isLong, setIsLong] = useState(true);
  const isGold = inst === '100';
  const activeCv = isGold ? 100 : cv;
  const riskAmt = acct * (riskPct / 100);
  const activeStop = atrMode ? (isLong ? entry - (atr * atrMult) : entry + (atr * atrMult)) : stop;
  const pr = Math.abs(entry - activeStop);
  const bad = pr <= 0 || activeCv <= 0;

  const lots = bad ? 0 : riskAmt / (pr * activeCv);
  const pips = isGold ? pr / 0.10 : 0;
  
  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text m-0">Position Size Calculator</h3>
        <p className="text-sm text-text-muted mt-1">
          Risk a fixed % of the account per trade, then let the stop distance decide the size — never the other way around.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-mono text-text-muted uppercase mb-1">Account balance ($)</label>
            <input type="number" value={acct} onChange={(e) => setAcct(Number(e.target.value))} step="100" className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono focus:border-accent outline-none" />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-muted uppercase mb-1">Risk per trade</label>
            <div className="flex items-center gap-3">
              <input type="range" value={riskPct} onChange={(e) => setRiskPct(Number(e.target.value))} min="0.1" max="3" step="0.1" className="flex-1 accent-accent" />
              <span className="text-sm font-mono text-accent w-12 text-right">{riskPct.toFixed(1)}%</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono text-text-muted uppercase mb-1">Instrument</label>
            <select value={inst} onChange={(e) => setInst(e.target.value)} className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono focus:border-accent outline-none">
              <option value="100">Gold / XAU-USD (100 oz per lot)</option>
              <option value="custom">Custom (enter value/point)</option>
            </select>
          </div>
          {!isGold && (
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase mb-1">Contract value per 1.00 move ($)</label>
              <input type="number" value={cv} onChange={(e) => setCv(Number(e.target.value))} step="1" className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono focus:border-accent outline-none" />
            </div>
          )}
          <div>
            <label className="block text-xs font-mono text-text-muted uppercase mb-1">Entry price</label>
            <input type="number" value={entry} onChange={(e) => setEntry(Number(e.target.value))} step="0.1" className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono focus:border-accent outline-none" />
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" id="atrMode" checked={atrMode} onChange={e => setAtrMode(e.target.checked)} className="accent-accent" />
            <label htmlFor="atrMode" className="text-xs font-mono text-text-muted uppercase cursor-pointer">ATR Mode (Auto-calculate Stop)</label>
          </div>

          {!atrMode ? (
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase mb-1">Stop-loss price</label>
              <input type="number" value={stop} onChange={(e) => setStop(Number(e.target.value))} step="0.1" className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono focus:border-accent outline-none" />
            </div>
          ) : (
            <div className="bg-bg-elevated border border-border rounded p-3 flex flex-col gap-3">
              <div className="flex gap-2">
                 <button onClick={() => setIsLong(true)} className={`flex-1 py-1 rounded text-xs font-mono border ${isLong ? 'bg-green-500/20 border-green-500 text-green-400' : 'border-border text-text-muted'}`}>LONG</button>
                 <button onClick={() => setIsLong(false)} className={`flex-1 py-1 rounded text-xs font-mono border ${!isLong ? 'bg-red-500/20 border-red-500 text-red-400' : 'border-border text-text-muted'}`}>SHORT</button>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-mono text-text-muted uppercase mb-1">ATR</label>
                  <input type="number" value={atr} onChange={e => setAtr(Number(e.target.value))} step="0.1" className="w-full bg-bg-panel border border-border rounded px-2 py-1 text-text font-mono focus:border-accent outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-mono text-text-muted uppercase mb-1">Multiple</label>
                  <input type="number" value={atrMult} onChange={e => setAtrMult(Number(e.target.value))} step="0.1" className="w-full bg-bg-panel border border-border rounded px-2 py-1 text-text font-mono focus:border-accent outline-none" />
                </div>
              </div>
              <div className="text-xs font-mono text-text-muted">
                Auto-Stop: <span className="text-accent">{activeStop.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div className="bg-bg-elevated border border-border rounded-lg p-5">
            <div className="flex justify-between items-baseline py-2 border-b border-dashed border-border">
              <span className="text-xs text-text-muted">Amount at risk</span>
              <span className="text-sm font-mono font-bold">${riskAmt.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
            </div>
            <div className="flex justify-between items-baseline py-2 border-b border-dashed border-border">
              <span className="text-xs text-text-muted">Price risk (stop distance)</span>
              <span className="text-sm font-mono font-bold">{pr.toFixed(2)}</span>
            </div>
            {isGold && (
              <div className="flex justify-between items-baseline py-2 border-b border-dashed border-border">
                <span className="text-xs text-text-muted">Stop in pips (1 pip = $0.10)</span>
                <span className="text-sm font-mono font-bold">{Math.round(pips)}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline py-3 border-b border-dashed border-border">
              <span className="text-xs text-text-muted">Position size</span>
              <span className="text-base font-mono font-bold text-accent">{bad ? '—' : `${lots.toFixed(2)} lots`}</span>
            </div>
            {isGold && (
              <>
                <div className="flex justify-between items-baseline py-2 border-b border-dashed border-border">
                  <span className="text-xs text-text-muted">= units</span>
                  <span className="text-sm font-mono font-bold">{bad ? '—' : `${(lots * 100).toFixed(1)} oz`}</span>
                </div>
                <div className="flex justify-between items-baseline py-2">
                  <span className="text-xs text-text-muted">Value per pip</span>
                  <span className="text-sm font-mono font-bold">{bad ? '—' : `$${(riskAmt / pips).toFixed(2)}`}</span>
                </div>
              </>
            )}
          </div>
          {bad && <div className="text-xs font-mono text-warn mt-3">⚠ Stop must differ from entry.</div>}
          
          <div className="mt-4 border-l-2 border-accent bg-accent/5 p-3 rounded-r text-sm text-text-muted leading-relaxed">
            <b className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">Why %-Risk</b>
            Sizing off a fixed % means a losing streak shrinks your bets automatically. Sizing off "how many lots feels right" does the opposite and is how accounts die.
          </div>
        </div>
      </div>
    </div>
  );
};
