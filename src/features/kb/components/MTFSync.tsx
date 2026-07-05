import { useMemo, type FC } from 'react';
import { ChartCanvas } from './ChartCanvas';
import type { CandlestickData } from 'lightweight-charts';

// Simple deterministic PRNG for stable mock data
const prng = (seed: number) => {
  let s = seed;
  return () => {
    s = s * 16807 % 2147483647;
    return (s - 1) / 2147483646;
  };
};

// Generate 1-minute data
const generateData = (bars: number, startPrice: number, seed: number) => {
  const rand = prng(seed);
  let price = startPrice;
  let time = 1672531200; // 2023-01-01
  const data: CandlestickData[] = [];

  for (let i = 0; i < bars; i++) {
    const volatility = 0.5 + rand() * 1.5;
    const open = price;
    const close = price + (rand() - 0.48) * volatility;
    const high = Math.max(open, close) + rand() * 0.5;
    const low = Math.min(open, close) - rand() * 0.5;
    
    data.push({ time: time as any, open, high, low, close });
    price = close;
    time += 60; // +1 minute
  }
  return data;
};

// Aggregate M1 data into higher timeframes
const aggregateData = (data: CandlestickData[], factor: number) => {
  const aggregated: CandlestickData[] = [];
  for (let i = 0; i < data.length; i += factor) {
    const chunk = data.slice(i, i + factor);
    if (chunk.length === 0) continue;
    
    const open = chunk[0].open;
    const close = chunk[chunk.length - 1].close;
    const high = Math.max(...chunk.map(c => c.high));
    const low = Math.min(...chunk.map(c => c.low));
    
    aggregated.push({ time: chunk[0].time, open, high, low, close });
  }
  return aggregated;
};

export const MTFSync: FC = () => {
  // Generate the 3 timeframes
  const m1Data = useMemo(() => generateData(180, 100, 42), []);
  const m5Data = useMemo(() => aggregateData(m1Data, 5), [m1Data]);
  const m15Data = useMemo(() => aggregateData(m1Data, 15), [m1Data]);

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6">
      <h3 className="text-lg font-bold text-text mb-2">Multiple Timeframe Sync (M15, M5, M1)</h3>
      <p className="text-sm text-text-muted mb-6">
        Hover over any chart to see how one 15-minute candle breaks down into three 5-minute candles, and fifteen 1-minute candles.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <div className="px-3 py-1 bg-bg-elevated border-l-4 border-accent text-sm font-mono text-text mb-2">
            15m (Macro)
          </div>
          <ChartCanvas 
            data={m15Data} 
            height={250} 
          />
        </div>
        <div className="flex flex-col">
          <div className="px-3 py-1 bg-bg-elevated border-l-4 border-warn text-sm font-mono text-text mb-2">
            5m (Intermediate)
          </div>
          <ChartCanvas 
            data={m5Data} 
            height={250} 
          />
        </div>
        <div className="flex flex-col">
          <div className="px-3 py-1 bg-bg-elevated border-l-4 border-ok text-sm font-mono text-text mb-2">
            1m (Micro)
          </div>
          <ChartCanvas 
            data={m1Data} 
            height={250} 
          />
        </div>
      </div>
    </div>
  );
};
