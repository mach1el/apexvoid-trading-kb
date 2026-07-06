import { useState } from 'react';
import { AnnotatedChart } from '../../../shared/components/AnnotatedChart';
import { chartRegistry } from '../content/chartRegistry';

export function LiquidityMapper() {
  const [revealed, setRevealed] = useState(false);
  const baseChart = chartRegistry.LIQMAP;
  
  // Filter annotations based on state
  const displayedAnnotations = revealed ? baseChart.a : baseChart.a?.filter(a => a.t !== 'level');

  return (
    <div className="my-8 border border-border bg-bg-elevated rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border bg-bg-base flex justify-between items-center">
        <h4 className="text-lg font-bold text-text m-0">Liquidity Mapper</h4>
        <button 
          onClick={() => setRevealed(!revealed)}
          className="px-4 py-2 bg-accent/10 text-accent hover:bg-accent/20 rounded-md font-medium transition-colors"
        >
          {revealed ? 'Hide Liquidity Pools' : 'Reveal Liquidity Pools'}
        </button>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-text-muted mb-4">
          Where would you expect resting liquidity (stops and pending orders) to be clustered on this chart?
        </p>
        <AnnotatedChart chartData={{ ...baseChart, a: displayedAnnotations }} />
      </div>
    </div>
  );
}
