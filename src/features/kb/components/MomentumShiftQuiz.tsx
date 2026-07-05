import { Quiz, type QuizOption } from './Quiz';
import { AnnotatedChart } from '../../../shared/components/AnnotatedChart';

export function MomentumShiftQuiz() {
  const options: QuizOption[] = [
    {
      id: 'a',
      label: 'Confirmed Reversal (Buy immediately)',
      isCorrect: false,
      explanation: 'Price has reclaimed the 200 EMA (momentum shift), but market structure is still forming lower highs and lower lows. A single push is not a confirmed reversal.'
    },
    {
      id: 'b',
      label: 'Momentum Shift (Watch for CHoCH)',
      isCorrect: true,
      explanation: 'Correct! Reclaiming the 200 EMA is an early warning sign that momentum is shifting. However, you must wait for a Change of Character (CHoCH) structure break to confirm the reversal before entering.'
    },
    {
      id: 'c',
      label: 'Trend Continuation (Sell immediately)',
      isCorrect: false,
      explanation: 'Selling directly into rising momentum that just reclaimed the 200 EMA is dangerous. The bearish regime is under threat.'
    }
  ];

  return (
    <Quiz 
      question="Price has just crossed powerfully above the red 200 EMA after a long downtrend, but the previous Swing High remains unbroken. What is the current market state?"
      options={options}
    >
      <AnnotatedChart 
        title="Momentum Shift Example"
        chartData={{
          id: "MQ",
          title: "Early Reclaim",
          sub: "momentum · shift",
          def: "Price crosses the regime filter, but structure is lagging.",
          read: ["Identify the strong candle closing above the 200 EMA."],
          trap: "Assuming every EMA cross is an immediate trend reversal without structural confirmation.",
          pMin: 90,
          pMax: 150,
          c: [
            [140, 142, 135, 138],
            [138, 140, 130, 132],
            [132, 135, 125, 128],
            [128, 130, 120, 122],
            [122, 124, 115, 118],
            [118, 120, 110, 112],
            [112, 115, 105, 108],
            [108, 110, 100, 102], // Swing low
            [102, 115, 100, 114],
            [114, 125, 110, 122],
            [122, 135, 120, 132]  // Reclaim candle
          ],
          a: [
            { t: 'level', p: 138, dash: 1, color: 'muted', label: 'Previous Lower High (Unbroken)' },
            { t: 'level', p: 120, color: 'ema', label: '200 EMA' },
            { t: 'arrow', i: 10, p1: 110, p2: 135, color: 'bull', label: 'Momentum Shift' },
            { t: 'swing', i: 7, p: 100, dir: 'down', label: 'Lower Low' }
          ]
        }}
      />
    </Quiz>
  );
}
