import { useState } from 'react';

export function EMAPlayground() {
  const [show50, setShow50] = useState(true);
  const [show200, setShow200] = useState(true);

  // Simulated data for a transition from downtrend to uptrend
  const pMin = 80;
  const pMax = 180;
  
  const generateData = () => {
    const data = [];
    for (let i = 0; i < 40; i++) {
      let p = 120 - Math.sin(i * 0.15) * 30 + (i * 1.5) - 20;
      if (i > 25) p += (i - 25) * 2;
      
      let ema50 = 130 - Math.sin(i * 0.12) * 20 + i * 0.8 - 15;
      
      let ema200 = 140 - i * 0.2;
      if (i > 30) ema200 += (i - 30) * 0.5;

      data.push({ i, p, ema50, ema200 });
    }
    return data;
  };

  const data = generateData();

  const last = data[data.length - 1];
  let state = 'Mixed / Choppy';
  let stateColor = 'text-warn';
  
  if (last.p > last.ema50 && last.ema50 > last.ema200) {
    state = 'Bullish Stack (P > 50 > 200)';
    stateColor = 'text-bull';
  } else if (last.p < last.ema50 && last.ema50 < last.ema200) {
    state = 'Bearish Stack (P < 50 < 200)';
    stateColor = 'text-bear';
  }

  const svgWidth = 600;
  const svgHeight = 300;
  const paddingL = 20;
  const paddingR = 70;
  const paddingY = 30;
  const drawW = svgWidth - paddingL - paddingR;
  const drawH = svgHeight - paddingY * 2;
  
  const x = (i: number) => paddingL + (i / 39) * drawW;
  const y = (val: number) => svgHeight - paddingY - ((val - pMin) / (pMax - pMin)) * drawH;

  const linePath = (key: 'p' | 'ema50' | 'ema200') => {
    return data.map((d, idx) => `${idx === 0 ? 'M' : 'L'} ${x(d.i)} ${y(d[key])}`).join(' ');
  };

  return (
    <div className="border border-border bg-bg-base rounded-xl overflow-hidden my-6">
      <div className="p-4 border-b border-border flex justify-between items-center bg-bg-elevated">
        <h3 className="m-0 text-lg font-bold">EMA Stack Playground</h3>
        <div className={`font-mono text-sm px-3 py-1 rounded bg-panel border border-border ${stateColor}`}>
          State: {state}
        </div>
      </div>
      
      <div className="p-4 bg-panel">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full">
          <defs>
            <pattern id="grid-ema" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="2,2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-ema)" rx="4" />
          
          {show200 && <path d={linePath('ema200')} fill="none" stroke="var(--color-ema)" strokeWidth="3" />}
          {show50 && <path d={linePath('ema50')} fill="none" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4,2" />}
          <path d={linePath('p')} fill="none" stroke="var(--color-text)" strokeWidth="2" />
          
          {data.map((d, i) => <circle key={i} cx={x(d.i)} cy={y(d.p)} r="2" fill="var(--color-text)" />)}

          {show200 && <text x={x(39) + 8} y={y(last.ema200) + 4} fill="var(--color-ema)" fontSize="12" fontFamily="var(--font-mono)">EMA 200</text>}
          {show50 && <text x={x(39) + 8} y={y(last.ema50) + 4} fill="#8B5CF6" fontSize="12" fontFamily="var(--font-mono)">EMA 50</text>}
          <text x={x(39) + 8} y={y(last.p) + 4} fill="var(--color-text)" fontSize="12" fontFamily="var(--font-mono)">Price</text>
        </svg>
      </div>

      <div className="p-4 border-t border-border flex gap-4 justify-center bg-bg-elevated">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={show50} 
            onChange={(e) => setShow50(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <span className="text-sm font-mono" style={{ color: '#8B5CF6' }}>Toggle 50 EMA</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={show200} 
            onChange={(e) => setShow200(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <span className="text-sm font-mono text-ema">Toggle 200 EMA</span>
        </label>
      </div>
    </div>
  );
}
