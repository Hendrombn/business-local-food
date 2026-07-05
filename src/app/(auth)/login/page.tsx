import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getSession } from '@/lib/auth';

import LoginForm from './_components';

export const metadata: Metadata = {
  title: 'Masuk - Kuliner Lokal',
  description: 'Masuk ke akun Kuliner Lokal',
};

export default async function LoginPage() {
  const session = await getSession();

  // Kalau sudah login, redirect ke home
  if (session) {
    redirect('/');
  }

  return <LoginForm />;
}
