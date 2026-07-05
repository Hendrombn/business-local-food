'use client';

import { X } from 'lucide-react';

import type { BusinessFilterProps } from './BusinessFilter.types';

export default function BusinessFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: BusinessFilterProps) {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Filter Kategori</h3>
        {selectedCategory && (
          <button
            onClick={() => onCategoryChange(null)}
            className="flex items-center gap-1 text-xs text-gray-400 transition-colors hover:text-gray-600"
          >
            <X size={14} />
            Hapus Filter
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`rounded-full px-3 py-1.5 text-sm transition-all duration-200 ${
            !selectedCategory
              ? 'bg-green-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Semua
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`rounded-full px-3 py-1.5 text-sm transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-green-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
