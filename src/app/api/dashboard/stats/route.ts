import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { requireDashboardAccess } from '@/lib/role-guard';

export async function GET() {
  try {
    const session = await requireDashboardAccess();

    let whereCondition = {};

    // Kalau OWNER, cuma liat bisnisnya sendiri
    if (session.role === 'OWNER') {
      whereCondition = { userId: session.id };
    }
    // Kalau ADMIN, liat semua bisnis

    const businesses = await prisma.business.findMany({
      where: whereCondition,
      include: {
        reviews: true,
        menus: true,
        category: true,
      },
    });

    const totalBusinesses = businesses.length;
    const totalReviews = businesses.reduce(
      (acc, b) => acc + b.reviews.length,
      0
    );
    const totalMenus = businesses.reduce((acc, b) => acc + b.menus.length, 0);

    let totalRating = 0;
    let ratingCount = 0;
    businesses.forEach((b) => {
      b.reviews.forEach((r) => {
        totalRating += r.rating;
        ratingCount++;
      });
    });
    const averageRating = ratingCount > 0 ? totalRating / ratingCount : 0;

    return NextResponse.json({
      totalBusinesses,
      totalReviews,
      totalMenus,
      averageRating,
      businesses,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
