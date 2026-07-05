import type { ReactNode } from 'react';

interface CompareTableProps {
  title?: string;
  children: ReactNode;
}

export function CompareTable({ title, children }: CompareTableProps) {
  return (
    <div className="bg-bg-elevated border border-border rounded-lg p-6 mb-6 overflow-x-auto">
      {title && <h4 className="text-accent font-semibold mt-0 mb-4">{title}</h4>}
      <div className="[&_table]:w-full [&_table]:border-collapse [&_th]:text-left [&_th]:text-text [&_th]:font-semibold [&_th]:p-3 [&_th]:border-b [&_th]:border-border [&_td]:text-text-muted [&_td]:p-3 [&_td]:border-b [&_td]:border-border">
        {children}
      </div>
    </div>
  );
}
