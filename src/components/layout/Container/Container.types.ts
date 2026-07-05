import type { ElementType, HTMLAttributes, ReactNode } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fluid';
  as?: ElementType;
}
