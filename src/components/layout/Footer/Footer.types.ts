import type { ReactNode } from 'react';

export interface FooterLink {
  id?: string | number;
  href: string;
  label: string;
}

export interface SocialLink {
  id?: string | number;
  href: string;
  label: string;
  icon: ReactNode;
}

export interface FooterProps {
  links?: FooterLink[];
  copyright?: string;
  className?: string;
  socialLinks?: SocialLink[];
}
