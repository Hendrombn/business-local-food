'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

import { useFavorite } from '@/hooks/useFavorite';

import type { FavoriteButtonProps } from './FavoriteButton.types';

export default function FavoriteButton({
  businessId,
  size = 'md',
  className = '',
  showText = false,
}: FavoriteButtonProps) {
  const { isFavorited, toggleFavorite } = useFavorite();
  const [isLoading, setIsLoading] = useState(false);
  const isFavorite = isFavorited(businessId);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);
    try {
      await toggleFavorite(businessId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`flex items-center justify-center gap-1.5 rounded-full transition-all duration-200 ${
        isFavorite
          ? 'bg-red-50 text-red-500 hover:bg-red-100'
          : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-red-400'
      } ${sizeClasses[size]} ${className} ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
      aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
    >
      <Heart
        size={iconSizes[size]}
        fill={isFavorite ? 'currentColor' : 'none'}
        className="transition-colors"
      />
      {showText && (
        <span className="text-xs font-medium">
          {isFavorite ? 'Tersimpan' : 'Simpan'}
        </span>
      )}
    </button>
  );
}
