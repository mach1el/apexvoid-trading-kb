import { Link, useLocation } from 'react-router-dom';
import { flattenNav, navigation } from '../content/nav';

export function PageNavigation() {
  const location = useLocation();
  const flatNav = flattenNav();
  
  const currentIndex = flatNav.findIndex((item) => item.path === location.pathname);
  
  if (currentIndex === -1) return null;

  const prevItem = currentIndex > 0 ? flatNav[currentIndex - 1] : null;
  const nextItem = currentIndex < flatNav.length - 1 ? flatNav[currentIndex + 1] : null;

  // Helper to find the section label for an item
  const getSectionLabel = (path: string) => {
    for (const section of navigation) {
      if (section.items.some(i => i.path === path)) {
        return section.label;
      }
    }
    return '';
  };

  return (
    <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      {prevItem ? (
        <Link 
          to={prevItem.path} 
          className="flex-1 group flex flex-col items-start gap-1 p-4 rounded-xl border border-border bg-bg-base hover:bg-bg-elevated hover:border-accent/40 transition-colors no-underline"
        >
          <span className="text-xs text-text-muted font-medium uppercase tracking-wider flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </span>
          <span className="text-base text-accent font-semibold group-hover:text-accent-light transition-colors">
            {prevItem.label}
          </span>
          <span className="text-xs text-text-muted hidden sm:block">
            {getSectionLabel(prevItem.path)}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {nextItem ? (
        <Link 
          to={nextItem.path} 
          className="flex-1 group flex flex-col items-end gap-1 p-4 rounded-xl border border-border bg-bg-base hover:bg-bg-elevated hover:border-accent/40 transition-colors no-underline text-right"
        >
          <span className="text-xs text-text-muted font-medium uppercase tracking-wider flex items-center gap-1">
            Next
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <span className="text-base text-accent font-semibold group-hover:text-accent-light transition-colors">
            {nextItem.label}
          </span>
          <span className="text-xs text-text-muted hidden sm:block">
            {getSectionLabel(nextItem.path)}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
