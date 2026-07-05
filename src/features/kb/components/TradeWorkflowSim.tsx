import { useState } from 'react';

type Step = 'bias' | 'poi' | 'entry';

interface WorkflowState {
  currentStep: Step;
  score: number;
  message: string;
}

export function TradeWorkflowSim() {
  const [state, setState] = useState<WorkflowState>({
    currentStep: 'bias',
    score: 0,
    message: ''
  });

  const handleSelection = (timeframe: string, expectedStep: Step, correctTf: string, explanation: string) => {
    if (timeframe === correctTf) {
      setState(prev => ({
        currentStep: expectedStep === 'bias' ? 'poi' : expectedStep === 'poi' ? 'entry' : 'bias',
        score: prev.score + (prev.currentStep === 'bias' && expectedStep === 'bias' ? 0 : 1),
        message: `✅ Correct! ${explanation}`
      }));
      
      if (expectedStep === 'entry') {
        setState({
          currentStep: 'bias',
          score: 0,
          message: `🎉 Workflow Complete! ${explanation} Returning to Bias step.`
        });
      }
    } else {
      setState(prev => ({
        ...prev,
        message: `❌ Incorrect timeframe for ${expectedStep.toUpperCase()}. ${explanation}`
      }));
    }
  };

  return (
    <div className="bg-bg-elevated border border-border rounded-lg p-6 my-8">
      <h3 className="text-xl font-bold text-text mb-2 mt-0">Top-Down Analysis Simulator</h3>
      <p className="text-text-muted mb-6 text-sm">Select the correct timeframe for each step of the top-down workflow.</p>
      
      <div className="flex flex-col gap-6">
        
        {/* Progress Tracker */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className={`flex flex-col items-center flex-1 ${state.currentStep === 'bias' ? 'text-accent' : 'text-text-muted'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-1 ${state.currentStep === 'bias' ? 'bg-accent text-bg-base' : 'bg-bg-base border border-border'}`}>1</div>
            <span className="text-xs uppercase tracking-wider font-semibold">Bias (HTF)</span>
          </div>
          <div className="w-8 h-px bg-border"></div>
          <div className={`flex flex-col items-center flex-1 ${state.currentStep === 'poi' ? 'text-accent' : 'text-text-muted'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-1 ${state.currentStep === 'poi' ? 'bg-accent text-bg-base' : 'bg-bg-base border border-border'}`}>2</div>
            <span className="text-xs uppercase tracking-wider font-semibold">POI (ITF)</span>
          </div>
          <div className="w-8 h-px bg-border"></div>
          <div className={`flex flex-col items-center flex-1 ${state.currentStep === 'entry' ? 'text-accent' : 'text-text-muted'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-1 ${state.currentStep === 'entry' ? 'bg-accent text-bg-base' : 'bg-bg-base border border-border'}`}>3</div>
            <span className="text-xs uppercase tracking-wider font-semibold">Entry (LTF)</span>
          </div>
        </div>

        {/* Challenge Area */}
        <div className="bg-bg-base p-6 rounded-md border border-border text-center min-h-[180px] flex flex-col justify-center">
          {state.currentStep === 'bias' && (
            <>
              <h4 className="text-lg text-text mb-4 mt-0">Step 1: Determine Directional Bias</h4>
              <p className="text-text-muted text-sm mb-6">Which timeframe should you use to determine the overarching market direction and major draws on liquidity?</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button onClick={() => handleSelection('1m', 'bias', 'Daily', 'The 1-minute chart is too noisy for macro bias.')} className="px-4 py-2 bg-bg-elevated border border-border rounded-md hover:border-accent hover:text-accent transition-colors">1 Minute</button>
                <button onClick={() => handleSelection('1H', 'bias', 'Daily', 'The 1-hour chart is for intermediate structure, not macro bias.')} className="px-4 py-2 bg-bg-elevated border border-border rounded-md hover:border-accent hover:text-accent transition-colors">1 Hour</button>
                <button onClick={() => handleSelection('Daily', 'bias', 'Daily', 'The Daily chart (or 4H) provides the macro institutional bias.')} className="px-4 py-2 bg-bg-elevated border border-border rounded-md hover:border-accent hover:text-accent transition-colors">Daily / 4H</button>
              </div>
            </>
          )}

          {state.currentStep === 'poi' && (
            <>
              <h4 className="text-lg text-text mb-4 mt-0">Step 2: Locate Point of Interest (POI)</h4>
              <p className="text-text-muted text-sm mb-6">You are bullish on the Daily chart. Which timeframe should you use to find the specific Order Block or FVG you want to trade from?</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button onClick={() => handleSelection('5m', 'poi', '1H', 'The 5-minute is for entries. POIs here are too fragile without HTF backing.')} className="px-4 py-2 bg-bg-elevated border border-border rounded-md hover:border-accent hover:text-accent transition-colors">5 Minute</button>
                <button onClick={() => handleSelection('1H', 'poi', '1H', 'The 1-hour (or 15m) chart provides refined structural POIs aligned with the Daily bias.')} className="px-4 py-2 bg-bg-elevated border border-border rounded-md hover:border-accent hover:text-accent transition-colors">1 Hour / 15m</button>
                <button onClick={() => handleSelection('Weekly', 'poi', '1H', 'The Weekly chart is too large for intraday/swing POIs.')} className="px-4 py-2 bg-bg-elevated border border-border rounded-md hover:border-accent hover:text-accent transition-colors">Weekly</button>
              </div>
            </>
          )}

          {state.currentStep === 'entry' && (
            <>
              <h4 className="text-lg text-text mb-4 mt-0">Step 3: Execute the Entry</h4>
              <p className="text-text-muted text-sm mb-6">Price has tapped your 1H Bullish Order Block during the London session. Which timeframe do you drop to for a CHoCH confirmation entry?</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button onClick={() => handleSelection('1m', 'entry', '1m', 'The 1m to 5m charts provide the lowest risk entries within HTF POIs.')} className="px-4 py-2 bg-bg-elevated border border-border rounded-md hover:border-accent hover:text-accent transition-colors">1m / 5m</button>
                <button onClick={() => handleSelection('4H', 'entry', '1m', 'The 4H chart would require a massive stop loss. This is not for execution.')} className="px-4 py-2 bg-bg-elevated border border-border rounded-md hover:border-accent hover:text-accent transition-colors">4 Hour</button>
                <button onClick={() => handleSelection('Tick', 'entry', '1m', 'Tick charts are generally too noisy and erratic for structured entries.')} className="px-4 py-2 bg-bg-elevated border border-border rounded-md hover:border-accent hover:text-accent transition-colors">Tick Chart</button>
              </div>
            </>
          )}
        </div>
        
        {/* Feedback Message */}
        {state.message && (
          <div className={`p-4 rounded-md text-sm border font-medium ${state.message.includes('❌') ? 'bg-bear/10 border-bear/30 text-bear' : 'bg-ok/10 border-ok/30 text-ok'}`}>
            {state.message}
          </div>
        )}
      </div>
    </div>
  );
}
