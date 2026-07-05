import type { ReactNode } from 'react';

interface ConceptCardProps {
  title: string;
  icon?: string;
  children: ReactNode;
}

export function ConceptCard({ title, icon = '💡', children }: ConceptCardProps) {
  return (
    <div className="border border-border border-l-4 border-l-accent bg-bg-elevated rounded-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-xl font-semibold text-text m-0">{title}</h3>
      </div>
      <div className="text-text-muted leading-relaxed">
        {children}
      </div>
    </div>
  );
}
