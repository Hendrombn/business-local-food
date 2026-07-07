import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { requireAdminApi } from '@/lib/role-guard';

export async function GET() {
  try {
    const { error, response, session } = await requireAdminApi();
    if (error) {
      return response;
    }

    const [
      totalUsers,
      totalBusinesses,
      totalReviews,
      pendingBusinesses,
      reportedReviews,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.business.count(),
      prisma.review.count(),
      prisma.business.count({ where: { status: 'PENDING' } }),
      prisma.review.count({ where: { status: 'REPORTED' } }),
    ]);

    return NextResponse.json({
      totalUsers,
      totalBusinesses,
      totalReviews,
      pendingBusinesses,
      reportedReviews,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
