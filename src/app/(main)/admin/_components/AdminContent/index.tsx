'use client';

import type { Business, Review } from '../../_hooks/useAdmin';
import PendingBusinesses from '../PendingBusinesses';
import ReportedReviews from '../ReportedReviews';
import styles from './AdminContent.module.css';

type Tab = 'stats' | 'businesses' | 'reviews';

interface AdminContentProps {
  activeTab: Tab;
  pendingBusinesses: Business[];
  reportedReviews: Review[];
  onVerify: (id: string, status: 'ACTIVE' | 'INACTIVE') => void;
  onModerate: (id: string, status: 'ACTIVE' | 'HIDDEN') => void;
}

export default function AdminContent({
  activeTab,
  pendingBusinesses,
  reportedReviews,
  onVerify,
  onModerate,
}: AdminContentProps) {
  if (activeTab === 'stats') {
    return null;
  }

  if (activeTab === 'businesses') {
    return (
      <section className={styles.card}>
        <header className={styles.header}>
          <h2>Verifikasi Bisnis</h2>
          <p>Approve atau reject bisnis yang mendaftar.</p>
        </header>

        <PendingBusinesses businesses={pendingBusinesses} onVerify={onVerify} />
      </section>
    );
  }

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <h2>Moderasi Ulasan</h2>
        <p>Tinjau ulasan yang dilaporkan oleh pengguna.</p>
      </header>

      <ReportedReviews reviews={reportedReviews} onModerate={onModerate} />
    </section>
  );
}
