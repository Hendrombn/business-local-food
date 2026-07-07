import { notFound, redirect } from 'next/navigation';

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

import BusinessDetailClient from './_components';

interface BusinessDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BusinessDetailPage({
  params,
}: BusinessDetailPageProps) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const { id } = await params;

  const business = await prisma.business.findUnique({
    where: { id: id },
    include: {
      category: true,
      menus: true,
      photos: true,
      reviews: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!business) {
    notFound();
  }

  // Konversi data Prisma ke format yang sesuai dengan Business type di client
  const businessData = {
    id: business.id,
    name: business.name,
    address: business.address,
    lat: business.lat,
    lng: business.lng,
    phone: business.phone,
    website: business.website,
    openTime: business.openTime,
    closeTime: business.closeTime,
    operatingDays: business.operatingDays,
    description: business.description,
    category: {
      id: business.category.id,
      name: business.category.name,
      slug: business.category.slug,
    },
    menus: business.menus.map((menu) => ({
      id: menu.id,
      name: menu.name,
      description: menu.description,
      price: menu.price,
      isAvailable: menu.isAvailable,
    })),
    photos: business.photos.map((photo) => ({
      id: photo.id,
      url: photo.url,
      isPrimary: photo.isPrimary,
    })),
    reviews: business.reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      reply: review.reply,
      createdAt: review.createdAt,
      user: {
        id: review.user.id,
        name: review.user.name,
        email: review.user.email,
      },
    })),
  };

  const averageRating =
    business.reviews.length > 0
      ? business.reviews.reduce((acc, r) => acc + r.rating, 0) /
        business.reviews.length
      : 0;

  const openTime = business.openTime ?? '00:00';
  const closeTime = business.closeTime ?? '00:00';

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;

  const [openHour, openMinute] = openTime.split(':').map(Number);
  const [closeHour, closeMinute] = closeTime.split(':').map(Number);
  const openTimeMinutes = openHour * 60 + openMinute;
  const closeTimeMinutes = closeHour * 60 + closeMinute;
  const isOpen =
    currentTime >= openTimeMinutes && currentTime <= closeTimeMinutes;

  return (
    <BusinessDetailClient
      business={businessData}
      averageRating={averageRating}
      isOpen={isOpen}
    />
  );
}
