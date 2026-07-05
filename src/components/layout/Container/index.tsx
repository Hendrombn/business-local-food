import styles from './Container.module.css';
import type { ContainerProps } from './Container.types';

export default function Container({
  children,
  size = 'lg',
  className,
  as: Component = 'div',
  ...props
}: ContainerProps) {
  const containerClasses = [styles.container, styles[size], className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={containerClasses} {...props}>
      {children}
    </Component>
  );
}
