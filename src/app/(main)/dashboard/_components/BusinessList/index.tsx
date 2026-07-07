'use client';

import { Store } from 'lucide-react';
import Link from 'next/link';

import styles from './BusinessList.module.css';
import BusinessListItem from './BusinessListItem';
import type { BusinessListProps } from '../../Dashboard.types';

export default function BusinessList({
  businesses,
  deletingId,
  onDelete,
}: BusinessListProps) {
  if (businesses.length === 0) {
    return (
      <section className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <Store size={44} />
        </div>

        <h3 className={styles.emptyTitle}>Belum ada bisnis</h3>

        <p className={styles.emptyDescription}>
          Tambahkan bisnis pertamamu untuk mulai mengelola menu dan ulasan.
        </p>

        <Link href="/dashboard/business/new" className={styles.emptyButton}>
          Tambah Bisnis
        </Link>
      </section>
    );
  }

  return (
    <div className={styles.list}>
      {businesses.map((business) => (
        <BusinessListItem
          key={business.id}
          business={business}
          deletingId={deletingId}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
