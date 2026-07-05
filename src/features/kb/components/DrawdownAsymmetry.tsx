import { type FC } from 'react';

export const DrawdownAsymmetry: FC = () => {
  const W = 440, H = 260, l = 48, r = 16, t = 18, b = 34;
  const x0 = 0, x1 = 0.7, y0 = 0, y1 = 250;
  
  const x = (v: number) => l + (v - x0) / (x1 - x0) * (W - l - r);
  const y = (v: number) => t + (y1 - v) / (y1 - y0) * (H - t - b);
  
  const fn = (dd: number) => dd / (1 - dd) * 100;
  
  let pathD = "";
  for(let i = 0; i <= 120; i++) {
    const xv = x0 + (x1 - x0) * i / 120;
    const yv = fn(xv);
    pathD += (i ? "L" : "M") + x(xv).toFixed(1) + "," + y(Math.max(y0, Math.min(y1, yv))).toFixed(1) + " ";
  }

  const rows = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text m-0">Drawdown recovery is asymmetric</h3>
        <p className="text-sm text-text-muted mt-1">
          A loss needs a bigger gain to recover: <code>gain = DD / (1 − DD)</code>.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2">
          <div className="w-full aspect-video md:aspect-square relative">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full block">
              {/* Grid */}
              {[0, 1, 2, 3, 4, 5].map(k => {
                const v = y0 + (y1 - y0) * k / 5;
                const yy = y(v);
                return (
                  <g key={`y${k}`}>
                    <line x1={l} y1={yy} x2={W-r} y2={yy} stroke="var(--color-border)" strokeWidth="1" />
                    <text x={l-8} y={yy+3.5} textAnchor="end" fontFamily="monospace" fontSize="10" fill="var(--color-text-muted)">{v.toFixed(0)}%</text>
                  </g>
                );
              })}
              {[0, 1, 2, 3, 4, 5, 6, 7].map(k => {
                const v = x0 + (x1 - x0) * k / 7;
                return (
                  <text key={`x${k}`} x={x(v)} y={H-12} textAnchor="middle" fontFamily="monospace" fontSize="10" fill="var(--color-text-muted)">{Math.round(v*100)}%</text>
                );
              })}
              
              <path d={pathD} fill="none" stroke="var(--color-bear)" strokeWidth="2.2" />
              
              <circle cx={x(0.2)} cy={y(fn(0.2))} r="3.6" fill="var(--color-bear)" />
              <text x={x(0.2)} y={y(fn(0.2))-9} textAnchor="middle" fontFamily="monospace" fontSize="10" fill="var(--color-text)" fontWeight="600">20→25%</text>
              
              <circle cx={x(0.5)} cy={y(Math.min(y1, fn(0.5)))} r="3.6" fill="var(--color-bear)" />
              <text x={x(0.5)} y={y(Math.min(y1, fn(0.5)))-9} textAnchor="middle" fontFamily="monospace" fontSize="10" fill="var(--color-text)" fontWeight="600">50→100%</text>
              
              <text x={l} y={H-1} fontFamily="monospace" fontSize="10" fill="var(--color-text-muted)">drawdown →</text>
            </svg>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <table className="w-full text-right text-sm font-mono border-collapse">
            <thead>
              <tr>
                <th className="text-left py-2 px-3 text-text-muted font-medium uppercase tracking-wider border-b border-border text-xs">Drawdown</th>
                <th className="py-2 px-3 text-text-muted font-medium uppercase tracking-wider border-b border-border text-xs">Gain to recover</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(dd => {
                const g = dd / (1 - dd) * 100;
                return (
                  <tr key={dd} className="border-b border-border/50">
                    <td className="text-left py-2 px-3 text-text">{Math.round(dd * 100)}%</td>
                    <td className={`py-2 px-3 ${dd >= 0.5 ? 'text-bear font-bold' : 'text-text'}`}>
                      +{g.toFixed(g < 100 ? 1 : 0)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          <div className="mt-6 border-l-2 border-bear bg-bear/5 p-3 rounded-r text-sm text-text-muted leading-relaxed">
            <b className="text-xs font-mono text-bear uppercase tracking-wider block mb-1">Takeaway</b>
            Losing 50% requires a <span className="text-bear font-bold">+100%</span> gain to get back to even. Protect the downside first; the upside takes care of itself.
          </div>
        </div>
      </div>
    </div>
  );
};
