import { NextResponse } from 'next/server';

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - Ambil detail bisnis
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params; // ← await params!

    const business = await prisma.business.findUnique({
      where: { id },
      include: {
        category: true,
        menus: true,
      },
    });

    if (!business) {
      return NextResponse.json(
        { error: 'Bisnis tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(business);
  } catch (error) {
    console.error('Get business error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}

// PUT - Update bisnis
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

    const business = await prisma.business.findUnique({
      where: { id },
    });

    if (!business) {
      return NextResponse.json(
        { error: 'Bisnis tidak ditemukan' },
        { status: 404 }
      );
    }

    if (session.role === 'OWNER' && business.userId !== session.id) {
      return NextResponse.json(
        { error: 'Anda tidak memiliki akses ke bisnis ini' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      name,
      categoryId,
      address,
      lat,
      lng,
      phone,
      website,
      description,
      openTime,
      closeTime,
      operatingDays,
      status,
    } = body;

    const updated = await prisma.business.update({
      where: { id },
      data: {
        name: name || undefined,
        categoryId: categoryId || undefined,
        address: address || undefined,
        lat: lat !== undefined ? parseFloat(lat) : undefined,
        lng: lng !== undefined ? parseFloat(lng) : undefined,
        phone: phone || null,
        website: website || null,
        description: description || null,
        openTime: openTime || null,
        closeTime: closeTime || null,
        operatingDays: operatingDays || null,
        status: status || undefined,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update business error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}

// DELETE - Hapus bisnis
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

    const business = await prisma.business.findUnique({
      where: { id },
    });

    if (!business) {
      return NextResponse.json(
        { error: 'Bisnis tidak ditemukan' },
        { status: 404 }
      );
    }

    if (session.role === 'OWNER' && business.userId !== session.id) {
      return NextResponse.json(
        { error: 'Anda tidak memiliki akses ke bisnis ini' },
        { status: 403 }
      );
    }

    await prisma.business.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete business error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
