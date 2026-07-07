import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export interface NavbarProps {
  activePath?: string;
  onSearch?: (query: string) => void;
}
