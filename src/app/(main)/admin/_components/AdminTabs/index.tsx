'use client';

import { BarChart3, Building2, ShieldAlert } from 'lucide-react';

import styles from './AdminTabs.module.css';
import type { Stats } from '../../_hooks/useAdmin';

type Tab = 'stats' | 'businesses' | 'reviews';

interface AdminTabsProps {
  activeTab: Tab;
  stats: Stats;
  onChange: (tab: Tab) => void;
}

interface TabItem {
  key: Tab;
  label: string;
  icon: typeof BarChart3;
  badge?: number;
}

export default function AdminTabs({
  activeTab,
  stats,
  onChange,
}: AdminTabsProps) {
  const tabs: TabItem[] = [
    {
      key: 'stats',
      label: 'Statistik',
      icon: BarChart3,
    },
    {
      key: 'businesses',
      label: 'Verifikasi',
      badge: stats.pendingBusinesses,
      icon: Building2,
    },
    {
      key: 'reviews',
      label: 'Moderasi',
      badge: stats.reportedReviews,
      icon: ShieldAlert,
    },
  ];

  return (
    <nav className={styles.tabs}>
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`${styles.tab} ${
              activeTab === tab.key ? styles.active : ''
            }`}
          >
            <Icon size={18} />

            <span>{tab.label}</span>

            {tab.badge !== undefined && (
              <span className={styles.badge}>{tab.badge}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
