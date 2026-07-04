import type { ReactNode } from 'react';
import { PageNavigation } from '../components/PageNavigation';

interface MdxLayoutProps {
  children: ReactNode;
}

/** Wraps MDX content with prose styling */
export function MdxLayout({ children }: MdxLayoutProps) {
  return (
    <article className="prose">
      {children}
      <PageNavigation />
    </article>
  );
}
