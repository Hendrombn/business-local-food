import { redirect } from 'next/navigation';

import { getSession } from './auth';

// Untuk dashboard - ADMIN bisa akses semua, OWNER cuma bisnisnya sendiri
export async function requireDashboardAccess() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  // ADMIN atau OWNER bisa akses dashboard
  if (session.role !== 'ADMIN' && session.role !== 'OWNER') {
    redirect('/');
  }

  return session;
}

export async function requireOwner() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  if (session.role !== 'OWNER' && session.role !== 'ADMIN') {
    redirect('/');
  }

  return session;
}

export async function requireAdmin() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  if (session.role !== 'ADMIN') {
    redirect('/');
  }

  return session;
}
