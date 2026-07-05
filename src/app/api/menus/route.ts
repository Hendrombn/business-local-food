import { NextResponse } from 'next/server';

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - Ambil semua menu (bisa filter by businessId)
export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('businessId');

    const where: any = {};
    if (businessId) {
      where.businessId = businessId;
    }

    const menus = await prisma.menu.findMany({
      where,
      include: {
        business: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(menus);
  } catch (error) {
    console.error('Fetch menus error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}

// POST - Tambah menu baru
export async function POST(request: Request) {
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

    const body = await request.json();
    const { businessId, name, description, price, isAvailable } = body;

    if (!businessId || !name || price === undefined) {
      return NextResponse.json(
        { error: 'Business ID, nama, dan harga wajib diisi' },
        { status: 400 }
      );
    }

    // Cek kepemilikan bisnis
    const business = await prisma.business.findUnique({
      where: { id: businessId },
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

    const menu = await prisma.menu.create({
      data: {
        businessId,
        name,
        description: description || null,
        price: parseInt(price),
        isAvailable: isAvailable !== undefined ? isAvailable : true,
      },
      include: {
        business: true,
      },
    });

    return NextResponse.json(menu, { status: 201 });
  } catch (error) {
    console.error('Create menu error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
