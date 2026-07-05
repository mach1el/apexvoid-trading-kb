import type { ReactNode } from 'react';

interface KeyTakeawaysProps {
  children: ReactNode;
}

export function KeyTakeaways({ children }: KeyTakeawaysProps) {
  return (
    <div className="border border-accent bg-gradient-to-b from-bg-elevated to-bg-base rounded-lg p-6 mt-8">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
        <span className="text-xl">📝</span>
        <h3 className="text-lg font-semibold text-text m-0">Key Takeaways</h3>
      </div>
      <div className="[&>ul]:m-0 [&>ul]:pl-5 [&_li]:mb-2 [&_li:last-child]:mb-0 [&_li]:text-text-muted [&_strong]:text-text">
        {children}
      </div>
    </div>
  );
}
