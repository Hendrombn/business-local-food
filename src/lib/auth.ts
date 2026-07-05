import { cookies } from 'next/headers';

import { prisma } from './prisma';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return null;
    }

    let sessionData;
    try {
      sessionData = JSON.parse(sessionCookie.value);
    } catch {
      // Cookie rusak, hapus
      cookieStore.set('session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
      });
      return null;
    }

    // Verifikasi user masih ada di database
    const user = await prisma.user.findUnique({
      where: { id: sessionData.id },
    });

    if (!user) {
      // User udah dihapus dari DB, hapus cookie
      cookieStore.set('session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
      });
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    };
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

// Alias untuk konsistensi
export const auth = getSession;
