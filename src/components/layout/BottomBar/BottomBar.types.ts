import type { ReactNode } from 'react';

export interface BottomBarItem {
  id?: string | number;
  href: string;
  label: string;
  icon: ReactNode;
  badge?: string | number;
  exact?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface BottomBarProps {
  items: BottomBarItem[];
  className?: string;
}
