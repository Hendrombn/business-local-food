import type { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - Sudah ada
export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');

    const where: Prisma.BusinessWhereInput = {
      status: 'ACTIVE',
    };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const businesses = await prisma.business.findMany({
      where,
      include: {
        category: true,
      },
      take: 50,
    });

    return NextResponse.json(businesses);
  } catch (error) {
    console.error('Fetch businesses error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}

// POST - Tambah bisnis baru
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Cek role (hanya OWNER atau ADMIN)
    if (session.role !== 'OWNER' && session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Anda tidak memiliki akses' },
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
    } = body;

    // Validasi
    if (
      !name ||
      !categoryId ||
      !address ||
      lat === undefined ||
      lng === undefined
    ) {
      return NextResponse.json(
        { error: 'Nama, kategori, alamat, dan lokasi wajib diisi' },
        { status: 400 }
      );
    }

    const business = await prisma.business.create({
      data: {
        userId: session.id,
        name,
        categoryId,
        address,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        phone: phone || null,
        website: website || null,
        description: description || null,
        openTime: openTime || null,
        closeTime: closeTime || null,
        operatingDays: operatingDays || null,
        status: 'ACTIVE',
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(business, { status: 201 });
  } catch (error) {
    console.error('Create business error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
