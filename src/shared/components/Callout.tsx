import type { ReactNode } from 'react';

type CalloutType = 'tip' | 'warn' | 'trap' | 'note';

interface CalloutProps {
  type?: CalloutType | string;
  title?: string;
  children: ReactNode;
}

const config: Record<CalloutType, { icon: string; color: string; defaultTitle: string }> = {
  tip:  { icon: '✅', color: 'border-l-ok',   defaultTitle: 'Correct Way' },
  warn: { icon: '⚠️', color: 'border-l-warn', defaultTitle: 'Warning' },
  trap: { icon: '❌', color: 'border-l-bear',  defaultTitle: 'Common Trap' },
  note: { icon: 'ℹ️', color: 'border-l-accent', defaultTitle: 'Note' },
};

export function Callout({ type = 'note', title, children }: CalloutProps) {
  // Fallback to 'note' if an invalid type is provided
  const c = config[type as CalloutType] || config.note;
  return (
    <div className={`border border-border border-l-4 ${c.color} bg-bg-elevated rounded-md p-4 my-6`}>
      <div className="flex items-center gap-2 mb-2 font-semibold text-text">
        <span>{c.icon}</span>
        <span>{title ?? c.defaultTitle}</span>
      </div>
      <div className="text-text-muted text-[0.95rem] leading-relaxed [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
