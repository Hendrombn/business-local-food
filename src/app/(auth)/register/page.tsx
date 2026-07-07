import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getSession } from '@/lib/auth';

import RegisterForm from './_components';

export const metadata: Metadata = {
  title: 'Daftar - Kuliner Lokal',
  description: 'Daftar akun Kuliner Lokal',
};

export const dynamic = 'force-dynamic';

export default async function RegisterPage() {
  const session = await getSession();

  // Kalau sudah login, redirect ke home
  if (session) {
    redirect('/');
  }

  return <RegisterForm />;
}
