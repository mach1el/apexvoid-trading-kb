import { useState } from 'react';

type Phase = 'accumulation' | 'public' | 'distribution' | 'panic';

interface PhaseData {
  id: Phase;
  title: string;
  description: string;
  participants: string;
  volume: string;
  news: string;
  color: string;
  priceClass: string;
}

const phases: Record<Phase, PhaseData> = {
  accumulation: {
    id: 'accumulation',
    title: 'Phase 1: Accumulation',
    description: 'The market has been beaten down. The general public is depressed and wants nothing to do with the asset. "Smart money" (institutional investors with deep pockets and early information) begin to quietly accumulate shares at discount prices.',
    participants: 'Smart Money / Insiders',
    volume: 'Low but gently rising on up days.',
    news: 'Overwhelmingly negative. "The end of the industry."',
    color: 'bg-accent',
    priceClass: 'border-b-4 border-accent w-1/4 h-12 flex items-end justify-center pb-2 relative top-[80px]'
  },
  public: {
    id: 'public',
    title: 'Phase 2: Public Participation',
    description: 'The asset starts trending upwards. The technical trend-followers jump in. As the trend matures, the business fundamentals clearly improve, and the general public starts noticing.',
    participants: 'Trend Followers → Retail Public',
    volume: 'High and expanding on up days.',
    news: 'Improving. "The unexpected recovery."',
    color: 'bg-ok',
    priceClass: 'border-b-4 border-ok w-1/4 h-32 flex items-start pt-2 justify-center relative -rotate-12 top-[30px]'
  },
  distribution: {
    id: 'distribution',
    title: 'Phase 3: Distribution',
    description: 'The asset has rallied massively. The general public is now euphoric and buying aggressively, assuming the trend will never end. The smart money who bought in Phase 1 begin quietly selling their shares to the enthusiastic public.',
    participants: 'Smart Money (Selling) / Late Retail (Buying)',
    volume: 'High but erratic. Large volume on down days.',
    news: 'Euphoric. "New paradigm. Buy now or miss out."',
    color: 'bg-warn',
    priceClass: 'border-t-4 border-warn w-1/4 h-12 flex items-start pt-2 justify-center relative -top-[20px]'
  },
  panic: {
    id: 'panic',
    title: 'Phase 4: Panic Phase (Downtrend)',
    description: 'With the smart money fully exited, there are no more buyers left to prop up the price. The market rolls over. Retail traders who bought the top panic and sell at a loss, driving the price violently back down into the next Accumulation phase.',
    participants: 'Trapped Retail / Short Sellers',
    volume: 'Spiking massively on down days.',
    news: 'Shock and panic. "Unexpected crash."',
    color: 'bg-bear',
    priceClass: 'border-t-4 border-bear w-1/4 h-32 flex items-end pb-2 justify-center relative rotate-[25deg] top-[35px]'
  }
};

export function TrendPhaseVisualizer() {
  const [active, setActive] = useState<Phase>('accumulation');
  const p = phases[active];

  return (
    <div className="bg-bg-elevated border border-border rounded-lg p-6 my-8 overflow-hidden">
      <h3 className="text-xl font-bold text-text mb-2 mt-0">Dow's Market Phases</h3>
      <p className="text-text-muted mb-6 text-sm">Select a phase to understand the psychology and mechanics of a market cycle.</p>
      
      {/* Abstract Price Chart Representation */}
      <div className="relative h-48 bg-bg-base border border-border rounded-md mb-8 flex items-center px-4 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="w-full flex justify-between items-center z-10 relative">
          {(Object.keys(phases) as Phase[]).map((key) => {
            const isSelected = active === key;
            return (
              <button 
                key={key}
                onClick={() => setActive(key)}
                className={`transition-all duration-300 font-bold text-sm tracking-wide ${phases[key].priceClass} ${isSelected ? 'opacity-100 text-text drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'opacity-40 hover:opacity-70 text-text-muted'}`}
              >
                {key.toUpperCase()}
              </button>
            )
          })}
        </div>
      </div>

      {/* Info Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-3 h-3 rounded-full ${p.color}`}></div>
            <h4 className="m-0 text-lg text-text">{p.title}</h4>
          </div>
          <p className="text-text-muted leading-relaxed m-0 text-sm">{p.description}</p>
        </div>
        
        <div className="bg-bg-base rounded-md p-4 border border-border text-sm flex flex-col justify-center gap-3">
          <div>
            <span className="text-text-muted text-xs uppercase font-bold block mb-1">Key Participants</span>
            <span className="text-text font-medium">{p.participants}</span>
          </div>
          <div>
            <span className="text-text-muted text-xs uppercase font-bold block mb-1">Volume Signature</span>
            <span className="text-text font-medium">{p.volume}</span>
          </div>
          <div>
            <span className="text-text-muted text-xs uppercase font-bold block mb-1">News Sentiment</span>
            <span className="text-text font-medium italic">"{p.news}"</span>
          </div>
        </div>
      </div>
    </div>
  );
}
