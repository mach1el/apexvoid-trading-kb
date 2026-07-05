import { useState, type FC, type ReactNode } from 'react';

export interface QuizOption {
  id: string;
  label: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizProps {
  question: string;
  options: QuizOption[];
  children?: ReactNode; // The diagram or context for the quiz
}

export const Quiz: FC<QuizProps> = ({ question, options, children }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="my-8 border border-border bg-bg-elevated rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border bg-bg-base">
        <h4 className="text-lg font-bold text-text m-0">{question}</h4>
      </div>
      
      {children && (
        <div className="p-4 bg-bg-base border-b border-border">
          {children}
        </div>
      )}

      <div className="p-4 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          const showResult = selectedId !== null;
          let btnClass = "p-3 rounded-lg border text-left transition-colors font-medium flex items-center justify-between ";
          
          if (!showResult) {
            btnClass += "border-border hover:border-accent text-text bg-bg-base hover:bg-bg-elevated";
          } else {
            if (option.isCorrect) {
              btnClass += "border-ok bg-ok/10 text-ok";
            } else if (isSelected) {
              btnClass += "border-bear bg-bear/10 text-bear";
            } else {
              btnClass += "border-border text-text-muted opacity-50";
            }
          }

          return (
            <button
              key={option.id}
              disabled={showResult}
              onClick={() => setSelectedId(option.id)}
              className={btnClass}
            >
              {option.label}
              {showResult && option.isCorrect && (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {showResult && !option.isCorrect && isSelected && (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {selectedId !== null && (
        <div className={`p-4 border-t ${
          options.find(o => o.id === selectedId)?.isCorrect 
            ? 'border-ok/30 bg-ok/5' 
            : 'border-bear/30 bg-bear/5'
        }`}>
          <p className="m-0 text-sm">
            <strong className="block mb-1">
              {options.find(o => o.id === selectedId)?.isCorrect ? 'Correct!' : 'Incorrect.'}
            </strong>
            {options.find(o => o.id === selectedId)?.explanation}
          </p>
        </div>
      )}
    </div>
  );
};
