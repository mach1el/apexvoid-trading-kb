import { useState, useMemo, type FC } from 'react';

export const ScaleInPlanner: FC = () => {
  const [acct, setAcct] = useState(10000);
  const [riskPct, setRiskPct] = useState(1.0);
  const [zoneA, setZoneA] = useState(2350.0);
  const [zoneB, setZoneB] = useState(2340.0);
  const [rungs, setRungs] = useState(4);
  const [stop, setStop] = useState(2335.0);
  const [cv, setCv] = useState(100);
  const [distMode, setDistMode] = useState<'equal_lots' | 'equal_risk'>('equal_lots');

  const riskCap = acct * (riskPct / 100);
  
  const top = Math.max(zoneA, zoneB);
  const bottom = Math.min(zoneA, zoneB);
  
  const isInside = stop >= bottom && stop <= top;
  const isLong = stop < bottom;
  
  const bad = isInside || rungs < 2 || cv <= 0 || zoneA === zoneB;

  const results = useMemo(() => {
    if (bad) return null;

    const entries = [];
    const step = (top - bottom) / (rungs - 1);
    
    // Sort entries depending on long/short
    // For long, we enter as price drops from top to bottom
    // For short, we enter as price rises from bottom to top
    for (let i = 0; i < rungs; i++) {
      const p = isLong ? top - (step * i) : bottom + (step * i);
      entries.push(p);
    }

    let rungsData = [];
    let totalLots = 0;
    // let totalDistanceRisk = 0;

    if (distMode === 'equal_lots') {
      // Calculate total distance risk for 1 lot at each rung
      const distSum = entries.reduce((acc, p) => acc + Math.abs(p - stop) * cv, 0);
      const lotPerRung = riskCap / distSum;
      
      rungsData = entries.map(p => {
        const rungRisk = Math.abs(p - stop) * cv * lotPerRung;
        return { price: p, lots: lotPerRung, risk: rungRisk };
      });
      totalLots = lotPerRung * rungs;
    } else {
      // equal_risk
      const riskPerRung = riskCap / rungs;
      rungsData = entries.map(p => {
        const dist = Math.abs(p - stop) * cv;
        const lots = riskPerRung / dist;
        totalLots += lots;
        return { price: p, lots, risk: riskPerRung };
      });
    }

    const totalRisk = rungsData.reduce((acc, r) => acc + r.risk, 0);
    const weightedEntry = rungsData.reduce((acc, r) => acc + (r.price * r.lots), 0) / totalLots;

    return {
      rungsData,
      totalLots,
      totalRisk,
      weightedEntry
    };
  }, [top, bottom, rungs, stop, cv, riskCap, distMode, bad, isLong]);

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text m-0">Scale-In Planner (Zone DCA)</h3>
        <p className="text-sm text-text-muted mt-1">
          Calculate laddered entries across a zone. Refuse setups where the stop is inside the zone.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase mb-1">Account ($)</label>
              <input type="number" value={acct} onChange={(e) => setAcct(Number(e.target.value))} step="100" className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase mb-1">Risk (%)</label>
              <input type="number" value={riskPct} onChange={(e) => setRiskPct(Number(e.target.value))} step="0.1" className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono focus:border-accent outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase mb-1">Zone Bound 1</label>
              <input type="number" value={zoneA} onChange={(e) => setZoneA(Number(e.target.value))} step="0.1" className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase mb-1">Zone Bound 2</label>
              <input type="number" value={zoneB} onChange={(e) => setZoneB(Number(e.target.value))} step="0.1" className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono focus:border-accent outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase mb-1">Rungs (Entries)</label>
              <input type="number" value={rungs} onChange={(e) => setRungs(Number(e.target.value))} min="2" max="10" step="1" className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase mb-1">Stop Loss</label>
              <input type="number" value={stop} onChange={(e) => setStop(Number(e.target.value))} step="0.1" className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono focus:border-accent outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase mb-1">Contract Value</label>
              <input type="number" value={cv} onChange={(e) => setCv(Number(e.target.value))} step="1" className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase mb-1">Distribution</label>
              <select value={distMode} onChange={(e) => setDistMode(e.target.value as any)} className="w-full bg-bg-elevated border border-border rounded px-3 py-2 text-text font-mono focus:border-accent outline-none">
                <option value="equal_lots">Equal Lots</option>
                <option value="equal_risk">Equal Risk</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div className="bg-bg-elevated border border-border rounded-lg p-5">
            <div className="flex justify-between items-baseline py-2 border-b border-dashed border-border">
              <span className="text-xs text-text-muted">Risk Cap ({riskPct}%)</span>
              <span className="text-sm font-mono font-bold">${riskCap.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
            </div>
            
            <div className="flex justify-between items-baseline py-2 border-b border-dashed border-border">
              <span className="text-xs text-text-muted">Direction</span>
              <span className="text-sm font-mono font-bold text-accent">{bad ? '—' : (isLong ? 'LONG' : 'SHORT')}</span>
            </div>

            <div className="flex justify-between items-baseline py-2 border-b border-dashed border-border">
              <span className="text-xs text-text-muted">Weighted Avg Entry</span>
              <span className="text-sm font-mono font-bold text-accent">{bad || !results ? '—' : results.weightedEntry.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-baseline py-3 border-b border-dashed border-border">
              <span className="text-xs text-text-muted">Total Position Size</span>
              <span className="text-base font-mono font-bold text-accent">{bad || !results ? '—' : `${results.totalLots.toFixed(2)} lots`}</span>
            </div>

            <div className="mt-4">
              <span className="text-xs text-text-muted font-mono uppercase">Ladder Breakdown</span>
              <div className="mt-2 text-xs font-mono w-full text-left">
                {bad || !results ? (
                  <div className="text-warn py-2">{isInside ? '⚠ Stop loss cannot be inside the entry zone.' : '⚠ Invalid configuration.'}</div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border text-text-muted">
                        <th className="font-normal text-left py-1">Price</th>
                        <th className="font-normal text-right py-1">Lots</th>
                        <th className="font-normal text-right py-1">Risk ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.rungsData.map((r, idx) => (
                        <tr key={idx} className="border-b border-dashed border-border/50">
                          <td className="py-1">{r.price.toFixed(2)}</td>
                          <td className="text-right py-1">{r.lots.toFixed(3)}</td>
                          <td className="text-right py-1">{r.risk.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 border-l-2 border-accent bg-accent/5 p-3 rounded-r text-sm text-text-muted leading-relaxed">
            <b className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">Scale-In Math</b>
            {distMode === 'equal_lots' 
              ? "Equal lots spread across the zone. Risk is heavier on the first entries since they are further from the stop."
              : "Equal risk per rung. Lot size increases as you get closer to the stop, improving your weighted average entry."}
          </div>
        </div>
      </div>
    </div>
  );
};
