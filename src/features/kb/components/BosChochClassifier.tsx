import type { FC } from 'react';
import { Quiz } from './Quiz';

export const BosChochClassifier: FC = () => {
  return (
    <Quiz
      question="Look at the structure break above. Is this a Break of Structure (BOS) or a Change of Character (CHoCH)?"
      options={[
        {
          id: 'bos',
          label: 'BOS (Trend Continuation)',
          isCorrect: false,
          explanation: 'Incorrect. A BOS requires the macro trend to continue in its prevailing direction (e.g., breaking a lower low in a downtrend). Here, the price broke a lower high, signaling a reversal.'
        },
        {
          id: 'choch',
          label: 'CHoCH (Trend Reversal)',
          isCorrect: true,
          explanation: 'Correct! The market was in a downtrend (making lower lows and lower highs). By breaking above the most recent lower high, the character of the market shifted from bearish to bullish.'
        },
        {
          id: 'sweep',
          label: 'Liquidity Sweep',
          isCorrect: false,
          explanation: 'Incorrect. A sweep occurs when price pierces a level with a wick and immediately rejects back below it. In this scenario, the candle body closed firmly above the structural high, confirming the shift.'
        }
      ]}
    >
      <div className="flex justify-center p-4 bg-bg-surface rounded border border-border">
        <svg viewBox="0 0 400 200" className="w-full max-w-md h-auto">
          {/* Downtrend */}
          <path d="M 50 50 L 100 120 L 150 80 L 200 160 L 250 100" fill="none" stroke="var(--color-bear)" strokeWidth="3" />
          
          {/* CHoCH Break */}
          <path d="M 250 100 L 280 170 L 350 70" fill="none" stroke="var(--color-bull)" strokeWidth="3" />
          
          {/* The broken Lower High */}
          <line x1="230" y1="100" x2="380" y2="100" stroke="var(--color-text)" strokeWidth="2" strokeDasharray="4,4" />
          <text x="370" y="90" fill="var(--color-text)" fontSize="12" fontWeight="bold" textAnchor="end">CHoCH</text>
          
          {/* Labels */}
          <text x="100" y="135" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle">LL</text>
          <text x="150" y="70" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle">LH</text>
          <text x="200" y="175" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle">LL</text>
          <text x="250" y="90" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle">LH</text>
        </svg>
      </div>
    </Quiz>
  );
};
