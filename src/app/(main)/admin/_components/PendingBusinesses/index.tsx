'use client';

import styles from './PendingBusiness.module.css';
import PendingBusinessCard from './PendingBusinessCard';
import type { Business } from '../../_hooks/useAdmin';

interface PendingBusinessesProps {
  businesses: Business[];
  onVerify: (id: string, status: 'ACTIVE' | 'INACTIVE') => void;
}

export default function PendingBusinesses({
  businesses,
  onVerify,
}: PendingBusinessesProps) {
  if (businesses.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>✅</span>

        <h3>Semua bisnis sudah terverifikasi</h3>

        <p>Tidak ada bisnis yang menunggu persetujuan.</p>
      </div>
    );
  }

  return (
    <section className={styles.list}>
      {businesses.map((business) => (
        <PendingBusinessCard
          key={business.id}
          business={business}
          onVerify={onVerify}
        />
      ))}
    </section>
  );
}
