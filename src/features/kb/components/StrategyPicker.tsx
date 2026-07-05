import { useState } from 'react';

type Option = {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
};

export function StrategyPicker({
  scenario,
  options
}: {
  scenario: string;
  options: Option[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="my-6 p-6 border rounded-lg bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold mb-2">Knowledge Check: Strategy Selection</h3>
      <p className="text-slate-700 dark:text-slate-300 mb-4 bg-white dark:bg-slate-950 p-4 rounded border border-slate-200 dark:border-slate-800">
        <span className="font-semibold">Scenario:</span> {scenario}
      </p>

      <div className="space-y-3">
        {options.map(opt => {
          const isSelected = selected === opt.id;
          let btnClass = "w-full text-left p-3 rounded border transition-colors ";
          
          if (!selected) {
            btnClass += "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700";
          } else if (isSelected && opt.isCorrect) {
            btnClass += "bg-green-100 dark:bg-green-900/40 border-green-500 text-green-900 dark:text-green-300";
          } else if (isSelected && !opt.isCorrect) {
            btnClass += "bg-red-100 dark:bg-red-900/40 border-red-500 text-red-900 dark:text-red-300";
          } else if (!isSelected && opt.isCorrect) {
            btnClass += "bg-green-50 dark:bg-green-900/20 border-green-300 text-green-800 dark:text-green-400";
          } else {
            btnClass += "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 opacity-50";
          }

          return (
            <div key={opt.id}>
              <button
                disabled={selected !== null}
                onClick={() => setSelected(opt.id)}
                className={btnClass}
              >
                {opt.text}
              </button>
              {isSelected && (
                <div className={`mt-2 p-3 rounded text-sm ${opt.isCorrect ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300'}`}>
                  <span className="font-bold">{opt.isCorrect ? 'Correct!' : 'Incorrect.'}</span> {opt.feedback}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {selected && (
        <button 
          onClick={() => setSelected(null)}
          className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
