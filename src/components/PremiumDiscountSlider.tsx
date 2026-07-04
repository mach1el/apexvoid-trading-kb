import { useState, type FC } from 'react';

export const PremiumDiscountSlider: FC = () => {
  const [showFib, setShowFib] = useState(false);

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-text m-0">Interactive: Premium vs Discount</h3>
        <button 
          onClick={() => setShowFib(!showFib)}
          className={`px-4 py-1.5 rounded border font-medium transition-colors ${
            showFib 
              ? 'border-warn bg-warn/20 text-warn hover:bg-warn/30' 
              : 'border-accent bg-accent/20 text-accent hover:bg-accent/30'
          }`}
        >
          {showFib ? 'Hide PD Array' : 'Draw PD Array'}
        </button>
      </div>
      <p className="text-sm text-text-muted mb-4 self-start">
        Toggle the array to split the swing leg in half. Notice how the retracement dips perfectly into the "Discount" zone before continuing higher. Institutions refuse to buy in Premium.
      </p>

      <div className="relative w-full max-w-lg overflow-hidden rounded-lg bg-bg-elevated border border-border p-4 h-[320px] flex items-center justify-center">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* Static Background / Grid */}
          <defs>
            <pattern id="grid-pd" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" className="text-border" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="400" height="300" fill="url(#grid-pd)" />

          {/* The PD Array Overlay (renders behind candles for visibility) */}
          {showFib && (
            <g className="animate-in fade-in duration-500">
              {/* Premium Zone (Red/Bearish) */}
              <rect x="20" y="50" width="360" height="95" fill="var(--color-bear)" opacity="0.15" />
              <text x="370" y="100" fill="var(--color-bear)" fontSize="12" fontWeight="bold" textAnchor="end">PREMIUM (SELL)</text>
              
              {/* Equilibrium Line */}
              <line x1="20" y1="145" x2="380" y2="145" stroke="var(--color-text)" strokeWidth="1.5" strokeDasharray="5,5" />
              <text x="25" y="141" fill="var(--color-text)" fontSize="10" fontFamily="monospace">EQ (50%)</text>
              
              {/* Discount Zone (Green/Bullish) */}
              <rect x="20" y="145" width="360" height="95" fill="var(--color-bull)" opacity="0.15" />
              <text x="370" y="230" fill="var(--color-bull)" fontSize="12" fontWeight="bold" textAnchor="end">DISCOUNT (BUY)</text>
              
              {/* OTE Band */}
              <rect x="20" y="167.8" width="360" height="32.3" fill="var(--color-accent)" opacity="0.3" />
              <text x="25" y="185" fill="var(--color-accent)" fontSize="10" fontWeight="bold">OTE (62% - 79%)</text>

              {/* Fibonacci Anchor Lines */}
              <line x1="20" y1="50" x2="380" y2="50" stroke="var(--color-bear)" strokeWidth="1" />
              <text x="25" y="46" fill="var(--color-bear)" fontSize="10" fontFamily="monospace">Swing High (0%)</text>
              
              <line x1="20" y1="240" x2="380" y2="240" stroke="var(--color-bull)" strokeWidth="1" />
              <text x="25" y="236" fill="var(--color-bull)" fontSize="10" fontFamily="monospace">Swing Low (100%)</text>
            </g>
          )}

          {/* The Candles */}
          <g>
            {/* The Impulse Leg Up */}
            <line x1="60" y1="190" x2="60" y2="250" stroke="var(--color-text)" strokeWidth="2" />
            <rect x="50" y="200" width="20" height="40" fill="var(--color-bull)" />
            
            <line x1="100" y1="120" x2="100" y2="210" stroke="var(--color-text)" strokeWidth="2" />
            <rect x="90" y="130" width="20" height="70" fill="var(--color-bull)" />
            
            <line x1="140" y1="40" x2="140" y2="150" stroke="var(--color-text)" strokeWidth="2" />
            <rect x="130" y="50" width="20" height="90" fill="var(--color-bull)" />
            
            {/* The Retracement Down */}
            <line x1="180" y1="60" x2="180" y2="120" stroke="var(--color-text)" strokeWidth="2" />
            <rect x="170" y="70" width="20" height="40" fill="var(--color-bear)" />
            
            <line x1="220" y1="100" x2="220" y2="170" stroke="var(--color-text)" strokeWidth="2" />
            <rect x="210" y="110" width="20" height="50" fill="var(--color-bear)" />
            
            {/* The Trap (Dips into OTE) */}
            <line x1="260" y1="140" x2="260" y2="210" stroke="var(--color-text)" strokeWidth="2" />
            <rect x="250" y="150" width="20" height="40" fill="var(--color-bear)" />
            
            {/* The Reversal (Continuation) */}
            <line x1="300" y1="130" x2="300" y2="190" stroke="var(--color-text)" strokeWidth="2" />
            <rect x="290" y="140" width="20" height="40" fill="var(--color-bull)" />
            
            <line x1="340" y1="50" x2="340" y2="160" stroke="var(--color-text)" strokeWidth="2" />
            <rect x="330" y="60" width="20" height="90" fill="var(--color-bull)" />
          </g>

          {/* Markers indicating Swings (always visible) */}
          <circle cx="140" cy="40" r="4" fill="var(--color-text)" />
          <circle cx="60" cy="250" r="4" fill="var(--color-text)" />
        </svg>
      </div>
    </div>
  );
};
