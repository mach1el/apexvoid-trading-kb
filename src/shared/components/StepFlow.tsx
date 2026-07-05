import type { ReactNode } from 'react';

interface StepFlowProps {
  children: ReactNode;
}

export function StepFlow({ children }: StepFlowProps) {
  return (
    <div className="bg-bg-elevated border border-border rounded-lg p-6 mb-6">
      <ol className="list-none p-0 m-0 relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-[14px] before:w-0.5 before:bg-border [counter-reset:steps]">
        {children}
      </ol>
    </div>
  );
}

interface StepProps {
  children: ReactNode;
}

export function Step({ children }: StepProps) {
  return (
    <li className="relative pl-10 mb-6 last:mb-0 text-text-muted [counter-increment:steps] before:content-[counter(steps)] before:absolute before:left-0 before:-top-0.5 before:w-[30px] before:h-[30px] before:bg-bg-elevated before:border-2 before:border-accent before:rounded-full before:flex before:items-center before:justify-center before:text-accent before:font-bold before:font-mono before:text-sm before:z-10 [&_strong]:text-text">
      {children}
    </li>
  );
}
