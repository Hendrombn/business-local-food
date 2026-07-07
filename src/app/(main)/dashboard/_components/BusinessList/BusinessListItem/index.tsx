'use client';

import { Edit, MessageSquare, Trash2, Utensils } from 'lucide-react';
import Link from 'next/link';

import styles from './BusinessListItem.module.css';
import type { Business } from '../../../Dashboard.types';

interface BusinessListItemProps {
  business: Business;
  deletingId: string | null;
  onDelete: (id: string) => void;
}

export default function BusinessListItem({
  business,
  deletingId,
  onDelete,
}: BusinessListItemProps) {
  return (
    <article className={styles.item}>
      <div className={styles.left}>
        <h3 className={styles.name}>{business.name}</h3>

        <span className={styles.category}>{business.category.name}</span>

        <div className={styles.meta}>
          <span>
            <MessageSquare size={14} />
            {business.reviews.length} Ulasan
          </span>

          <span>
            <Utensils size={14} />
            {business.menus.length} Menu
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        <Link
          href={`/dashboard/business/${business.id}/menus`}
          className={`${styles.actionButton} ${styles.orange}`}
        >
          <Utensils size={18} />
        </Link>

        <Link
          href={`/dashboard/business/${business.id}/edit`}
          className={`${styles.actionButton} ${styles.blue}`}
        >
          <Edit size={18} />
        </Link>

        <button
          onClick={() => onDelete(business.id)}
          disabled={deletingId === business.id}
          className={`${styles.actionButton} ${styles.red}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </article>
  );
}
