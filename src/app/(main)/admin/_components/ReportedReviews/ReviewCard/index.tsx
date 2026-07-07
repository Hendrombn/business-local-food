'use client';

import { Eye, EyeOff, Star } from 'lucide-react';

import styles from './ReviewCard.module.css';
import type { Review } from '../../../_hooks/useAdmin';

interface ReviewCardProps {
  review: Review;
  onModerate: (id: string, status: 'ACTIVE' | 'HIDDEN') => void;
}

export default function ReviewCard({ review, onModerate }: ReviewCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3>{review.user.name}</h3>

          <span>{review.business.name}</span>
        </div>

        <div className={styles.rating}>
          {Array.from({ length: review.rating }).map((_, index) => (
            <Star
              key={index}
              size={16}
              className={styles.star}
              fill="currentColor"
            />
          ))}
        </div>

        <p className={styles.comment}>{review.comment}</p>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.showButton}
          onClick={() => onModerate(review.id, 'ACTIVE')}
        >
          <Eye size={18} />

          <span>Tampilkan</span>
        </button>

        <button
          className={styles.hideButton}
          onClick={() => onModerate(review.id, 'HIDDEN')}
        >
          <EyeOff size={18} />

          <span>Sembunyikan</span>
        </button>
      </div>
    </article>
  );
}
