import { ArrowLeft, MapPin, Clock, Phone, Star, Utensils } from 'lucide-react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import ActionButtons from '@/components/business/ActionButtons'; // ✅ Tambah ini
import FavoriteButton from '@/components/business/FavoriteButton';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-green-600 transition-colors hover:text-green-700"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Kembali</span>
        </Link>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-6">
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          {/* Business Info */}
          <div className="border-b border-gray-100 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {business.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    {business.category.name}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={18} fill="currentColor" />
                    <span className="font-semibold text-gray-900">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-400">
                      ({business.reviews.length} ulasan)
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                  >
                    {isOpen ? '🟢 Buka' : '🔴 Tutup'}
                  </span>
                </div>
              </div>
              <FavoriteButton businessId={business.id} size="lg" showText />
            </div>
          </div>

          {/* ✅ ACTION BUTTONS - Tambah ini */}
          <div className="border-b border-gray-100 p-6">
            <ActionButtons business={business} />
          </div>

          {/* Details */}
          <div className="space-y-4 p-6">
            <div className="flex items-start gap-3">
              <MapPin
                size={20}
                className="mt-0.5 flex-shrink-0 text-gray-400"
              />
              <div>
                <p className="font-medium text-gray-700">Alamat</p>
                <p className="text-gray-600">{business.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={20} className="mt-0.5 flex-shrink-0 text-gray-400" />
              <div>
                <p className="font-medium text-gray-700">Telepon</p>
                <p className="text-gray-600">{business.phone ?? '-'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={20} className="mt-0.5 flex-shrink-0 text-gray-400" />
              <div>
                <p className="font-medium text-gray-700">Jam Operasional</p>
                <p className="text-gray-600">
                  {business.openTime ?? 'Belum diatur'} -{' '}
                  {business.closeTime ?? 'Belum diatur'}
                </p>
                {business.operatingDays && (
                  <p className="text-sm text-gray-500">
                    {business.operatingDays}
                  </p>
                )}
              </div>
            </div>

            {business.description && (
              <div className="border-t border-gray-100 pt-4">
                <p className="font-medium text-gray-700">Deskripsi</p>
                <p className="mt-1 text-gray-600">{business.description}</p>
              </div>
            )}
          </div>

          {/* Menu */}
          {business.menus.length > 0 && (
            <div className="border-t border-gray-100 p-6">
              <h2 className="mb-4 flex items-center gap-2 font-semibold text-gray-800">
                <Utensils size={18} />
                Menu
              </h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {business.menus.map((menu) => (
                  <div
                    key={menu.id}
                    className="rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-800">{menu.name}</p>
                        {menu.description && (
                          <p className="truncate text-sm text-gray-500">
                            {menu.description}
                          </p>
                        )}
                      </div>
                      <span className="ml-4 flex-shrink-0 font-semibold text-green-600">
                        Rp {menu.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {business.reviews.length > 0 && (
            <div className="border-t border-gray-100 p-6">
              <h2 className="mb-4 font-semibold text-gray-800">⭐ Ulasan</h2>
              <div className="space-y-4">
                {business.reviews.map((review) => (
                  <div key={review.id} className="rounded-lg bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">
                          {review.user.name}
                        </span>
                        <div className="flex items-center gap-0.5 text-yellow-500">
                          {Array.from({ length: review.rating }, (_, i) => (
                            <Star key={i} size={14} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString(
                          'id-ID',
                          {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }
                        )}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
