import { type FC } from 'react';

export const BreakevenCurve: FC = () => {
  const W = 440;
  const H = 260;
  const l = 48, r = 16, t = 18, b = 34;
  
  const x0 = 0.5, x1 = 5, y0 = 0, y1 = 80;
  
  const x = (v: number) => l + (v - x0) / (x1 - x0) * (W - l - r);
  const y = (v: number) => t + (y1 - v) / (y1 - y0) * (H - t - b);
  
  const fn = (rr: number) => 100 / (1 + rr);
  
  // Curve points
  let pathD = "";
  for(let i = 0; i <= 120; i++) {
    const xv = x0 + (x1 - x0) * i / 120;
    const yv = fn(xv);
    pathD += (i ? "L" : "M") + x(xv).toFixed(1) + "," + y(Math.max(y0, Math.min(y1, yv))).toFixed(1) + " ";
  }

  const dots = [
    {x: 1, label: "1:1 · 50%"},
    {x: 2, label: "2:1 · 33%"},
    {x: 3, label: "3:1 · 25%"}
  ];

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-text m-0">Win rate vs Reward:Risk — the breakeven line</h3>
        <p className="text-sm text-text-muted mt-1">
          The minimum win rate to break even is <code>1 / (1 + R:R)</code>.
        </p>
      </div>
      
      <div className="w-full aspect-video md:aspect-[2/1] relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full block">
          {/* Grid */}
          {[0, 1, 2, 3, 4].map(k => {
            const v = y0 + (y1 - y0) * k / 4;
            const yy = y(v);
            return (
              <g key={k}>
                <line x1={l} y1={yy} x2={W-r} y2={yy} stroke="var(--color-border)" strokeWidth="1" />
                <text x={l-8} y={yy+3.5} textAnchor="end" fontFamily="monospace" fontSize="10" fill="var(--color-text-muted)">{v.toFixed(0)}%</text>
              </g>
            );
          })}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => {
            const v = x0 + (x1 - x0) * k / 9;
            return (
              <text key={k} x={x(v)} y={H-12} textAnchor="middle" fontFamily="monospace" fontSize="10" fill="var(--color-text-muted)">{v.toFixed(1)}</text>
            );
          })}
          
          <path d={pathD} fill="none" stroke="var(--color-accent)" strokeWidth="2.2" />
          
          {dots.map((dt, i) => {
            const px = x(dt.x);
            const py = y(fn(dt.x));
            return (
              <g key={i}>
                <circle cx={px} cy={py} r="3.6" fill="var(--color-accent)" />
                <text x={px} y={py-9} textAnchor="middle" fontFamily="monospace" fontSize="10" fill="var(--color-text)" fontWeight="600">{dt.label}</text>
              </g>
            );
          })}
          
          <text x={l} y={H-1} fontFamily="monospace" fontSize="10" fill="var(--color-text-muted)">reward : risk →</text>
        </svg>
      </div>
      
      <div className="mt-4 border-l-2 border-accent bg-accent/5 p-3 rounded-r text-sm text-text-muted leading-relaxed">
        <b className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">Read</b>
        At 1:1 you need {'>'}50% just to break even; at 3:1 you only need {'>'}25%. Anything above the curve is a profitable edge, below it bleeds.
      </div>
    </div>
  );
};
