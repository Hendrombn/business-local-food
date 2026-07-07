'use client';

import { useState } from 'react';

import BottomNav from '@/components/layout/BottomNav';
import Navbar from '@/components/layout/Navbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Trigger refetch di home page (via context atau window event)
    window.dispatchEvent(new CustomEvent('search', { detail: { query } }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="hidden md:block">
        <Navbar onSearch={handleSearch} />
      </div>
      <main className="flex-1 pb-20 pt-16 md:pb-0">{children}</main>
      <BottomNav />
    </div>
  );
}
