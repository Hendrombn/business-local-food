'use client';

import { Users, Store, MessageSquare, Clock3, ShieldAlert } from 'lucide-react';

import styles from './AdminStats.module.css';
import type { Stats } from '../../_hooks/useAdmin';

interface AdminStatsProps {
  stats: Stats;
}

export default function AdminStats({ stats }: AdminStatsProps) {
  const cards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      variant: 'blue',
    },
    {
      title: 'Total Bisnis',
      value: stats.totalBusinesses,
      icon: Store,
      variant: 'green',
    },
    {
      title: 'Total Ulasan',
      value: stats.totalReviews,
      icon: MessageSquare,
      variant: 'purple',
    },
    {
      title: 'Pending Verifikasi',
      value: stats.pendingBusinesses,
      icon: Clock3,
      variant: 'yellow',
    },
    {
      title: 'Reported Ulasan',
      value: stats.reportedReviews,
      icon: ShieldAlert,
      variant: 'red',
    },
  ];

  return (
    <section className={styles.grid}>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.title}
            className={`${styles.card} ${styles[card.variant]}`}
          >
            <div className={styles.icon}>
              <Icon size={24} />
            </div>

            <div className={styles.content}>
              <span className={styles.value}>{card.value}</span>

              <span className={styles.title}>{card.title}</span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
