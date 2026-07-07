import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import { getSession } from './auth';

// ===== Untuk Server Component (Pages) =====

// Untuk dashboard - ADMIN bisa akses semua, OWNER cuma bisnisnya sendiri
export async function requireDashboardAccess() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

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

// ===== Untuk API Routes =====

export async function requireAdminApi() {
  const session = await getSession();

  if (!session) {
    return {
      error: 'Unauthorized',
      response: NextResponse.json(
        { error: 'Silakan login terlebih dahulu' },
        { status: 401 }
      ),
    };
  }

  if (session.role !== 'ADMIN') {
    return {
      error: 'Forbidden',
      response: NextResponse.json(
        { error: 'Anda tidak memiliki akses sebagai admin' },
        { status: 403 }
      ),
    };
  }

  return {
    error: null,
    response: null,
    session,
  };
}

export async function requireOwnerApi() {
  const session = await getSession();

  if (!session) {
    return {
      error: 'Unauthorized',
      response: NextResponse.json(
        { error: 'Silakan login terlebih dahulu' },
        { status: 401 }
      ),
    };
  }

  if (session.role !== 'OWNER' && session.role !== 'ADMIN') {
    return {
      error: 'Forbidden',
      response: NextResponse.json(
        { error: 'Anda tidak memiliki akses sebagai owner' },
        { status: 403 }
      ),
    };
  }

  return {
    error: null,
    response: null,
    session,
  };
}
