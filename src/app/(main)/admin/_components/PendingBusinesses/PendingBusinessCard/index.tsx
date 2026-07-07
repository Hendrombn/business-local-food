'use client';

import { CheckCircle, XCircle } from 'lucide-react';

import styles from './PendingBusinessCard.module.css';
import type { Business } from '../../../_hooks/useAdmin';

interface PendingBusinessCardProps {
  business: Business;
  onVerify: (id: string, status: 'ACTIVE' | 'INACTIVE') => void;
}

export default function PendingBusinessCard({
  business,
  onVerify,
}: PendingBusinessCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <h3>{business.name}</h3>

        <span className={styles.category}>{business.category.name}</span>

        <p>{business.address}</p>

        <small>
          {business.user.name} • {business.user.email}
        </small>
      </div>

      <div className={styles.actions}>
        <button
          onClick={() => onVerify(business.id, 'ACTIVE')}
          className={styles.approve}
        >
          <CheckCircle size={18} />
          Approve
        </button>

        <button
          onClick={() => onVerify(business.id, 'INACTIVE')}
          className={styles.reject}
        >
          <XCircle size={18} />
          Reject
        </button>
      </div>
    </article>
  );
}
