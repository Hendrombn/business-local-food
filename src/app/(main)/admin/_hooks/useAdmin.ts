'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

export interface Stats {
  totalUsers: number;
  totalBusinesses: number;
  totalReviews: number;
  pendingBusinesses: number;
  reportedReviews: number;
}

export interface Business {
  id: string;
  name: string;
  address: string;
  status: string;
  user: { name: string; email: string };
  category: { name: string };
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  status: string;
  user: { name: string };
  business: { name: string };
}

export function useAdmin() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [pendingBusinesses, setPendingBusinesses] = useState<Business[]>([]);
  const [reportedReviews, setReportedReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'stats' | 'businesses' | 'reviews'
  >('stats');

  // Fetch admin data
  const fetchAdminData = useCallback(async () => {
    try {
      // Cek session dulu
      const sessionRes = await fetch('/api/auth/session');
      if (!sessionRes.ok) {
        router.push('/login');
        return;
      }
      const sessionData = await sessionRes.json();
      if (sessionData.user?.role !== 'ADMIN') {
        router.push('/');
        return;
      }

      // Fetch stats
      const statsRes = await fetch('/api/admin/stats');
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data);
      }

      // Fetch pending businesses
      const bizRes = await fetch('/api/businesses?status=PENDING');
      if (bizRes.ok) {
        const data = await bizRes.json();
        setPendingBusinesses(data);
      }

      // Fetch reported reviews
      const reviewRes = await fetch('/api/reviews?status=REPORTED');
      if (reviewRes.ok) {
        const data = await reviewRes.json();
        setReportedReviews(data);
      }
    } catch (error) {
      console.error('Fetch admin data error:', error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Verify business
  const handleVerifyBusiness = useCallback(
    async (id: string, status: 'ACTIVE' | 'INACTIVE') => {
      try {
        const res = await fetch(`/api/admin/businesses/${id}/verify`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        });
        if (res.ok) {
          setPendingBusinesses((prev) => prev.filter((b) => b.id !== id));
          setStats((prev) =>
            prev
              ? {
                  ...prev,
                  pendingBusinesses: prev.pendingBusinesses - 1,
                }
              : null
          );
        }
      } catch (error) {
        console.error('Verify error:', error);
      }
    },
    []
  );

  // Moderate review
  const handleModerateReview = useCallback(
    async (id: string, status: 'ACTIVE' | 'HIDDEN') => {
      try {
        const res = await fetch(`/api/admin/reviews/${id}/moderate`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        });
        if (res.ok) {
          setReportedReviews((prev) => prev.filter((r) => r.id !== id));
          setStats((prev) =>
            prev
              ? {
                  ...prev,
                  reportedReviews: prev.reportedReviews - 1,
                }
              : null
          );
        }
      } catch (error) {
        console.error('Moderate error:', error);
      }
    },
    []
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAdminData();
  }, [fetchAdminData]);

  return {
    stats,
    pendingBusinesses,
    reportedReviews,
    loading,
    activeTab,
    setActiveTab,
    handleVerifyBusiness,
    handleModerateReview,
  };
}
