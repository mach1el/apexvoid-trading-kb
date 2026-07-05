import { useState, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { SearchDialog } from './SearchDialog';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SearchDialog />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-bg-base/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-4 h-14">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-bg-elevated text-text-muted hover:text-text transition-colors cursor-pointer"
                aria-label="Open sidebar"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Search trigger */}
              <button
                onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-muted bg-bg-elevated border border-border rounded-lg hover:border-accent/30 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline text-xs px-1.5 py-0.5 bg-bg-base rounded border border-border font-mono">⌘K</kbd>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-8 max-w-4xl w-full mx-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-border px-4 py-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs text-text-muted">
              Educational material only — not financial advice. © {new Date().getFullYear()} ApexVoid
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
