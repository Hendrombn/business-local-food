'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './BottomBar.module.css';
import type { BottomBarProps, BottomBarItem } from './BottomBar.types';

export default function BottomBar({ items, className }: BottomBarProps) {
  const pathname = usePathname();

  const isActive = (item: BottomBarItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname?.startsWith(item.href) ?? false;
  };

  const bottomBarClasses = [styles.bottomBar, className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={bottomBarClasses}>
      {items.map((item) => {
        const active = isActive(item);

        return (
          <Link
            key={item.id || item.href}
            href={item.href}
            className={[
              styles.item,
              active ? styles.active : '',
              item.disabled ? styles.disabled : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={item.onClick}
            aria-label={item.label}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
            {item.badge && <span className={styles.badge}>{item.badge}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
