'use client';

import styles from './ReportedReviews.module.css';
import ReviewCard from './ReviewCard';
import type { Review } from '../../_hooks/useAdmin';

interface ReportedReviewsProps {
  reviews: Review[];
  onModerate: (id: string, status: 'ACTIVE' | 'HIDDEN') => void;
}

export default function ReportedReviews({
  reviews,
  onModerate,
}: ReportedReviewsProps) {
  if (reviews.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.icon}>✅</span>

        <h3>Tidak ada ulasan yang dilaporkan</h3>

        <p>Semua ulasan saat ini dalam kondisi aman.</p>
      </div>
    );
  }

  return (
    <section className={styles.list}>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} onModerate={onModerate} />
      ))}
    </section>
  );
}
