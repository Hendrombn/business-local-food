'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './AuthTabs.module.css';

export default function AuthTabs() {
  const pathname = usePathname();
  const isLogin = pathname === '/login';

  return (
    <div className={styles.tabs}>
      <Link
        href="/login"
        className={`${styles.tab} ${isLogin ? styles.active : ''}`}
      >
        Masuk
      </Link>
      <Link
        href="/register"
        className={`${styles.tab} ${!isLogin ? styles.active : ''}`}
      >
        Daftar
      </Link>
    </div>
  );
}
