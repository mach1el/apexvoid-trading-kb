interface Annotation {
  t: 'swing' | 'zone' | 'level' | 'arrow';
  i?: number;
  p?: number;
  p1?: number;
  p2?: number;
  dir?: 'up' | 'down';
  color?: 'bull' | 'bear' | 'warn' | 'muted' | 'accent' | 'ok' | 'ema';
  label?: string;
  dash?: number;
}

interface ChartData {
  id: string;
  title: string;
  sub: string;
  def: string;
  read: string[];
  trap: string;
  pMin: number;
  pMax: number;
  c: [number, number, number, number][];
  a: Annotation[];
}

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
  
  if (chartData) {
    const padding = 40;
    const svgWidth = 520;
    const svgHeight = 320;
    const drawWidth = svgWidth - padding * 2;
    const drawHeight = svgHeight - padding * 2;
    
    const { pMin, pMax, c, a } = chartData;
    const range = pMax - pMin;
    
    const y = (val: number) => svgHeight - padding - ((val - pMin) / range) * drawHeight;
    const spacing = drawWidth / c.length;
    const candleWidth = Math.min(20, spacing * 0.6);
    const x = (idx: number) => padding + (idx + 0.5) * spacing;

    return (
      <div className="bg-bg-base border border-border rounded-lg overflow-hidden my-6 shadow-sm">
        <div className="p-5 border-b border-border">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold text-text">{chartData.title}</h3>
            <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">{chartData.sub}</span>
          </div>
          <p className="text-text-muted text-sm leading-relaxed mb-6">{chartData.def}</p>
          
          <div className="flex justify-center border border-border bg-panel rounded-lg overflow-hidden mb-6 relative">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full max-w-[520px]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`grid-${chartData.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="2,2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${chartData.id})`} rx="4" />
              
              {/* Candles */}
              {c.map((candle, idx) => {
                const [O, H, L, C] = candle;
                const isBull = C >= O;
                const color = isBull ? 'var(--color-bull)' : 'var(--color-bear)';
                const cx = x(idx);
                const cyHigh = y(H);
                const cyLow = y(L);
                const cyTop = y(Math.max(O, C));
                const cyBottom = y(Math.min(O, C));
                const bodyHeight = Math.max(2, cyBottom - cyTop);
                
                return (
                  <g key={`c-${idx}`}>
                    <line x1={cx} y1={cyHigh} x2={cx} y2={cyLow} stroke={color} strokeWidth="2" />
                    <rect x={cx - candleWidth/2} y={cyTop} width={candleWidth} height={bodyHeight} fill={color} rx="1" />
                  </g>
                );
              })}

              {/* Annotations */}
              {a.map((ann, idx) => {
                const getColorVar = (c?: string) => {
                  switch (c) {
                    case 'bull': return 'var(--color-bull)';
                    case 'bear': return 'var(--color-bear)';
                    case 'warn': return 'var(--color-warn)';
                    case 'muted': return 'var(--color-text-muted)';
                    case 'ok': return 'var(--color-ok)';
                    case 'ema': return 'var(--color-ema)';
                    case 'accent': return 'var(--color-accent)';
                    default: return 'var(--color-accent)';
                  }
                };
                const colorVar = getColorVar(ann.color);
                
                if (ann.t === 'swing' && ann.i !== undefined && ann.p !== undefined) {
                  const cx = x(ann.i);
                  const cy = y(ann.p);
                  const isUp = ann.dir === 'up';
                  return (
                    <g key={`a-${idx}`}>
                      <circle cx={cx} cy={cy} r="4" fill={colorVar} />
                      {ann.label && (
                        <text x={cx} y={isUp ? cy - 10 : cy + 18} fill="var(--color-text)" fontSize="11" textAnchor="middle" fontFamily="var(--font-mono)">
                          {ann.label}
                        </text>
                      )}
                    </g>
                  );
                }
                
                if (ann.t === 'zone' && ann.p1 !== undefined && ann.p2 !== undefined) {
                  const yTop = y(Math.max(ann.p1, ann.p2));
                  const yBot = y(Math.min(ann.p1, ann.p2));
                  const h = Math.abs(yBot - yTop);
                  return (
                    <g key={`a-${idx}`}>
                      <rect x={padding} y={yTop} width={drawWidth} height={h} fill={colorVar} fillOpacity="0.15" stroke={colorVar} strokeWidth="1" strokeDasharray="4,4" rx="3" />
                      {ann.label && (
                        <text x={svgWidth - padding - 5} y={yTop + h/2 + 4} fill="var(--color-text)" fontSize="11" textAnchor="end" fontFamily="var(--font-mono)">
                          {ann.label}
                        </text>
                      )}
                    </g>
                  );
                }
                
                if (ann.t === 'level' && ann.p !== undefined) {
                  const cy = y(ann.p);
                  return (
                    <g key={`a-${idx}`}>
                      <line x1={padding/2} y1={cy} x2={svgWidth - padding/2} y2={cy} stroke={colorVar} strokeWidth="1.5" strokeDasharray={ann.dash ? "6,4" : "none"} />
                      {ann.label && (
                        <g>
                          <rect x={padding/2 + 5} y={cy - 14} width={ann.label.length * 7.5 + 12} height="14" fill={colorVar} fillOpacity="0.15" rx="2" />
                          <text x={padding/2 + 11} y={cy - 4} fill={colorVar} fontSize="11" fontFamily="var(--font-mono)">{ann.label}</text>
                        </g>
                      )}
                    </g>
                  );
                }
                
                if (ann.t === 'arrow' && ann.i !== undefined && ann.p1 !== undefined && ann.p2 !== undefined) {
                  const cx = x(ann.i);
                  const cy1 = y(ann.p1);
                  const cy2 = y(ann.p2);
                  const isUp = cy2 < cy1;
                  return (
                    <g key={`a-${idx}`}>
                      <line x1={cx} y1={cy1} x2={cx} y2={cy2} stroke={colorVar} strokeWidth="2" />
                      <polygon points={isUp ? `${cx},${cy2} ${cx-4},${cy2+6} ${cx+4},${cy2+6}` : `${cx},${cy2} ${cx-4},${cy2-6} ${cx+4},${cy2-6}`} fill={colorVar} />
                      {ann.label && (
                        <text x={cx + 10} y={cy2 + (isUp ? 8 : -4)} fill={colorVar} fontSize="11" fontFamily="var(--font-mono)">{ann.label}</text>
                      )}
                    </g>
                  );
                }
                return null;
              })}

              <text x={svgWidth - 10} y={svgHeight - 10} fill="var(--color-text-muted)" fontSize="8" textAnchor="end" fontFamily="var(--font-mono)" opacity="0.4">ApexVoid Analytics</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-mono text-xs text-text-muted mb-3 tracking-wider">HOW TO READ</h4>
              <ul className="text-sm space-y-2">
                {chartData.read.map((r, i) => (
                  <li key={i} className="flex gap-2 text-text-muted">
                    <span className="text-accent flex-shrink-0">•</span>
                    <span dangerouslySetInnerHTML={{ __html: r }} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-warn/10 border border-warn/20 p-4 rounded-md h-fit">
              <h4 className="font-mono text-xs text-warn mb-2 tracking-wider">TRAP</h4>
              <p className="text-sm text-text-muted leading-relaxed">{chartData.trap}</p>
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
