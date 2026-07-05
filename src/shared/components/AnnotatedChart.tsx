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
}: AnnotatedChartProps) {
  return (
    <div className="bg-bg-base border border-border rounded-lg overflow-hidden my-6">
      {title && (
        <div className="px-4 py-2 border-b border-border">
          <span className="text-sm font-mono text-text-muted">{title}</span>
        </div>
      )}
      <div className="p-4 flex justify-center">
        <svg viewBox="0 0 520 320" className="w-full max-w-[520px]" xmlns="http://www.w3.org/2000/svg">
          {/* Grid pattern */}
          <defs>
            <pattern id="chart-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="2,2" />
            </pattern>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="var(--color-warn)" />
            </marker>
          </defs>
          <rect width="100%" height="100%" fill="url(#chart-grid)" rx="4" />

          {/* C1: Bearish — start of down-move */}
          <line x1="60" y1="60" x2="60" y2="130" stroke="var(--color-bear)" strokeWidth="2" />
          <rect x="50" y="70" width="20" height="50" fill="var(--color-bear)" rx="2" />

          {/* C2: Bearish deep — swing low */}
          <line x1="110" y1="110" x2="110" y2="210" stroke="var(--color-bear)" strokeWidth="2" />
          <rect x="100" y="120" width="20" height="60" fill="var(--color-bear)" rx="2" />

          {/* C3: Bullish displacement */}
          <line x1="160" y1="100" x2="160" y2="195" stroke="var(--color-bull)" strokeWidth="2" />
          <rect x="150" y="110" width="20" height="75" fill="var(--color-bull)" rx="2" />

          {/* C4: Bullish BOS candle */}
          <line x1="210" y1="40" x2="210" y2="120" stroke="var(--color-bull)" strokeWidth="2" />
          <rect x="200" y="50" width="20" height="60" fill="var(--color-bull)" rx="2" />

          {/* C5: Bearish retrace to OB */}
          <line x1="260" y1="55" x2="260" y2="140" stroke="var(--color-bear)" strokeWidth="2" />
          <rect x="250" y="65" width="20" height="65" fill="var(--color-bear)" rx="2" />

          {/* C6: Bullish continuation */}
          <line x1="310" y1="25" x2="310" y2="110" stroke="var(--color-bull)" strokeWidth="2" />
          <rect x="300" y="35" width="20" height="65" fill="var(--color-bull)" rx="2" />

          {/* C7: Bullish follow-through */}
          <line x1="360" y1="15" x2="360" y2="80" stroke="var(--color-bull)" strokeWidth="2" />
          <rect x="350" y="22" width="20" height="48" fill="var(--color-bull)" rx="2" />

          {/* === ANNOTATIONS === */}

          {/* Swing High / Low labels */}
          {showSwingHL && (
            <>
              <circle cx="110" cy="210" r="4" fill="var(--color-bear)" />
              <text x="110" y="230" fill="var(--color-text)" fontSize="11" textAnchor="middle" fontFamily="var(--font-mono)">Swing Low</text>
              <circle cx="210" cy="40" r="4" fill="var(--color-bull)" />
              <text x="210" y="30" fill="var(--color-text)" fontSize="11" textAnchor="middle" fontFamily="var(--font-mono)">Swing High</text>
            </>
          )}

          {/* Liquidity Sweep */}
          {showSweep && (
            <>
              <path d="M 90 210 C 100 230, 120 230, 130 210" fill="none" stroke="var(--color-warn)" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <text x="110" y="250" fill="var(--color-warn)" fontSize="11" textAnchor="middle" fontFamily="var(--font-mono)">Liquidity Sweep</text>
            </>
          )}

          {/* Order Block zone */}
          {showOB && (
            <>
              <rect x="90" y="120" width="190" height="60" fill="var(--color-bear)" fillOpacity="0.15" stroke="var(--color-bear)" strokeWidth="1" strokeDasharray="4,4" rx="3" />
              <text x="285" y="155" fill="var(--color-text)" fontSize="11" fontFamily="var(--font-mono)">+OB</text>
            </>
          )}

          {/* FVG zone */}
          {showFVG && (
            <>
              <rect x="140" y="110" width="80" height="10" fill="var(--color-bull)" fillOpacity="0.2" rx="2" />
              <text x="225" y="118" fill="var(--color-text)" fontSize="11" fontFamily="var(--font-mono)">FVG</text>
            </>
          )}

          {/* BOS line */}
          {showBOS && (
            <>
              <line x1="50" y1="60" x2="380" y2="60" stroke="var(--color-text)" strokeWidth="1.5" strokeDasharray="6,4" />
              <text x="390" y="65" fill="var(--color-text)" fontSize="11" fontFamily="var(--font-mono)">BOS ↑</text>
            </>
          )}

          {/* CHoCH line */}
          {showCHoCH && (
            <>
              <line x1="100" y1="120" x2="380" y2="120" stroke="var(--color-warn)" strokeWidth="1.5" strokeDasharray="6,4" />
              <text x="390" y="125" fill="var(--color-warn)" fontSize="11" fontFamily="var(--font-mono)">CHoCH</text>
            </>
          )}

          {/* Key level */}
          {keyLevelLabel && keyLevelY !== undefined && (
            <>
              <line x1="0" y1={keyLevelY} x2="520" y2={keyLevelY} stroke="var(--color-accent)" strokeWidth="1.5" />
              <rect x="6" y={keyLevelY - 16} width={keyLevelLabel.length * 7.5 + 12} height="14" fill="var(--color-accent)" fillOpacity="0.15" rx="2" />
              <text x="12" y={keyLevelY - 6} fill="var(--color-accent)" fontSize="11" fontFamily="var(--font-mono)">{keyLevelLabel}</text>
            </>
          )}

          {/* Disclaimer watermark */}
          <text x="510" y="310" fill="var(--color-text-muted)" fontSize="8" textAnchor="end" fontFamily="var(--font-mono)" opacity="0.4">educational illustration</text>
        </svg>
      </div>
    </div>
  );
}
