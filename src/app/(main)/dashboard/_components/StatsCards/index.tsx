'use client';

import { MessageSquare, Star, Store, Utensils } from 'lucide-react';

import styles from './StatsCards.module.css';
import type { StatsCardsProps } from '../../Dashboard.types';

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: 'Bisnis',
      value: stats.totalBusinesses,
      icon: Store,
      variant: 'green',
    },
    {
      label: 'Rating Rata-rata',
      value: stats.averageRating.toFixed(1),
      icon: Star,
      variant: 'yellow',
    },
    {
      label: 'Ulasan',
      value: stats.totalReviews,
      icon: MessageSquare,
      variant: 'blue',
    },
    {
      label: 'Menu',
      value: stats.totalMenus,
      icon: Utensils,
      variant: 'orange',
    },
  ];

  return (
    <section className={styles.grid}>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article key={card.label} className={styles.card}>
            <div className={`${styles.iconWrapper} ${styles[card.variant]}`}>
              <Icon size={22} />
            </div>

            <div className={styles.content}>
              <h3 className={styles.value}>{card.value}</h3>

              <p className={styles.label}>{card.label}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
