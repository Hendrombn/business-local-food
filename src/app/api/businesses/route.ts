import type { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - Ambil bisnis (dengan filter status)
export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    // ✅ Debug log
    console.log('🔍 API Request:', {
      search,
      categoryId,
      status,
    });

    const where: Prisma.BusinessWhereInput = {};

    if (status) {
      where.status = status as any;
    } else {
      where.status = 'ACTIVE';
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search && search.trim() !== '') {
      where.OR = [
        { name: { contains: search.trim(), mode: 'insensitive' } },
        { description: { contains: search.trim(), mode: 'insensitive' } },
        { address: { contains: search.trim(), mode: 'insensitive' } },
      ];
      console.log('Search applied:', search.trim());
    }

    const businesses = await prisma.business.findMany({
      where,
      include: {
        category: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      take: 50,
    });

    console.log(' Businesses found:', businesses.length);

    return NextResponse.json(businesses);
  } catch (error) {
    console.error('❌ Fetch businesses error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}

// POST - Tambah bisnis baru (tetap sama)
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
