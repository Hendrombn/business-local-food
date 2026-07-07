'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { User } from '@/types/user';

export function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session');

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });

    setUser(null);
    router.push('/login');
    router.refresh();
  };

  return {
    user,
    loading,
    logout,
  };
}
