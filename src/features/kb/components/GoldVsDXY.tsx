import type { FC } from 'react';

export const GoldVsDXY: FC = () => {
  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6">
      <div className="mb-6 flex justify-between items-start flex-col sm:flex-row gap-4 sm:gap-0">
        <div>
          <h3 className="text-lg font-bold text-text m-0">Gold vs DXY (Inverse Correlation)</h3>
          <p className="text-sm text-text-muted mt-1">Observe the historical inverse relationship between Gold (XAUUSD) and the US Dollar Index (DXY).</p>
        </div>
        <div className="flex gap-4 text-xs font-mono text-text">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span> Gold</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-400 inline-block"></span> DXY</div>
        </div>
      </div>
      
      <div className="w-full h-64 bg-bg-elevated border border-border rounded p-4 relative">
        <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="50" x2="500" y2="50" stroke="currentColor" className="text-border" strokeDasharray="4" />
          <line x1="0" y1="100" x2="500" y2="100" stroke="currentColor" className="text-border" strokeDasharray="4" />
          <line x1="0" y1="150" x2="500" y2="150" stroke="currentColor" className="text-border" strokeDasharray="4" />
          
          {/* Gold (Yellow) - Generally up, with some swings */}
          <path d="M 0,150 Q 50,140 100,100 T 200,120 T 300,60 T 400,80 T 500,40" fill="none" stroke="#facc15" strokeWidth="3" className="drop-shadow-sm" />
          
          {/* DXY (Blue) - Generally down, inverse swings to Gold */}
          <path d="M 0,50 Q 50,60 100,100 T 200,80 T 300,140 T 400,120 T 500,160" fill="none" stroke="#60a5fa" strokeWidth="3" className="drop-shadow-sm" />
        </svg>
      </div>
      
      <div className="mt-4 text-sm text-text-muted bg-bg-elevated p-4 rounded border border-border leading-relaxed">
        <strong className="text-text">Macro Note:</strong> Because Gold is priced in US Dollars, a stronger dollar usually makes Gold more expensive for holders of other currencies, decreasing demand and driving the price down (and vice versa). Always check DXY before sizing a Gold position!
      </div>
    </div>
  );
};
