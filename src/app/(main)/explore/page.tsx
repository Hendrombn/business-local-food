'use client';

import { Search, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';

import BusinessFilter from '@/components/business/BussinessFilter';
import { useDebounce } from '@/hooks/useDebounce';

interface Business {
  id: string;
  name: string;
  address: string;
  category: { name: string };
  rating?: number;
  isOpen?: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function ExplorePage() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // ✅ Debounce search query
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Fetch categories error:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch businesses dengan debounced search
  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        const url = new URL('/api/businesses', window.location.origin);
        if (selectedCategory) {
          url.searchParams.set('categoryId', selectedCategory);
        }
        if (debouncedSearch.trim()) {
          url.searchParams.set('search', debouncedSearch.trim());
        }

        const res = await fetch(url.toString());
        if (res.ok) {
          const data = await res.json();
          setBusinesses(data);
        }
      } catch (error) {
        console.error('Fetch businesses error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [selectedCategory, debouncedSearch]);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">🔍 Explore</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari bisnis atau menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>

        {/* Filter */}
        <BusinessFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-12">
            <p className="text-gray-400">Memuat...</p>
          </div>
        ) : businesses.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-400">Tidak ada bisnis ditemukan</p>
            <p className="mt-1 text-sm text-gray-300">
              Coba ubah filter atau kata kunci
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {businesses.map((business) => (
              <Link
                key={business.id}
                href={`/business/${business.id}`}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {business.name}
                      </h3>
                      <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                        {business.category.name}
                      </span>
                      <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                        <MapPin size={14} />
                        <span className="truncate">{business.address}</span>
                      </div>
                    </div>
                    {business.rating && (
                      <div className="ml-4 flex flex-col items-end">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star size={14} fill="currentColor" />
                          <span className="font-medium">{business.rating}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
