'use client';

import { useState, useEffect, useCallback } from 'react';

interface Business {
  id: string;
  name: string;
  address: string;
  category: {
    id: string;
    name: string;
  };
}

interface Favorite {
  id: string;
  businessId: string;
  business: Business;
  createdAt: string;
}

export function useFavorite() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Ambil semua favorit
  const fetchFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/favorites');
      if (res.ok) {
        const data = await res.json();
        setFavorites(data);
        setFavoriteIds(new Set(data.map((f: Favorite) => f.businessId)));
      }
    } catch (error) {
      console.error('Fetch favorites error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Tambah favorit
  const addFavorite = useCallback(async (businessId: string) => {
    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId }),
      });

      if (res.ok) {
        const data = await res.json();
        setFavorites((prev) => [data, ...prev]);
        setFavoriteIds((prev) => new Set(prev).add(businessId));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Add favorite error:', error);
      return false;
    }
  }, []);

  // Hapus favorit
  const removeFavorite = useCallback(async (businessId: string) => {
    try {
      const res = await fetch(`/api/favorites?businessId=${businessId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setFavorites((prev) => prev.filter((f) => f.businessId !== businessId));
        setFavoriteIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(businessId);
          return newSet;
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Remove favorite error:', error);
      return false;
    }
  }, []);

  // Toggle favorit
  const toggleFavorite = useCallback(
    async (businessId: string) => {
      if (favoriteIds.has(businessId)) {
        return await removeFavorite(businessId);
      } else {
        return await addFavorite(businessId);
      }
    },
    [favoriteIds, addFavorite, removeFavorite]
  );

  // Cek apakah bisnis di-favoritkan
  const isFavorited = useCallback(
    (businessId: string) => {
      return favoriteIds.has(businessId);
    },
    [favoriteIds]
  );

  // Auto fetch saat mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFavorites();
  }, [fetchFavorites]);

  return {
    favorites,
    favoriteIds,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorited,
    fetchFavorites,
  };
}
