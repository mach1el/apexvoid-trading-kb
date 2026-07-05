interface TermProps {
  term: string;
  definition: string;
}

export function Term({ term, definition }: TermProps) {
  return (
    <div className="bg-bg-elevated border border-border rounded-lg p-4">
      <h4 className="m-0 mb-2 text-accent font-mono font-semibold">{term}</h4>
      <p className="m-0 text-text-muted text-sm">{definition}</p>
    </div>
  );
}

import type { ReactNode } from 'react';

interface GlossaryProps {
  children: ReactNode;
}

export function Glossary({ children }: GlossaryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
      {children}
    </div>
  );
}
