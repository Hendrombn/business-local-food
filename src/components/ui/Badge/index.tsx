import styles from './Badge.module.css';
import type { BadgeProps } from './Badge.types';

export default function Badge({
  variant = 'neutral',
  dot = false,
  children,
}: BadgeProps) {
  return (
    <span className={[styles.badge, styles[variant]].join(' ')}>
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  );
}
