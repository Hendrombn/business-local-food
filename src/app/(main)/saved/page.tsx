'use client';

import { Heart, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import FavoriteButton from '@/components/business/FavoriteButton';
import { useFavorite } from '@/hooks/useFavorite';

export default function SavedPage() {
  const router = useRouter();
  const { favorites, loading, fetchFavorites } = useFavorite();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <button
            onClick={() => router.back()}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100"
            aria-label="Kembali"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">❤️ Favorit Saya</h1>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <p className="text-gray-400">Memuat...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="py-16 text-center">
            <Heart size={64} className="mx-auto text-gray-300" />
            <h2 className="mt-4 text-xl font-semibold text-gray-700">
              Belum Ada Favorit
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-gray-400">
              Mulai simpan bisnis favoritmu dengan menekan tombol ❤️ di setiap
              bisnis
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-2.5 text-white transition-colors hover:bg-green-700"
            >
              Cari Bisnis
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <Link
                  href={`/business/${fav.business.id}`}
                  className="block p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-gray-900">
                        {fav.business.name}
                      </h3>
                      <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                        {fav.business.category.name}
                      </span>
                      <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                        <MapPin size={14} className="flex-shrink-0" />
                        <span className="truncate">{fav.business.address}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <FavoriteButton businessId={fav.business.id} size="sm" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
