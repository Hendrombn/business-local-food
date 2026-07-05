import type { ReactNode } from 'react';

export interface SidebarItem {
  id?: string | number;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  children?: Omit<SidebarItem, 'children'>[];
}

export interface SidebarProps {
  items: SidebarItem[];
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
}
