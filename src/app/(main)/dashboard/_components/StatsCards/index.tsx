'use client';

import { Store, Star, Utensils, MessageSquare } from 'lucide-react';

import type { StatsCardsProps } from '../../Dashboard.types';

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: 'Bisnis',
      value: stats.totalBusinesses,
      icon: Store,
      color: 'text-green-600',
    },
    {
      label: 'Rating Rata-rata',
      value: stats.averageRating.toFixed(1),
      icon: Star,
      color: 'text-yellow-500',
    },
    {
      label: 'Ulasan',
      value: stats.totalReviews,
      icon: MessageSquare,
      color: 'text-blue-500',
    },
    {
      label: 'Menu',
      value: stats.totalMenus,
      icon: Utensils,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <card.icon className={card.color} size={24} />
            <div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
