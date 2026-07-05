import { useState, type FC } from 'react';
import { StepFlow, Step } from '../../../shared/components/StepFlow';

export const OBWalkthrough: FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="my-8">
      <div className="flex gap-4">
        <div className="flex-1">
          <StepFlow>
            <Step>
              <div 
                className={`cursor-pointer transition-opacity ${currentStep >= 1 ? 'opacity-100' : 'opacity-50'}`}
                onClick={() => setCurrentStep(1)}
              >
                <strong>Identify HTF Context:</strong> Locate a massive bullish displacement on the Daily chart that broke structure.
              </div>
            </Step>
            <Step>
              <div 
                className={`cursor-pointer transition-opacity ${currentStep >= 2 ? 'opacity-100' : 'opacity-50'}`}
                onClick={() => setCurrentStep(2)}
              >
                <strong>Mark the Daily OB:</strong> Draw a zone encompassing the body (and optionally the wick) of the last down candle before the displacement.
              </div>
            </Step>
            <Step>
              <div 
                className={`cursor-pointer transition-opacity ${currentStep >= 3 ? 'opacity-100' : 'opacity-50'}`}
                onClick={() => setCurrentStep(3)}
              >
                <strong>Drop to LTF (1-Hour):</strong> The Daily OB zone is too wide for a tight stop loss. Drop down to a lower timeframe to inspect the price action *inside* that zone.
              </div>
            </Step>
            <Step>
              <div 
                className={`cursor-pointer transition-opacity ${currentStep >= 4 ? 'opacity-100' : 'opacity-50'}`}
                onClick={() => setCurrentStep(4)}
              >
                <strong>Refine to LTF OB:</strong> Find the specific 1-Hour order block resting inside the Daily zone that was responsible for the initial push. This drastically reduces your risk.
              </div>
            </Step>
          </StepFlow>
          
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 bg-bg-elevated border border-border rounded text-text hover:bg-border disabled:opacity-50"
            >
              Previous Step
            </button>
            <button 
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              disabled={currentStep === 4}
              className="px-4 py-2 bg-accent/20 border border-accent text-accent rounded hover:bg-accent/30 disabled:opacity-50"
            >
              Next Step
            </button>
          </div>
        </div>

        <div className="flex-1 bg-bg-surface border border-border rounded-lg p-4 flex items-center justify-center">
          {currentStep === 1 && (
            <svg viewBox="0 0 300 200" className="w-full h-auto">
              {/* Daily Chart Base */}
              <text x="10" y="20" fill="var(--color-text-muted)" fontSize="12" fontFamily="monospace">Daily Chart</text>
              <line x1="50" y1="160" x2="50" y2="190" stroke="var(--color-text)" strokeWidth="2" />
              <rect x="40" y="170" width="20" height="15" fill="var(--color-bear)" />
              
              <line x1="80" y1="50" x2="80" y2="180" stroke="var(--color-text)" strokeWidth="2" />
              <rect x="70" y="60" width="20" height="110" fill="var(--color-bull)" />
              
              <line x1="110" y1="30" x2="110" y2="80" stroke="var(--color-text)" strokeWidth="2" />
              <rect x="100" y="40" width="20" height="30" fill="var(--color-bull)" />
              
              <text x="95" y="100" fill="var(--color-bull)" fontSize="12" fontWeight="bold">DISPLACEMENT</text>
            </svg>
          )}

          {currentStep === 2 && (
            <svg viewBox="0 0 300 200" className="w-full h-auto">
              <text x="10" y="20" fill="var(--color-text-muted)" fontSize="12" fontFamily="monospace">Daily Chart</text>
              
              {/* The Zone */}
              <rect x="30" y="160" width="250" height="30" fill="var(--color-bull)" opacity="0.15" stroke="var(--color-bull)" strokeWidth="1" strokeDasharray="4,4" />
              <text x="140" y="180" fill="var(--color-bull)" fontSize="12" fontWeight="bold">Daily OB Zone</text>

              <line x1="50" y1="160" x2="50" y2="190" stroke="var(--color-text)" strokeWidth="2" />
              <rect x="40" y="170" width="20" height="15" fill="var(--color-bear)" />
              
              <line x1="80" y1="50" x2="80" y2="180" stroke="var(--color-text)" strokeWidth="2" />
              <rect x="70" y="60" width="20" height="110" fill="var(--color-bull)" />
              
              <line x1="110" y1="30" x2="110" y2="80" stroke="var(--color-text)" strokeWidth="2" />
              <rect x="100" y="40" width="20" height="30" fill="var(--color-bull)" />
            </svg>
          )}

          {currentStep === 3 && (
            <svg viewBox="0 0 300 200" className="w-full h-auto">
              <text x="10" y="20" fill="var(--color-text-muted)" fontSize="12" fontFamily="monospace">1-Hour Chart (Zoomed In)</text>
              
              {/* Daily Zone Background */}
              <rect x="10" y="80" width="280" height="110" fill="var(--color-bull)" opacity="0.05" />
              <text x="20" y="100" fill="var(--color-text-muted)" fontSize="10">Daily OB Background</text>

              {/* 1H Price Action inside the daily OB */}
              <line x1="50" y1="120" x2="50" y2="160" stroke="var(--color-text)" strokeWidth="1.5" />
              <rect x="42" y="130" width="16" height="25" fill="var(--color-bear)" />

              <line x1="80" y1="140" x2="80" y2="180" stroke="var(--color-text)" strokeWidth="1.5" />
              <rect x="72" y="150" width="16" height="25" fill="var(--color-bear)" />

              <line x1="110" y1="150" x2="110" y2="190" stroke="var(--color-text)" strokeWidth="1.5" />
              <rect x="102" y="160" width="16" height="25" fill="var(--color-bear)" />

              {/* The launch */}
              <line x1="140" y1="90" x2="140" y2="170" stroke="var(--color-text)" strokeWidth="1.5" />
              <rect x="132" y="100" width="16" height="65" fill="var(--color-bull)" />
              
              <line x1="170" y1="40" x2="170" y2="105" stroke="var(--color-text)" strokeWidth="1.5" />
              <rect x="162" y="50" width="16" height="50" fill="var(--color-bull)" />
            </svg>
          )}

          {currentStep === 4 && (
            <svg viewBox="0 0 300 200" className="w-full h-auto">
              <text x="10" y="20" fill="var(--color-text-muted)" fontSize="12" fontFamily="monospace">1-Hour Chart (Zoomed In)</text>
              
              {/* Daily Zone Background */}
              <rect x="10" y="80" width="280" height="110" fill="var(--color-bull)" opacity="0.05" />
              
              {/* Refined 1H Zone */}
              <rect x="90" y="150" width="200" height="40" fill="var(--color-bull)" opacity="0.3" stroke="var(--color-bull)" strokeWidth="1" />
              <text x="195" y="175" fill="var(--color-bull)" fontSize="12" fontWeight="bold">Refined 1H OB</text>

              {/* 1H Price Action inside the daily OB */}
              <line x1="50" y1="120" x2="50" y2="160" stroke="var(--color-text)" strokeWidth="1.5" />
              <rect x="42" y="130" width="16" height="25" fill="var(--color-bear)" />

              <line x1="80" y1="140" x2="80" y2="180" stroke="var(--color-text)" strokeWidth="1.5" />
              <rect x="72" y="150" width="16" height="25" fill="var(--color-bear)" />

              <line x1="110" y1="150" x2="110" y2="190" stroke="var(--color-text)" strokeWidth="1.5" />
              <rect x="102" y="160" width="16" height="25" fill="var(--color-bear)" />

              {/* The launch */}
              <line x1="140" y1="90" x2="140" y2="170" stroke="var(--color-text)" strokeWidth="1.5" />
              <rect x="132" y="100" width="16" height="65" fill="var(--color-bull)" />
              
              <line x1="170" y1="40" x2="170" y2="105" stroke="var(--color-text)" strokeWidth="1.5" />
              <rect x="162" y="50" width="16" height="50" fill="var(--color-bull)" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};
