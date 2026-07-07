import { Star, Utensils } from 'lucide-react';
import Image from 'next/image';

import FavoriteButton from '@/components/business/FavoriteButton';

import styles from './BusinessHero.module.css';
import type { BusinessDetailClientProps } from '../../BusinessDetail.types';

type Business = BusinessDetailClientProps['business'];

interface BusinessHeroProps {
  business: Business;
  averageRating: number;
  isOpen: boolean;
}

export default function BusinessHero({
  business,
  averageRating,
  isOpen,
}: BusinessHeroProps) {
  const coverPhoto =
    business.photos.find((p) => p.isPrimary) ?? business.photos[0];

  return (
    <div className={styles.hero}>
      <div className={styles.heroMedia}>
        {coverPhoto ? (
          <Image
            src={coverPhoto.url}
            alt={business.name}
            fill
            priority
            className={styles.heroImage}
            sizes="100vw"
          />
        ) : (
          <div className={styles.heroPlaceholder}>
            <Utensils size={64} />
          </div>
        )}
        <div className={styles.heroScrim} />

        <div className={styles.favoriteWrap}>
          <FavoriteButton businessId={business.id} size="lg" />
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.title}>{business.name}</h1>
          <div className={styles.badges}>
            <span className={styles.badge}>{business.category.name}</span>

            <span className={`${styles.badge} ${styles.badgeRating}`}>
              <Star size={14} className={styles.starIcon} fill="currentColor" />
              {averageRating.toFixed(1)}
              <span className={styles.badgeMuted}>
                ({business.reviews.length})
              </span>
            </span>

            <span
              className={`${styles.statusBadge} ${
                isOpen ? styles.statusOpen : styles.statusClosed
              }`}
            >
              <span className={styles.statusDot} />
              {isOpen ? 'Buka' : 'Tutup'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
