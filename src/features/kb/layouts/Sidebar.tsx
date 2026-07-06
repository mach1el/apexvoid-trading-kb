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
          <p className="text-xs text-text-muted leading-relaxed m-0">
            Educational material only.<br />
            Not financial advice.
          </p>
        </div>
      </aside>
    </>
  );
}
