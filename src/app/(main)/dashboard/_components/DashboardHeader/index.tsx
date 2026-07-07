'use client';

import { Plus, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

import styles from './DashboardHeader.module.css';
import type { DashboardHeaderProps } from '../../Dashboard.types';

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.titleWrapper}>
          <div className={styles.iconWrapper}>
            <LayoutDashboard size={24} />
          </div>

          <div>
            <h1 className={styles.title}>Dashboard</h1>

            <p className={styles.subtitle}>
              Halo, <strong>{user?.name}</strong>! Kelola bisnismu di sini.
            </p>
          </div>
        </div>
      </div>

      <Link href="/dashboard/business/new" className={styles.button}>
        <Plus size={20} />

        <span>Tambah Bisnis</span>
      </Link>
    </header>
  );
}
