'use client';

import { ArrowLeft, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

import styles from './SavedHeader.module.css';

interface SavedHeaderProps {
  total: number;
}

export default function SavedHeader({ total }: SavedHeaderProps) {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button
          onClick={() => router.back()}
          className={styles.backButton}
          aria-label="Kembali"
        >
          <ArrowLeft size={22} />
        </button>

        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <Heart size={22} className={styles.icon} fill="currentColor" />
            <h1 className={styles.title}>Favorit Saya</h1>
          </div>

          <p className={styles.subtitle}>
            {total === 0
              ? 'Belum ada bisnis favorit'
              : `${total} bisnis tersimpan`}
          </p>
        </div>
      </div>
    </header>
  );
}
