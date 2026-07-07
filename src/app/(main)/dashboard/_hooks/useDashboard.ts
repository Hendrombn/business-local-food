'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import type { Stats, User } from '../Dashboard.types';

export function useDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch user
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/session');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push('/login');
      }
    } catch {
      router.push('/login');
    }
  }, [router]);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Fetch stats error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete business
  const deleteBusiness = useCallback(async (id: string) => {
    if (!confirm('Yakin ingin menghapus bisnis ini?')) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/businesses/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setStats((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            businesses: prev.businesses.filter((b) => b.id !== id),
            totalBusinesses: prev.totalBusinesses - 1,
          };
        });
      }
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setDeletingId(null);
    }
  }, []);

  // Load data on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUser();
    fetchStats();
  }, [fetchUser, fetchStats]);

  return {
    stats,
    user,
    loading,
    deletingId,
    deleteBusiness,
    refetch: fetchStats,
  };
}
