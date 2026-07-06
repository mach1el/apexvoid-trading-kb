import { Quiz } from './Quiz';
import { AnnotatedChart } from '../../../shared/components/AnnotatedChart';
import { chartRegistry } from '../content/chartRegistry';

export function SweepSpotter() {
  return (
    <Quiz
      question="Is this a genuine breakout or a liquidity sweep?"
      options={[
        {
          id: 'breakout',
          label: 'Genuine Breakout',
          isCorrect: false,
          explanation: 'Look closely at the candle close. Although it pushed above the level, the body closed back inside the range, leaving a long wick.'
        },
        {
          id: 'sweep',
          label: 'Liquidity Sweep',
          isCorrect: true,
          explanation: 'Correct! The long wick piercing the resistance but failing to close above it is the classic signature of a sweep (or stop hunt). Smart money took the buy-side liquidity before reversing.'
        }
      ]}
    >
      <AnnotatedChart chartData={chartRegistry.SWEEP} />
    </Quiz>
  );
}
