import { MapPin, Store } from 'lucide-react';
import Link from 'next/link';

import FavoriteButton from '@/components/business/FavoriteButton';
import type { Favorite } from '@/hooks/useFavorite';

import styles from './FavoriteCard.module.css';

interface FavoriteCardProps {
  favorite: Favorite;
}

export default function FavoriteCard({ favorite }: FavoriteCardProps) {
  const { business } = favorite;

  return (
    <article className={styles.card}>
      <Link href={`/business/${business.id}`} className={styles.link}>
        <div className={styles.header}>
          <div className={styles.businessInfo}>
            <div className={styles.storeIcon}>
              <Store size={18} />
            </div>

            <div>
              <h3 className={styles.name}>{business.name}</h3>

              <span className={styles.category}>{business.category.name}</span>
            </div>
          </div>

          <FavoriteButton businessId={business.id} size="sm" />
        </div>

        <div className={styles.address}>
          <MapPin size={16} />

          <span>{business.address}</span>
        </div>
      </Link>
    </article>
  );
}
