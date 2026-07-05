import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { flattenNav } from '../content/nav';

const allPages = flattenNav();

const fuse = new Fuse(allPages, {
  keys: ['label', 'slug', 'path'],
  threshold: 0.4,
  includeMatches: true,
});

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = query.length > 0 ? fuse.search(query).slice(0, 8) : [];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
    if (e.key === 'Escape') {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const goTo = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]" onClick={() => setOpen(false)}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-bg-elevated border border-border rounded-xl shadow-2xl w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages…"
            className="flex-1 bg-transparent text-text placeholder:text-text-muted outline-none text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && results.length > 0) {
                goTo(results[0].item.path);
              }
            }}
          />
          <kbd className="text-xs text-text-muted bg-bg-base px-2 py-1 rounded border border-border font-mono">Esc</kbd>
        </div>

        {results.length > 0 && (
          <div className="py-2 max-h-80 overflow-y-auto">
            {results.map((r) => (
              <button
                key={r.item.path}
                onClick={() => goTo(r.item.path)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text-muted hover:text-text hover:bg-bg-base/50 transition-colors cursor-pointer text-left"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <span className="text-text font-medium">{r.item.label}</span>
                  <span className="block text-xs text-text-muted font-mono">{r.item.path}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {query.length > 0 && results.length === 0 && (
          <div className="px-4 py-8 text-center text-text-muted text-sm">
            No results for "{query}"
          </div>
        )}

        {query.length === 0 && (
          <div className="px-4 py-8 text-center text-text-muted text-sm">
            Start typing to search…
          </div>
        )}
      </div>
    </div>
  );
}
