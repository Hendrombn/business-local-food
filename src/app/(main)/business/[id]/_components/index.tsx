'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import type { BusinessDetailClientProps } from '../BusinessDetail.types';
import styles from './BusinessDetailClient.module.css';
import BusinessGallery from '../_components/BusinessGallery';
import BusinessHero from '../_components/BusinessHero';
import BusinessMenuList from '../_components/BusinessMenuList';
import BusinessReviewList from '../_components/BusinessReviewList';
import BusinessSidebar from '../_components/BusinessSidebar';
import ReservationModal from '../_components/ReservationModal';

export default function BusinessDetailClient({
  business,
  averageRating,
  isOpen,
}: BusinessDetailClientProps) {
  const [showReservation, setShowReservation] = useState(false);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={20} />
          <span>Kembali</span>
        </Link>
      </header>

      <main className={styles.main}>
        <BusinessHero
          business={business}
          averageRating={averageRating}
          isOpen={isOpen}
        />

        <div className={styles.layout}>
          <div className={styles.sidebarCol}>
            <BusinessSidebar
              business={business}
              onReserveClick={() => setShowReservation(true)}
            />
          </div>

          <div className={styles.contentCol}>
            {business.description && (
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Deskripsi</h2>
                <p className={styles.description}>{business.description}</p>
              </div>
            )}

            {business.photos.length > 0 && (
              <BusinessGallery photos={business.photos} name={business.name} />
            )}

            {business.menus.length > 0 && (
              <BusinessMenuList menus={business.menus} />
            )}

            {business.reviews.length > 0 && (
              <BusinessReviewList reviews={business.reviews} />
            )}
          </div>
        </div>
      </main>

      {showReservation && (
        <ReservationModal
          businessName={business.name}
          onClose={() => setShowReservation(false)}
        />
      )}
    </div>
  );
}
