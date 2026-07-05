import type { ChartData } from '../../features/kb/content/chartRegistry';

interface AnnotatedChartProps {
  title?: string;
  showSwingHL?: boolean;
  showBOS?: boolean;
  showCHoCH?: boolean;
  showOB?: boolean;
  showFVG?: boolean;
  showSweep?: boolean;
  keyLevelLabel?: string;
  keyLevelY?: number;
  chartData?: ChartData;
}

export function AnnotatedChart({
  title,
  showSwingHL = false,
  showBOS = false,
  showCHoCH = false,
  showOB = false,
  showFVG = false,
  showSweep = false,
  keyLevelLabel,
  keyLevelY,
  chartData,
}: AnnotatedChartProps) {
  
  if (chartData && !Array.isArray(chartData) && chartData.c && Array.isArray(chartData.c)) {
    const W = 600;
    const H = 340;
    const xL = 46;
    const xR = 524;
    const yT = 30;
    const yB = 300;

    const n = chartData.c.length;
    const step = (xR - xL) / n;
    const cw = step * 0.58;
    const hasOsc = Array.isArray(chartData.osc);
    const priceBot = hasOsc ? 206 : yB;
    const oscTop = 226;
    const oscBot = 296;
    const oMin = chartData.oscMin ?? 0;
    const oMax = chartData.oscMax ?? 100;
    
    const y = (p: number) => yT + (chartData.pMax - p) / (chartData.pMax - chartData.pMin) * (priceBot - yT);
    const yo = (v: number) => oscTop + (oMax - v) / (oMax - oMin) * (oscBot - oscTop);
    const x = (i: number) => xL + step * (i + 0.5);

    const getColorVar = (c?: string) => {
      switch (c) {
        case 'bull': return 'var(--color-bull)';
        case 'bear': return 'var(--color-bear)';
        case 'warn': return 'var(--color-warn)';
        case 'muted': return 'var(--color-text-muted)';
        case 'ok': return 'var(--color-ok)';
        case 'ema': return 'var(--color-ema)';
        case 'ema50': return '#A78BFA';
        case 'accent2': return '#60A5FA';
        case 'accent': return 'var(--color-accent)';
        default: return 'var(--color-accent)';
      }
    };

    const ticks = 5;
    const gridLines = [];
    for (let k = 0; k <= ticks; k++) {
      const p = chartData.pMin + (chartData.pMax - chartData.pMin) * k / ticks;
      const yy = y(p);
      gridLines.push(
        <g key={`grid-${k}`}>
          <line x1={xL} y1={yy} x2={xR} y2={yy} stroke="#1f1f1f" strokeWidth="1" />
          <text x={xR + 8} y={yy + 3.5} fontFamily="var(--font-mono)" fontSize="10" fill="#5A5A5A">{p.toFixed(0)}</text>
        </g>
      );
    }

    return (
      <div className="bg-bg-base border border-border rounded-lg overflow-hidden my-6 shadow-sm">
        <div className="p-5 border-b border-border">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold text-text">{chartData.title}</h3>
            <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">{chartData.sub}</span>
          </div>
          <p className="text-text-muted text-sm leading-relaxed mb-6">{chartData.def}</p>
          
          <div className="flex justify-center border border-border bg-panel rounded-lg overflow-hidden mb-6 relative">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[600px]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id={`ah-${chartData.id}`} markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="context-stroke" />
                </marker>
              </defs>

              {/* Price Grid */}
              {gridLines}
              
              {/* Annotations UNDER candles (zones, levels) */}
              {(chartData.a || []).map((an: any, idx: number) => {
                if (an.t === 'zone' && an.p1 !== undefined && an.p2 !== undefined) {
                  const cVar = getColorVar(an.color);
                  const yTop = y(Math.max(an.p1, an.p2));
                  const h = Math.abs(y(an.p1) - y(an.p2));
                  return (
                    <g key={`au-${idx}`}>
                      <rect x={xL} y={yTop} width={xR - xL} height={h} fill={cVar} fillOpacity="0.12" stroke={cVar} strokeOpacity="0.5" strokeWidth="1" />
                      {an.label && <text x={xL + 7} y={yTop + 13} fontFamily="var(--font-mono)" fontSize="10.5" fill={cVar} fontWeight="600">{an.label}</text>}
                    </g>
                  );
                }
                if (an.t === 'level' && an.p !== undefined) {
                  const cVar = getColorVar(an.color);
                  const yy = y(an.p);
                  return (
                    <g key={`au-${idx}`}>
                      <line x1={xL} y1={yy} x2={xR} y2={yy} stroke={cVar} strokeWidth="1.4" strokeDasharray={an.dash ? "5,4" : "none"} />
                      {an.label && <text x={xL + 7} y={yy - 5} fontFamily="var(--font-mono)" fontSize="10.5" fill={cVar} fontWeight="600">{an.label}</text>}
                    </g>
                  );
                }
                return null;
              })}

              {/* Candles */}
              {chartData.c.map((k, i) => {
                const [o, h, l, cl] = k;
                const isBull = cl >= o;
                const cVar = isBull ? 'var(--color-bull)' : 'var(--color-bear)';
                const cx = x(i);
                const yo = y(o);
                const yc = y(cl);
                const bt = Math.min(yo, yc);
                const bh = Math.max(1.5, Math.abs(yc - yo));
                return (
                  <g key={`c-${i}`}>
                    <line x1={cx} y1={y(h)} x2={cx} y2={y(l)} stroke={cVar} strokeWidth="1.3" />
                    <rect x={cx - cw / 2} y={bt} width={cw} height={bh} fill={cVar} rx="0.5" />
                  </g>
                );
              })}

              {/* Oscillator Panel */}
              {hasOsc && chartData.osc && (
                <g>
                  <line x1={xL} y1="214" x2={xR} y2="214" stroke="#2A2A2A" strokeWidth="1" />
                  {[oMax, (oMin + oMax) / 2, oMin].map((v: any, i: number) => {
                    const yy = yo(v);
                    return (
                      <g key={`osc-grid-${i}`}>
                        <line x1={xL} y1={yy} x2={xR} y2={yy} stroke="#1a1a1a" strokeWidth="1" />
                        <text x={xR + 8} y={yy + 3} fontFamily="var(--font-mono)" fontSize="9" fill="#4a4a4a">{v.toFixed(0)}</text>
                      </g>
                    );
                  })}
                  <polyline
                    points={chartData.osc.map((v: any, i: number) => `${x(i)},${yo(v)}`).join(' ')}
                    fill="none" stroke="#60A5FA" strokeWidth="1.8"
                  />
                  <text x={xL + 2} y="211" fontFamily="var(--font-mono)" fontSize="9" fill="#5A5A5A">{chartData.oscLabel || 'RSI'}</text>
                </g>
              )}

              {/* Annotations OVER candles */}
              {(chartData.a || []).map((an: any, idx: number) => {
                const cVar = getColorVar(an.color);
                if (an.t === 'curve' && an.pts) {
                  const ptsString = an.pts.map((pt: any) => `${x(pt.i)},${y(pt.p)}`).join(" ");
                  const firstPt = an.pts[0];
                  return (
                    <g key={`ao-${idx}`}>
                      <polyline points={ptsString} fill="none" stroke={cVar} strokeWidth={an.w || 2} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={an.dash ? String(an.dash) : "none"} />
                      {an.label && firstPt && <text x={x(firstPt.i) + 3} y={y(firstPt.p) - 5} fontFamily="var(--font-mono)" fontSize="9.5" fill={cVar} fontWeight="600">{an.label}</text>}
                    </g>
                  );
                }
                if (an.t === 'trend2' && an.a && an.b) {
                  const yy = (v: number) => an.panel === 'osc' ? yo(v) : y(v);
                  const ax = x(an.a.i), ay = yy(an.a.v);
                  const bx = x(an.b.i), by = yy(an.b.v);
                  const mx = (ax + bx) / 2;
                  const my = (ay + by) / 2;
                  return (
                    <g key={`ao-${idx}`}>
                      <line x1={ax} y1={ay} x2={bx} y2={by} stroke={cVar} strokeWidth="1.6" strokeDasharray="5,3" />
                      <circle cx={ax} cy={ay} r="2.6" fill={cVar} />
                      <circle cx={bx} cy={by} r="2.6" fill={cVar} />
                      <text x={mx} y={my - 6} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill={cVar} fontWeight="600">{an.label}</text>
                    </g>
                  );
                }
                if (an.t === 'swing' && an.i !== undefined && an.p !== undefined) {
                  const cx = x(an.i);
                  const yy = y(an.p);
                  const isUp = an.dir === 'up';
                  const ty = isUp ? yy - 9 : yy + 9;
                  const tri = isUp ? `${cx - 4},${ty} ${cx + 4},${ty} ${cx},${ty + 5}` : `${cx - 4},${ty} ${cx + 4},${ty} ${cx},${ty - 5}`;
                  return (
                    <g key={`ao-${idx}`}>
                      <polygon points={tri} fill="var(--color-text-muted)" />
                      {an.label && <text x={cx} y={isUp ? ty - 4 : ty + 12} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#B5B5B5" fontWeight="600">{an.label}</text>}
                    </g>
                  );
                }
                if (an.t === 'arrow' && an.i !== undefined && an.p1 !== undefined && an.p2 !== undefined) {
                  const cx = x(an.i);
                  const y1 = y(an.p1);
                  const y2 = y(an.p2);
                  const above = y2 < y1;
                  const bw = Math.max(40, (an.label?.length || 0) * 6.4 + 14);
                  let bx = cx - bw / 2;
                  bx = Math.max(xL, Math.min(bx, xR - bw));
                  const by = above ? y2 - 18 : y2 + 4;
                  return (
                    <g key={`ao-${idx}`}>
                      <line x1={cx} y1={y1} x2={cx} y2={y2} stroke={cVar} strokeWidth="2" markerEnd={`url(#ah-${chartData.id})`} />
                      {an.label && (
                        <g>
                          <rect x={bx} y={by} width={bw} height="15" rx="3" fill={cVar} />
                          <text x={bx + bw / 2} y={by + 11} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#0b0b0b" fontWeight="700">{an.label}</text>
                        </g>
                      )}
                    </g>
                  );
                }
                if (an.t === 'bracket' && an.i1 !== undefined && an.i2 !== undefined) {
                  const x1 = x(an.i1) - cw / 2 - 2;
                  const x2 = x(an.i2) + cw / 2 + 2;
                  const yy = yT + 8;
                  const warn = 'var(--color-warn)';
                  return (
                    <g key={`ao-${idx}`}>
                      <path d={`M${x1},${yy} L${x1},${yy - 5} L${x2},${yy - 5} L${x2},${yy}`} fill="none" stroke={warn} strokeWidth="1.2" />
                      {an.label && <text x={(x1 + x2) / 2} y={yy - 9} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill={warn}>{an.label}</text>}
                    </g>
                  );
                }
                if (an.t === 'entries' && an.pts) {
                  const bear = 'var(--color-bear)';
                  const topPt = an.pts.reduce((a: any, b: any) => y(b.p) < y(a.p) ? b : a);
                  let lx = x(topPt.i);
                  lx = Math.max(xL + 40, Math.min(lx, xR - 40));
                  return (
                    <g key={`ao-${idx}`}>
                      {an.pts.map((pt: any, j: number) => (
                        <circle key={j} cx={x(pt.i)} cy={y(pt.p)} r="3.2" fill={bear} stroke="var(--color-bg-base)" strokeWidth="1.2" />
                      ))}
                      {an.label && <text x={lx} y={y(topPt.p) - 9} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill={bear} fontWeight="700">{an.label}</text>}
                    </g>
                  );
                }
                return null;
              })}

              <text x={W - 10} y={H - 10} fill="var(--color-text-muted)" fontSize="8" textAnchor="end" fontFamily="var(--font-mono)" opacity="0.4">ApexVoid Analytics</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-mono text-xs text-text-muted mb-3 tracking-wider">HOW TO READ</h4>
              <ul className="text-sm space-y-2">
                {chartData.read.map((r: any, i: number) => (
                  <li key={i} className="flex gap-2 text-text-muted">
                    <span className="text-accent flex-shrink-0">•</span>
                    <span dangerouslySetInnerHTML={{ __html: r }} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-warn/10 border border-warn/20 p-4 rounded-md h-fit">
              <h4 className="font-mono text-xs text-warn mb-2 tracking-wider">TRAP</h4>
              <p className="text-sm text-text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: chartData.trap }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Fallback Mode for basic MDX usage ---
  return (
    <div className="bg-bg-base border border-border rounded-lg overflow-hidden my-6">
      {title && (
        <div className="px-4 py-2 border-b border-border">
          <span className="text-sm font-mono text-text-muted">{title}</span>
        </div>
      )}
      <div className="p-4 flex justify-center">
        <svg viewBox="0 0 520 320" className="w-full max-w-[520px]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="chart-grid-fallback" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="2,2" />
            </pattern>
            <marker id="arrowhead-fallback" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="var(--color-warn)" />
            </marker>
          </defs>
          <rect width="100%" height="100%" fill="url(#chart-grid-fallback)" rx="4" />

          <line x1="60" y1="60" x2="60" y2="130" stroke="var(--color-bear)" strokeWidth="2" />
          <rect x="50" y="70" width="20" height="50" fill="var(--color-bear)" rx="2" />

          <line x1="110" y1="110" x2="110" y2="210" stroke="var(--color-bear)" strokeWidth="2" />
          <rect x="100" y="120" width="20" height="60" fill="var(--color-bear)" rx="2" />

          <line x1="160" y1="100" x2="160" y2="195" stroke="var(--color-bull)" strokeWidth="2" />
          <rect x="150" y="110" width="20" height="75" fill="var(--color-bull)" rx="2" />

          <line x1="210" y1="40" x2="210" y2="120" stroke="var(--color-bull)" strokeWidth="2" />
          <rect x="200" y="50" width="20" height="60" fill="var(--color-bull)" rx="2" />

          <line x1="260" y1="55" x2="260" y2="140" stroke="var(--color-bear)" strokeWidth="2" />
          <rect x="250" y="65" width="20" height="65" fill="var(--color-bear)" rx="2" />

          <line x1="310" y1="25" x2="310" y2="110" stroke="var(--color-bull)" strokeWidth="2" />
          <rect x="300" y="35" width="20" height="65" fill="var(--color-bull)" rx="2" />

          <line x1="360" y1="15" x2="360" y2="80" stroke="var(--color-bull)" strokeWidth="2" />
          <rect x="350" y="22" width="20" height="48" fill="var(--color-bull)" rx="2" />

          {showSwingHL && (
            <>
              <circle cx="110" cy="210" r="4" fill="var(--color-bear)" />
              <text x="110" y="230" fill="var(--color-text)" fontSize="11" textAnchor="middle" fontFamily="var(--font-mono)">Swing Low</text>
              <circle cx="210" cy="40" r="4" fill="var(--color-bull)" />
              <text x="210" y="30" fill="var(--color-text)" fontSize="11" textAnchor="middle" fontFamily="var(--font-mono)">Swing High</text>
            </>
          )}

          {showSweep && (
            <>
              <path d="M 90 210 C 100 230, 120 230, 130 210" fill="none" stroke="var(--color-warn)" strokeWidth="2" markerEnd="url(#arrowhead-fallback)" />
              <text x="110" y="250" fill="var(--color-warn)" fontSize="11" textAnchor="middle" fontFamily="var(--font-mono)">Liquidity Sweep</text>
            </>
          )}

          {showOB && (
            <>
              <rect x="90" y="120" width="190" height="60" fill="var(--color-bear)" fillOpacity="0.15" stroke="var(--color-bear)" strokeWidth="1" strokeDasharray="4,4" rx="3" />
              <text x="285" y="155" fill="var(--color-text)" fontSize="11" fontFamily="var(--font-mono)">+OB</text>
            </>
          )}

          {showFVG && (
            <>
              <rect x="140" y="110" width="80" height="10" fill="var(--color-bull)" fillOpacity="0.2" rx="2" />
              <text x="225" y="118" fill="var(--color-text)" fontSize="11" fontFamily="var(--font-mono)">FVG</text>
            </>
          )}

          {showBOS && (
            <>
              <line x1="50" y1="60" x2="380" y2="60" stroke="var(--color-text)" strokeWidth="1.5" strokeDasharray="6,4" />
              <text x="390" y="65" fill="var(--color-text)" fontSize="11" fontFamily="var(--font-mono)">BOS ↑</text>
            </>
          )}

          {showCHoCH && (
            <>
              <line x1="100" y1="120" x2="380" y2="120" stroke="var(--color-warn)" strokeWidth="1.5" strokeDasharray="6,4" />
              <text x="390" y="125" fill="var(--color-warn)" fontSize="11" fontFamily="var(--font-mono)">CHoCH</text>
            </>
          )}

          {keyLevelLabel && keyLevelY !== undefined && (
            <>
              <line x1="0" y1={keyLevelY} x2="520" y2={keyLevelY} stroke="var(--color-accent)" strokeWidth="1.5" />
              <rect x="6" y={keyLevelY - 16} width={keyLevelLabel.length * 7.5 + 12} height="14" fill="var(--color-accent)" fillOpacity="0.15" rx="2" />
              <text x="12" y={keyLevelY - 6} fill="var(--color-accent)" fontSize="11" fontFamily="var(--font-mono)">{keyLevelLabel}</text>
            </>
          )}

          <text x="510" y="310" fill="var(--color-text-muted)" fontSize="8" textAnchor="end" fontFamily="var(--font-mono)" opacity="0.4">educational illustration</text>
        </svg>
      </div>
    </div>
  );
}
