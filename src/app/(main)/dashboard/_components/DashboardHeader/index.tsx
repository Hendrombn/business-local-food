'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import type { DashboardHeaderProps } from '../../Dashboard.types';

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">📊 Dashboard</h1>
        <p className="text-gray-500">
          Halo, {user?.name}! Kelola bisnismu di sini
        </p>
      </div>
      <Link
        href="/dashboard/business/new"
        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
      >
        <Plus size={20} />
        Tambah Bisnis
      </Link>
    </div>
  );
}
