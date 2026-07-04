import { Link, useLocation } from 'react-router-dom';
import { flattenNav } from '../content/nav';

export function PageNavigation() {
  const location = useLocation();
  const flatNav = flattenNav();
  
  const currentIndex = flatNav.findIndex((item) => item.path === location.pathname);
  
  if (currentIndex === -1) return null;

  const prevItem = currentIndex > 0 ? flatNav[currentIndex - 1] : null;
  const nextItem = currentIndex < flatNav.length - 1 ? flatNav[currentIndex + 1] : null;

  return (
    <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      {prevItem ? (
        <Link 
          to={prevItem.path} 
          className="flex-1 group flex flex-row items-center gap-3 p-3 rounded-lg border border-border bg-bg-base hover:bg-bg-elevated hover:border-accent/40 transition-colors no-underline"
        >
          <div className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-bg-elevated group-hover:bg-accent/10 text-text-muted group-hover:text-accent transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="flex flex-col items-start text-left truncate">
            <span className="text-[10px] text-text-muted font-medium uppercase tracking-wider">Previous</span>
            <span className="text-sm text-text font-semibold group-hover:text-accent transition-colors truncate w-full">
              {prevItem.label}
            </span>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {nextItem ? (
        <Link 
          to={nextItem.path} 
          className="flex-1 group flex flex-row items-center justify-end gap-3 p-3 rounded-lg border border-border bg-bg-base hover:bg-bg-elevated hover:border-accent/40 transition-colors no-underline text-right"
        >
          <div className="flex flex-col items-end text-right truncate">
            <span className="text-[10px] text-text-muted font-medium uppercase tracking-wider">Next</span>
            <span className="text-sm text-text font-semibold group-hover:text-accent transition-colors truncate w-full">
              {nextItem.label}
            </span>
          </div>
          <div className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-bg-elevated group-hover:bg-accent/10 text-text-muted group-hover:text-accent transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
