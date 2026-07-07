import { NextResponse } from 'next/server';

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { reply } = await request.json();

    if (!reply) {
      return NextResponse.json(
        { error: 'Balasan tidak boleh kosong' },
        { status: 400 }
      );
    }

    // Cek review
    const review = await prisma.review.findUnique({
      where: { id },
      include: { business: true },
    });

    if (!review) {
      return NextResponse.json(
        { error: 'Review tidak ditemukan' },
        { status: 404 }
      );
    }

    // Cek kepemilikan (hanya owner atau admin yang bisa reply)
    if (session.role === 'OWNER' && review.business.userId !== session.id) {
      return NextResponse.json(
        { error: 'Anda tidak memiliki akses ke review ini' },
        { status: 403 }
      );
    }

    const updated = await prisma.review.update({
      where: { id },
      data: { reply },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Reply error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
