import { Star } from 'lucide-react';

import styles from './BusinessReviewList.module.css';
import type { BusinessDetailClientProps } from '../../BusinessDetail.types';

type Business = BusinessDetailClientProps['business'];
type Review = Business['reviews'][number];

interface BusinessReviewListProps {
  reviews: Review[];
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BusinessReviewList({
  reviews,
}: BusinessReviewListProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>⭐ Ulasan</h2>
      <div className={styles.list}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.item}>
            <div className={styles.itemHeader}>
              <div className={styles.reviewer}>
                <span className={styles.reviewerName}>{review.user.name}</span>
                <div className={styles.stars}>
                  {Array.from({ length: review.rating }, (_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
              <span className={styles.date}>
                {formatDate(review.createdAt)}
              </span>
            </div>

            <p className={styles.comment}>{review.comment}</p>

            {review.reply && (
              <div className={styles.reply}>
                <p className={styles.replyLabel}>👤 Owner:</p>
                <p className={styles.replyText}>{review.reply}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
