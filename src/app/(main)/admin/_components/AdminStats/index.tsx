import { Users, Store, MessageSquare, Clock, EyeOff } from 'lucide-react';

import type { Stats } from '../../_hooks/useAdmin';

interface AdminStatsProps {
  stats: Stats;
}

export default function AdminStats({ stats }: AdminStatsProps) {
  const cards = [
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-blue-500',
    },
    {
      label: 'Total Bisnis',
      value: stats.totalBusinesses,
      icon: Store,
      color: 'text-green-500',
    },
    {
      label: 'Total Ulasan',
      value: stats.totalReviews,
      icon: MessageSquare,
      color: 'text-purple-500',
    },
    {
      label: 'Pending Verifikasi',
      value: stats.pendingBusinesses,
      icon: Clock,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50 border-yellow-200',
    },
    {
      label: 'Reported Ulasan',
      value: stats.reportedReviews,
      icon: EyeOff,
      color: 'text-red-600',
      bg: 'bg-red-50 border-red-200',
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-5">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-lg border border-gray-100 bg-white p-4 shadow-sm ${card.bg || ''}`}
        >
          <card.icon className={card.color} size={24} />
          <p className="text-2xl font-bold">{card.value}</p>
          <p className="text-sm text-gray-500">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
