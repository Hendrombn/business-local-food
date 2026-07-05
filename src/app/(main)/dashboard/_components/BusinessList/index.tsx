'use client';

import { Store, Edit, Trash2, Utensils } from 'lucide-react';
import Link from 'next/link';

import type { BusinessListProps } from '../../Dashboard.types';

export default function BusinessList({
  businesses,
  onDelete,
  deletingId,
}: BusinessListProps) {
  if (businesses.length === 0) {
    return (
      <div className="p-8 text-center">
        <Store size={48} className="mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500">Belum ada bisnis</p>
        <Link
          href="/dashboard/business/new"
          className="mt-2 inline-block text-green-600 hover:underline"
        >
          Tambah bisnis pertama →
        </Link>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {businesses.map((business) => (
        <div
          key={business.id}
          className="flex items-center justify-between p-4 hover:bg-gray-50"
        >
          <div>
            <h3 className="font-medium text-gray-900">{business.name}</h3>
            <p className="text-sm text-gray-500">{business.category.name}</p>
            <p className="text-xs text-gray-400">
              {business.reviews.length} ulasan • {business.menus.length} menu
            </p>
          </div>
          <div className="flex gap-2">
            {/* Tombol Menu */}
            <Link
              href={`/dashboard/business/${business.id}/menus`}
              className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-orange-50 hover:text-orange-600"
              title="Kelola Menu"
            >
              <Utensils size={18} />
            </Link>
            <Link
              href={`/dashboard/business/${business.id}/edit`}
              className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
              title="Edit Bisnis"
            >
              <Edit size={18} />
            </Link>
            <button
              onClick={() => onDelete(business.id)}
              disabled={deletingId === business.id}
              className={`rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 ${
                deletingId === business.id
                  ? 'cursor-not-allowed opacity-50'
                  : ''
              }`}
              title="Hapus Bisnis"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
