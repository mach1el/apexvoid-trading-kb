import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigation } from '../content/nav';
import { useLanguage } from '../../../shared/contexts/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { lang } = useLanguage();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    navigation.forEach(sec => init[sec.prefix] = true);
    return init;
  });

  const toggleSection = useCallback((prefix: string) => {
    setCollapsed((prev) => ({ ...prev, [prefix]: !prev[prefix] }));
  }, []);

  // Auto-expand the section containing the active page
  useEffect(() => {
    for (const section of navigation) {
      if (section.items.some((item) => item.path === location.pathname)) {
        setCollapsed((prev) => ({ ...prev, [section.prefix]: false }));
      }
    }
  }, [location.pathname]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-[280px] bg-bg-base border-r border-border z-50
          transition-transform duration-300 ease-in-out overflow-y-auto
          lg:sticky lg:top-0 lg:translate-x-0 lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 px-5 py-5 border-b border-border no-underline group" onClick={onClose}>
          <div className="w-8 h-8 rounded-md bg-accent/20 flex items-center justify-center text-accent font-bold font-mono text-sm group-hover:bg-accent/30 transition-colors">
            AV
          </div>
          <div>
            <span className="text-text font-semibold text-sm block leading-tight">ApexVoid</span>
            <span className="text-text-muted text-xs">Trading Knowledge</span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="py-3 px-3">
          {navigation.map((section) => {
            const isCollapsed = collapsed[section.prefix];
            const hasActive = section.items.some((i) => i.path === location.pathname);

            return (
              <div key={section.prefix} className="mb-1">
                <button
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors cursor-pointer
                    ${hasActive ? 'text-text bg-bg-elevated' : 'text-text-muted hover:text-text hover:bg-bg-elevated/50'}
                  `}
                  onClick={() => toggleSection(section.prefix)}
                >
                  <span className="text-base">{section.icon}</span>
                  <span className="flex-1 text-left font-medium">{section.label[lang]}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isCollapsed ? '' : 'rotate-90'}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {!isCollapsed && (
                  <div className="ml-4 pl-3 border-l border-border mt-1">
                    {section.items.map((item) => {
                      const active = location.pathname === item.path;
                      return (
                        <Link
                          key={item.slug}
                          to={item.path}
                          onClick={onClose}
                          className={`block px-3 py-1.5 text-sm rounded-md mb-0.5 no-underline transition-colors
                            ${active
                              ? 'text-accent bg-accent/10 font-medium'
                              : 'text-text-muted hover:text-text hover:bg-bg-elevated/50'
                            }
                          `}
                        >
                          {item.label[lang]}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border mt-4">
          <div className="flex items-center gap-4 mb-4">
            {/* Telegram Owner */}
            <a href="https://t.me/ST_MICH43L" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-[#0088cc] transition-colors flex items-center justify-center cursor-pointer" aria-label="Telegram Owner" title="Owner @ST_MICH43L">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.6l3.15-2.88c.14-.13.25-.42-.25-.09l-3.9 2.45c-.48.33-1.05.5-1.64.35-.49-.12-1.36-.29-2.01-.5-.81-.26-.77-.85-.14-1.1 3.25-1.42 5.42-2.36 6.51-2.81 3.09-1.29 3.73-1.51 4.15-1.51.09 0 .29.02.43.13.11.09.15.22.16.34.02.16.02.32.01.44z"/></svg>
            </a>
            
            {/* Telegram Channel */}
            <a href="https://t.me/apexvoidtrading" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-[#0088cc] transition-colors flex items-center justify-center cursor-pointer" aria-label="Telegram Channel" title="Channel @apexvoidtrading">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.6l3.15-2.88c.14-.13.25-.42-.25-.09l-3.9 2.45c-.48.33-1.05.5-1.64.35-.49-.12-1.36-.29-2.01-.5-.81-.26-.77-.85-.14-1.1 3.25-1.42 5.42-2.36 6.51-2.81 3.09-1.29 3.73-1.51 4.15-1.51.09 0 .29.02.43.13.11.09.15.22.16.34.02.16.02.32.01.44z"/></svg>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/mich43l/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-[#0a66c2] transition-colors flex items-center justify-center cursor-pointer" aria-label="LinkedIn" title="LinkedIn">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
            </a>

            {/* GitHub */}
            <a href="https://github.com/mach1el" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white transition-colors flex items-center justify-center cursor-pointer" aria-label="GitHub" title="GitHub">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>
          </div>
          <p className="text-xs text-text-muted leading-relaxed m-0">
            Educational material only.<br />
            Not financial advice.
          </p>
        </div>
      </aside>
    </>
  );
}
