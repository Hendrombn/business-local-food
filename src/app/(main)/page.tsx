'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';

import BusinessList from '@/components/business/BusinessList';
import BusinessFilter from '@/components/business/BussinessFilter';
import { useDebounce } from '@/hooks/useDebounce';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Business {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category: {
    id: string;
    name: string;
  };
  isOpen?: boolean;
}

interface User {
  name: string;
  role: string;
}

const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-100">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

export default function HomePage() {
  const router = useRouter();
  const [allBusinesses, setAllBusinesses] = useState<Business[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const debouncedSearch = useDebounce(searchQuery, 300);

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

  // Fetch all businesses (sekali aja)
  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/businesses');
        if (res.ok) {
          const data = await res.json();
          setAllBusinesses(data);
        }
      } catch (error) {
        console.error('Fetch businesses error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  // ✅ Filter businesses dengan debounced search
  const filteredBusinesses = useMemo(() => {
    let result = allBusinesses;

    // Filter by category
    if (selectedCategory) {
      result = result.filter((b) => b.category.id === selectedCategory);
    }

    // Filter by debounced search query
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.address.toLowerCase().includes(query) ||
          b.category.name.toLowerCase().includes(query)
      );
    }

    return result;
  }, [allBusinesses, selectedCategory, debouncedSearch]);

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
        {/* Map - 65% */}
        <div className="relative flex-[2] bg-gray-100">
          <Map businesses={filteredBusinesses} />
        </div>

        {/* Sidebar - 35% */}
        <div className="flex-1 overflow-y-auto border-l border-gray-200 bg-white p-4">
          {/* Filter */}
          <BusinessFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Business List */}
          {loading ? (
            <div className="flex justify-center py-8">
              <p className="text-gray-400">Memuat...</p>
            </div>
          ) : filteredBusinesses.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-400">Tidak ada bisnis ditemukan</p>
              <p className="mt-1 text-sm text-gray-300">
                Coba ubah filter atau kata kunci
              </p>
            </div>
          ) : (
            <BusinessList businesses={filteredBusinesses} />
          )}
        </div>
      </div>
    </div>
  );
}
