import { MapPin, Star, LocateFixed, CircleDot } from 'lucide-react';
import Link from 'next/link';

import styles from './Business.module.css';
import type { BusinessListProps } from './BusinessList.types';
import FavoriteButton from '../FavoriteButton';

export default function BusinessList({ businesses }: BusinessListProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <LocateFixed size={20} className={styles.titleIcon} />
          Bisnis Terdekat
        </h2>
        <p className={styles.subtitle}>
          {businesses.length} bisnis ditemukan di sekitarmu
        </p>
      </div>

      <div className={styles.list}>
        {businesses.map((business) => (
          <Link
            key={business.id}
            href={`/business/${business.id}`}
            className={styles.card}
          >
            <div className={styles.cardContent}>
              <div className={styles.cardLeft}>
                <h3 className={styles.businessName}>{business.name}</h3>
                <div className={styles.categoryWrapper}>
                  <span className={styles.category}>
                    {business.category?.name || 'Umum'}
                  </span>
                </div>
                <div className={styles.addressWrapper}>
                  <MapPin size={14} className={styles.addressIcon} />
                  <span className={styles.address}>{business.address}</span>
                </div>
              </div>

              <div className={styles.cardRight}>
                <FavoriteButton businessId={business.id} size="sm" />

                <span
                  className={`${styles.status} ${
                    business.isOpen ? styles.statusOpen : styles.statusClosed
                  }`}
                >
                  <CircleDot size={10} className={styles.statusIcon} />
                  {business.isOpen ? 'Buka' : 'Tutup'}
                </span>

                {business.rating && (
                  <div className={styles.rating}>
                    <Star size={14} className={styles.ratingIcon} />
                    <span>{business.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
