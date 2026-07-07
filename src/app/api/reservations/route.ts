import { NextResponse } from 'next/server';

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { businessId, date, time, guests, notes } = await request.json();

    const reservation = await prisma.reservation.create({
      data: {
        businessId,
        userId: session.id,
        date: new Date(date),
        time,
        guests: parseInt(guests),
        status: 'PENDING',
      },
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error('Reservation error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
