'use client';

import { ShieldCheck } from 'lucide-react';

import styles from './AdminHeader.module.css';

export default function AdminHeader() {
  return (
    <header className={styles.header}>
      <div>
        <div className={styles.titleWrapper}>
          <div className={styles.icon}>
            <ShieldCheck size={26} />
          </div>

          <div>
            <h1 className={styles.title}>Admin Portal</h1>

            <p className={styles.subtitle}>
              Kelola verifikasi bisnis, moderasi ulasan, dan statistik sistem.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
