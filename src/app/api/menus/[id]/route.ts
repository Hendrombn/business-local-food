import { NextResponse } from 'next/server';

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// PUT - Update menu
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'OWNER' && session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Anda tidak memiliki akses' },
        { status: 403 }
      );
    }

    const { id } = await params; // ← await params!

    const menu = await prisma.menu.findUnique({
      where: { id },
      include: { business: true },
    });

    if (!menu) {
      return NextResponse.json(
        { error: 'Menu tidak ditemukan' },
        { status: 404 }
      );
    }

    if (session.role === 'OWNER' && menu.business.userId !== session.id) {
      return NextResponse.json(
        { error: 'Anda tidak memiliki akses ke menu ini' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, description, price, isAvailable } = body;

    const updated = await prisma.menu.update({
      where: { id },
      data: {
        name: name || undefined,
        description: description || null,
        price: price !== undefined ? parseInt(price) : undefined,
        isAvailable: isAvailable !== undefined ? isAvailable : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update menu error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}

// DELETE - Hapus menu
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'OWNER' && session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Anda tidak memiliki akses' },
        { status: 403 }
      );
    }

    const { id } = await params; // ← await params!

    const menu = await prisma.menu.findUnique({
      where: { id },
      include: { business: true },
    });

    if (!menu) {
      return NextResponse.json(
        { error: 'Menu tidak ditemukan' },
        { status: 404 }
      );
    }

    if (session.role === 'OWNER' && menu.business.userId !== session.id) {
      return NextResponse.json(
        { error: 'Anda tidak memiliki akses ke menu ini' },
        { status: 403 }
      );
    }

    await prisma.menu.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete menu error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
