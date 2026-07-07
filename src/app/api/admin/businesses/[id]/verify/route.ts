import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { requireAdminApi } from '@/lib/role-guard';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { error, response } = await requireAdminApi();
    if (error) {
      return response;
    }

    const { id } = await params;
    const { status } = await request.json();

    if (!['ACTIVE', 'INACTIVE', 'PENDING'].includes(status)) {
      return NextResponse.json(
        { error: 'Status tidak valid' },
        { status: 400 }
      );
    }

    const business = await prisma.business.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: true,
      },
    });

    return NextResponse.json(business);
  } catch (error) {
    console.error('Verify business error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
