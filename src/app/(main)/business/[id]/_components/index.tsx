'use client';

import { ArrowLeft, MapPin, Clock, Phone, Star, Utensils } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import ActionButtons from '@/components/business/ActionButtons';
import FavoriteButton from '@/components/business/FavoriteButton';

// ===== TYPES =====
interface User {
  id: string;
  name: string;
  email: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Menu {
  id: string;
  name: string;
  description: string | null;
  price: number;
  isAvailable: boolean;
}

interface Photo {
  id: string;
  url: string;
  isPrimary: boolean;
}

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  reply: string | null;
  createdAt: Date; // ✅ Bisa Date atau string
  user: User;
}

interface Business {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string | null;
  website: string | null;
  openTime: string | null;
  closeTime: string | null;
  operatingDays: string | null;
  description: string | null;
  category: Category;
  menus: Menu[];
  photos: Photo[];
  reviews: Review[];
}

interface BusinessDetailClientProps {
  business: Business;
  averageRating: number;
  isOpen: boolean;
}

// ===== COMPONENT =====
export default function BusinessDetailClient({
  business,
  averageRating,
  isOpen,
}: BusinessDetailClientProps) {
  const [showReservation, setShowReservation] = useState(false);

  // Helper untuk format tanggal
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

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

          {/* Action Buttons + Reservasi */}
          <div className="border-b border-gray-100 p-6">
            <ActionButtons business={business} />
            <div className="mt-4">
              <button
                onClick={() => setShowReservation(true)}
                className="w-full rounded-lg bg-orange-600 px-6 py-3 text-white transition-colors hover:bg-orange-700 md:w-auto"
              >
                📅 Reservasi Meja
              </button>
            </div>
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

            {/* Galeri */}
            {business.photos.length > 0 && (
              <div className="border-t border-gray-100 pt-4">
                <h2 className="mb-4 font-semibold text-gray-800">📸 Galeri</h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {business.photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative h-32 w-full overflow-hidden rounded-lg"
                    >
                      <Image
                        src={photo.url}
                        alt={business.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
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
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                    {review.reply && (
                      <div className="mt-3 rounded-r-lg border-l-2 border-green-400 bg-green-50/50 p-3 pl-4">
                        <p className="text-sm font-medium text-green-700">
                          👤 Owner:
                        </p>
                        <p className="text-sm text-gray-600">{review.reply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal Reservasi */}
      {showReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h2 className="text-xl font-bold text-gray-900">
              📅 Reservasi Meja
            </h2>
            <p className="mb-4 text-sm text-gray-500">Untuk {business.name}</p>
            <button
              onClick={() => setShowReservation(false)}
              className="mt-4 w-full rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
