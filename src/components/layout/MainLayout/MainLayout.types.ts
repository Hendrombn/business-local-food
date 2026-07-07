import type { ReactNode } from 'react';

export interface MainLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  showFooter?: boolean;
  className?: string;
}
