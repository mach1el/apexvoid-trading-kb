import { useState, type FC } from 'react';

export const KillzoneClock: FC = () => {
  const [activeZone, setActiveZone] = useState<'all' | 'asia' | 'london' | 'ny'>('all');

  // Times in EST (New York Time)
  const sessions = [
    { id: 'asia', name: 'Asian Session', start: 18, end: 2, color: 'var(--color-warn)', kzStart: 20, kzEnd: 24, kzName: 'Asian Killzone' },
    { id: 'london', name: 'London Session', start: 3, end: 11, color: 'var(--color-accent)', kzStart: 2, kzEnd: 5, kzName: 'London Killzone' },
    { id: 'ny', name: 'New York Session', start: 8, end: 17, color: 'var(--color-bull)', kzStart: 7, kzEnd: 10, kzName: 'NY AM Killzone' },
  ];

  const getLeft = (hour: number) => (hour / 24) * 100;
  const getWidth = (start: number, end: number) => {
    if (end < start) {
      // Wraps around midnight (like Asian session 18 to 2)
      return ((24 - start + end) / 24) * 100;
    }
    return ((end - start) / 24) * 100;
  };

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-text m-0">The Daily Cycle (EST Time)</h3>
          <p className="text-sm text-text-muted mt-1">
            Algorithmic volatility is injected during specific time windows known as Killzones.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveZone('all')}
            className={`px-3 py-1 text-xs font-mono rounded border ${activeZone === 'all' ? 'bg-text text-bg-base border-text' : 'bg-bg-elevated text-text-muted border-border hover:border-text-muted'}`}
          >
            ALL
          </button>
          <button 
            onClick={() => setActiveZone('asia')}
            className={`px-3 py-1 text-xs font-mono rounded border ${activeZone === 'asia' ? 'bg-warn/20 text-warn border-warn' : 'bg-bg-elevated text-text-muted border-border hover:border-text-muted'}`}
          >
            ASIA
          </button>
          <button 
            onClick={() => setActiveZone('london')}
            className={`px-3 py-1 text-xs font-mono rounded border ${activeZone === 'london' ? 'bg-accent/20 text-accent border-accent' : 'bg-bg-elevated text-text-muted border-border hover:border-text-muted'}`}
          >
            LONDON
          </button>
          <button 
            onClick={() => setActiveZone('ny')}
            className={`px-3 py-1 text-xs font-mono rounded border ${activeZone === 'ny' ? 'bg-bull/20 text-bull border-bull' : 'bg-bg-elevated text-text-muted border-border hover:border-text-muted'}`}
          >
            NY
          </button>
        </div>
      </div>

      <div className="relative w-full h-48 bg-bg-elevated rounded border border-border p-4 mt-8">
        
        {/* Time Axis */}
        <div className="absolute top-0 left-4 right-4 h-6 flex justify-between text-[10px] text-text-muted font-mono border-b border-border">
          {[0, 3, 6, 9, 12, 15, 18, 21, 24].map(hour => (
            <div key={hour} className="relative w-0 flex justify-center" style={{ left: `${(hour/24)*100}%` }}>
              <span className="absolute -top-1">{hour}:00</span>
              <div className="absolute top-4 w-px h-44 bg-border/50" />
            </div>
          ))}
        </div>

        {/* Sessions */}
        <div className="relative w-full h-full pt-8">
          {sessions.map((s, i) => {
            const isActive = activeZone === 'all' || activeZone === s.id;
            
            // Handle Asian session wrapping
            if (s.start > s.end) {
              return (
                <div key={s.id} className={`absolute h-8 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-10'}`} style={{ top: `${i * 36 + 32}px`, left: 0, right: 0 }}>
                  {/* Part 1: 00:00 to End */}
                  <div className="absolute h-full rounded-r overflow-hidden" style={{ left: '0%', width: `${(s.end/24)*100}%`, backgroundColor: `${s.color}33`, border: `1px solid ${s.color}` }}>
                  </div>
                  {/* Part 2: Start to 24:00 */}
                  <div className="absolute h-full rounded-l overflow-hidden" style={{ left: `${(s.start/24)*100}%`, width: `${((24-s.start)/24)*100}%`, backgroundColor: `${s.color}33`, border: `1px solid ${s.color}` }}>
                    <span className="absolute left-2 top-1.5 text-xs font-bold" style={{ color: s.color }}>{s.name}</span>
                    
                    {/* Killzone highlighting inside part 2 */}
                    {isActive && (
                      <div className="absolute h-full top-0 border-x-2 animate-pulse" style={{ left: `${((s.kzStart - s.start) / (24 - s.start)) * 100}%`, width: `${((24 - s.kzStart) / (24 - s.start)) * 100}%`, backgroundColor: s.color, borderColor: '#fff' }}>
                         <span className="absolute -top-5 left-1 whitespace-nowrap text-[9px] font-bold text-text bg-bg-elevated px-1 rounded">{s.kzName}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={s.id} 
                className={`absolute h-8 transition-opacity duration-300 rounded overflow-hidden ${isActive ? 'opacity-100' : 'opacity-10'}`} 
                style={{ 
                  top: `${i * 36 + 32}px`, 
                  left: `${getLeft(s.start)}%`, 
                  width: `${getWidth(s.start, s.end)}%`,
                  backgroundColor: `${s.color}33`,
                  border: `1px solid ${s.color}`
                }}
              >
                <span className="absolute left-2 top-1.5 text-xs font-bold" style={{ color: s.color }}>{s.name}</span>
                
                {/* Killzone Highlighter */}
                {isActive && (
                  <div 
                    className="absolute h-full top-0 border-x-2 animate-pulse" 
                    style={{ 
                      left: `${((s.kzStart - s.start) / (s.end - s.start)) * 100}%`, 
                      width: `${((s.kzEnd - s.kzStart) / (s.end - s.start)) * 100}%`,
                      backgroundColor: s.color,
                      borderColor: '#fff'
                    }}
                  >
                    <span className="absolute -top-5 left-1 whitespace-nowrap text-[9px] font-bold text-text bg-bg-elevated px-1 rounded">{s.kzName}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 flex gap-4 text-xs text-text-muted justify-center items-center">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-warn/20 border border-warn"></div> Asia Range (Accumulation)</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-accent/20 border border-accent"></div> London (Manipulation)</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-bull/20 border border-bull"></div> NY (Distribution)</div>
      </div>
    </div>
  );
};
