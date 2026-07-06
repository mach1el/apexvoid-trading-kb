import { useState, type FC } from 'react';

export const WyckoffPhaseLabeler: FC = () => {
  const labels = ['SC', 'AR', 'ST', 'Spring', 'SOS'];
  const [answers, setAnswers] = useState<string[]>(['', '', '', '', '']);
  const [submitted, setSubmitted] = useState(false);
  
  const correctAnswers = ['SC', 'AR', 'ST', 'Spring', 'SOS'];

  const handleSelect = (idx: number, val: string) => {
    const newAns = [...answers];
    newAns[idx] = val;
    setAnswers(newAns);
    setSubmitted(false);
  };
  
  const checkAnswers = () => {
    setSubmitted(true);
  };
  
  const isAllCorrect = answers.every((a, i) => a === correctAnswers[i]);

  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text m-0">Wyckoff Phase Labeler</h3>
        <p className="text-sm text-text-muted mt-1">Assign the correct Wyckoff events to the accumulation schematic.</p>
      </div>
      
      <div className="relative w-full h-64 bg-bg-elevated border border-border rounded mb-6 overflow-hidden">
        {/* Mock Schematic */}
        <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
          {/* Phase Lines */}
          <line x1="200" y1="0" x2="200" y2="300" stroke="currentColor" className="text-border opacity-50" strokeDasharray="4" />
          <line x1="400" y1="0" x2="400" y2="300" stroke="currentColor" className="text-border opacity-50" strokeDasharray="4" />
          <line x1="600" y1="0" x2="600" y2="300" stroke="currentColor" className="text-border opacity-50" strokeDasharray="4" />
          {/* Price Path */}
          <path d="M 0,50 Q 50,250 100,250 T 150,100 T 250,230 T 300,120 T 400,220 T 500,280 T 600,150 T 700,200 T 800,50" fill="none" stroke="currentColor" className="text-accent" strokeWidth="3" />
        </svg>
        
        {/* Select Boxes positioned over schematic nodes */}
        <div className="absolute" style={{ top: '80%', left: '10%' }}>
          <select value={answers[0]} onChange={e => handleSelect(0, e.target.value)} className="bg-bg-panel border border-border rounded text-xs p-1 outline-none text-text">
            <option value="">--</option>
            {labels.map(l => <option key={`0-${l}`} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="absolute" style={{ top: '25%', left: '17%' }}>
          <select value={answers[1]} onChange={e => handleSelect(1, e.target.value)} className="bg-bg-panel border border-border rounded text-xs p-1 outline-none text-text">
            <option value="">--</option>
            {labels.map(l => <option key={`1-${l}`} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="absolute" style={{ top: '72%', left: '29%' }}>
          <select value={answers[2]} onChange={e => handleSelect(2, e.target.value)} className="bg-bg-panel border border-border rounded text-xs p-1 outline-none text-text">
            <option value="">--</option>
            {labels.map(l => <option key={`2-${l}`} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="absolute" style={{ top: '88%', left: '59%' }}>
          <select value={answers[3]} onChange={e => handleSelect(3, e.target.value)} className="bg-bg-panel border border-border rounded text-xs p-1 outline-none text-text">
            <option value="">--</option>
            {labels.map(l => <option key={`3-${l}`} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="absolute" style={{ top: '40%', left: '72%' }}>
          <select value={answers[4]} onChange={e => handleSelect(4, e.target.value)} className="bg-bg-panel border border-border rounded text-xs p-1 outline-none text-text">
            <option value="">--</option>
            {labels.map(l => <option key={`4-${l}`} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button onClick={checkAnswers} className="px-4 py-2 bg-accent text-white rounded font-mono text-sm hover:opacity-90 transition-opacity">
          Validate Labels
        </button>
        {submitted && (
          <span className={`text-sm font-bold ${isAllCorrect ? 'text-green-500' : 'text-red-500'}`}>
            {isAllCorrect ? 'All labels correct! Accumulation schematic mastered.' : 'Some labels are incorrect. Try again.'}
          </span>
        )}
      </div>
    </div>
  );
};
