import { useState, type FC } from 'react';

export const ExpectancyLab: FC = () => {
  const [wr, setWr] = useState(45);
  const [aw, setAw] = useState(2.0);
  const [al, setAl] = useState(1.0);

  const p = wr / 100;
  const E = p * aw - (1 - p) * al;
  const eStr = (E >= 0 ? "+" : "") + E.toFixed(2) + "R";
  const e100Str = (E >= 0 ? "+" : "") + (E * 100).toFixed(0) + "R";
  
  const isEdge = E > 0.05;
  const isNeg = E < -0.05;
  const verd = isEdge ? "edge" : isNeg ? "negative — no edge" : "marginal";
  const verdColor = isEdge ? "text-ok" : isNeg ? "text-bear" : "text-warn";

  const W = 440, H = 260, lp = 48, rp = 16, tp = 18, bp = 30;
  const y0 = Math.min(0, E * 100);
  const y1 = Math.max(10, E * 100);
  const x = (n: number) => lp + n / 100 * (W - lp - rp);
  const yv = (v: number) => tp + (y1 - v) / (y1 - y0) * (H - tp - bp);
  const strokeColor = E >= 0 ? "var(--color-ok)" : "var(--color-bear)";

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text m-0">Expectancy & R-multiples</h3>
        <p className="text-sm text-text-muted mt-1">
          Measure results in <b>R</b> (multiples of the amount risked), not dollars. Expectancy per trade = <code>(win% × avgWin_R) − (loss% × avgLoss_R)</code>.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div>
            <label className="block text-xs font-mono text-text-muted uppercase mb-1">Win rate</label>
            <div className="flex items-center gap-3">
              <input type="range" min="10" max="90" step="1" value={wr} onChange={(e) => setWr(Number(e.target.value))} className="flex-1 accent-accent" />
              <span className="text-sm font-mono text-accent w-12 text-right">{wr}%</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono text-text-muted uppercase mb-1">Avg win (R)</label>
            <div className="flex items-center gap-3">
              <input type="range" min="0.5" max="5" step="0.1" value={aw} onChange={(e) => setAw(Number(e.target.value))} className="flex-1 accent-accent" />
              <span className="text-sm font-mono text-accent w-12 text-right">{aw.toFixed(1)}R</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono text-text-muted uppercase mb-1">Avg loss (R)</label>
            <div className="flex items-center gap-3">
              <input type="range" min="0.5" max="2" step="0.1" value={al} onChange={(e) => setAl(Number(e.target.value))} className="flex-1 accent-accent" />
              <span className="text-sm font-mono text-accent w-12 text-right">{al.toFixed(1)}R</span>
            </div>
          </div>
          
          <div className="bg-bg-elevated border border-border rounded p-4 mt-2">
            <div className="flex justify-between items-baseline py-2 border-b border-dashed border-border">
              <span className="text-xs text-text-muted">Expectancy / trade</span>
              <span className="text-base font-mono font-bold text-accent">{eStr}</span>
            </div>
            <div className="flex justify-between items-baseline py-2 border-b border-dashed border-border">
              <span className="text-xs text-text-muted">Expected over 100 trades</span>
              <span className="text-sm font-mono font-bold">{e100Str}</span>
            </div>
            <div className="flex justify-between items-baseline pt-2">
              <span className="text-xs text-text-muted">Verdict</span>
              <span className={`text-sm font-mono font-bold uppercase ${verdColor}`}>{verd}</span>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <div className="w-full aspect-video relative bg-bg-elevated border border-border rounded">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full block">
              {[0, 1, 2, 3, 4].map(k => {
                const v = y0 + (y1 - y0) * k / 4;
                const yy = yv(v);
                return (
                  <g key={k}>
                    <line x1={lp} y1={yy} x2={W-rp} y2={yy} stroke="var(--color-border)" strokeWidth="1" />
                    <text x={lp-8} y={yy+3.5} textAnchor="end" fontFamily="monospace" fontSize="10" fill="var(--color-text-muted)">{v.toFixed(0)}R</text>
                  </g>
                );
              })}
              <line x1={lp} y1={yv(0)} x2={W-rp} y2={yv(0)} stroke="var(--color-text-muted)" strokeDasharray="4 3" />
              <path d={`M${x(0)},${yv(0)} L${x(100)},${yv(E*100)}`} fill="none" stroke={strokeColor} strokeWidth="2.4" />
              <circle cx={x(100)} cy={yv(E*100)} r="4" fill={strokeColor} />
              <text x={lp} y={H-8} fontFamily="monospace" fontSize="10" fill="var(--color-text-muted)">0</text>
              <text x={W-rp} y={H-8} textAnchor="end" fontFamily="monospace" fontSize="10" fill="var(--color-text-muted)">100 trades (avg path)</text>
            </svg>
          </div>
          <div className="mt-4 border-l-2 border-accent bg-accent/5 p-3 rounded-r text-sm text-text-muted leading-relaxed">
            <b className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">Caveat</b>
            Expectancy is the <i>average</i>; real equity is jagged and any finite sample has variance. A positive edge still endures losing streaks — which is why sizing and drawdown math matter.
          </div>
        </div>
      </div>
    </div>
  );
};
