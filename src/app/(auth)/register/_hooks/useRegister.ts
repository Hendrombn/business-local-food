'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useRegister() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak sama');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password minimal 8 karakter');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? 'Terjadi kesalahan, coba lagi');
        return;
      }

      // Redirect ke login setelah register berhasil
      router.push('/login?registered=true');
    } catch {
      setError('Terjadi kesalahan, coba lagi');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, handleSubmit };
}
