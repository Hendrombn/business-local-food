'use client';

import { useEffect } from 'react';

import { useFavorite } from '@/hooks/useFavorite';

import styles from './SavedPage.module.css';
import FavoriteEmpty from './_components/FavoriteEmpty';
import FavoriteGrid from './_components/FavoriteGrid';
import SavedHeader from './_components/SavedHeader';

export default function SavedPage() {
  const { favorites, loading, fetchFavorites } = useFavorite();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <div className={styles.page}>
      <SavedHeader total={favorites.length} />

      <main className={styles.container}>
        {loading ? (
          <div className={styles.loading}>Memuat bisnis favorit...</div>
        ) : favorites.length === 0 ? (
          <FavoriteEmpty />
        ) : (
          <FavoriteGrid favorites={favorites} />
        )}
      </main>
    </div>
  );
}
