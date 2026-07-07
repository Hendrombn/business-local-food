'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// import LogoutButton from '@/components/auth/index';
import BusinessList from '@/components/business/BusinessList';
import BusinessFilter from '@/components/business/BussinessFilter';

import type { Business, Category, User } from './main.types';
// import SearchBar from '@/components/business/SeachBar';

const Map = dynamic(() => import('@/components/map/index'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-100">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

export default function HomePage() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push('/login');
        }
      } catch {
        router.push('/login');
      }
    };
    fetchUser();
  }, [router]);

  // Listen search event dari Navbar
  useEffect(() => {
    const handleSearchEvent = (e: CustomEvent) => {
      const { query } = e.detail;
      setSearchQuery(query);
    };

    window.addEventListener('search', handleSearchEvent as EventListener);
    return () => {
      window.removeEventListener('search', handleSearchEvent as EventListener);
    };
  }, []);

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

  // Fetch businesses with filter & search
  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        const url = new URL('/api/businesses', window.location.origin);
        if (selectedCategory) {
          url.searchParams.set('categoryId', selectedCategory);
        }
        if (searchQuery.trim()) {
          url.searchParams.set('search', searchQuery.trim());
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
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Main Content: Map + Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex-[2] bg-gray-100">
          <Map businesses={businesses} />
        </div>

        <div className="flex-1 overflow-y-auto border-l border-gray-200 bg-white p-4">
          <BusinessFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {loading ? (
            <div className="flex justify-center py-8">
              <p className="text-gray-400">Memuat...</p>
            </div>
          ) : businesses.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-400">Tidak ada bisnis ditemukan</p>
              <p className="mt-1 text-sm text-gray-300">
                Coba ubah filter atau kata kunci
              </p>
            </div>
          ) : (
            <BusinessList businesses={businesses} />
          )}
        </div>
      </div>
    </div>
  );
}
