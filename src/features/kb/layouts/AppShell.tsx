import { useState, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { SearchDialog } from './SearchDialog';
import { DonateDialog } from './DonateDialog';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();

  return (
    <div className="min-h-screen flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SearchDialog />
      <DonateDialog isOpen={donateOpen} onClose={() => setDonateOpen(false)} />

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
              {/* Language Toggle */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-text bg-bg-elevated border border-border rounded-lg hover:border-accent/50 hover:bg-accent/10 transition-all cursor-pointer"
                title="Toggle Language"
              >
                <span className={lang === 'en' ? 'text-accent' : 'text-text-muted'}>EN</span>
                <span className="text-border">/</span>
                <span className={lang === 'vi' ? 'text-accent' : 'text-text-muted'}>VI</span>
              </button>

              {/* Support Button */}
              <button
                onClick={() => setDonateOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-text bg-bg-elevated border border-border rounded-lg hover:border-red-500/50 hover:bg-red-500/10 transition-all cursor-pointer"
                title="Support My Work"
              >
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="hidden sm:inline">Support</span>
              </button>

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

              <div className="hidden sm:flex items-center gap-3 ml-2 border-l border-border pl-4">
                {/* Telegram Owner */}
                <a href="https://t.me/ST_MICH43L" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-[#0088cc] transition-colors flex items-center justify-center cursor-pointer" aria-label="Telegram Owner" title="Owner @ST_MICH43L">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.6l3.15-2.88c.14-.13.25-.42-.25-.09l-3.9 2.45c-.48.33-1.05.5-1.64.35-.49-.12-1.36-.29-2.01-.5-.81-.26-.77-.85-.14-1.1 3.25-1.42 5.42-2.36 6.51-2.81 3.09-1.29 3.73-1.51 4.15-1.51.09 0 .29.02.43.13.11.09.15.22.16.34.02.16.02.32.01.44z"/></svg>
                </a>
                
                {/* Telegram Channel */}
                <a href="https://t.me/apexvoidtrading" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-[#0088cc] transition-colors flex items-center justify-center cursor-pointer" aria-label="Telegram Channel" title="Channel @apexvoidtrading">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.6l3.15-2.88c.14-.13.25-.42-.25-.09l-3.9 2.45c-.48.33-1.05.5-1.64.35-.49-.12-1.36-.29-2.01-.5-.81-.26-.77-.85-.14-1.1 3.25-1.42 5.42-2.36 6.51-2.81 3.09-1.29 3.73-1.51 4.15-1.51.09 0 .29.02.43.13.11.09.15.22.16.34.02.16.02.32.01.44z"/></svg>
                </a>

                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/mich43l/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-[#0a66c2] transition-colors flex items-center justify-center cursor-pointer" aria-label="LinkedIn" title="LinkedIn">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                </a>

                {/* GitHub */}
                <a href="https://github.com/mach1el" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white transition-colors flex items-center justify-center cursor-pointer" aria-label="GitHub" title="GitHub">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </a>
              </div>
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
