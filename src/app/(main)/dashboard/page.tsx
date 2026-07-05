'use client';

import BusinessList from './_components/BusinessList';
import DashboardHeader from './_components/DashboardHeader';
import StatsCards from './_components/StatsCards';
import { useDashboard } from './_hooks/useDashboard';

export default function DashboardPage() {
  const { stats, user, loading, deletingId, deleteBusiness } = useDashboard();

  // Loading state
  if (loading || !stats) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <DashboardHeader user={user} />
        <StatsCards stats={stats} />
        <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 p-4">
            <h2 className="font-semibold text-gray-800">Daftar Bisnis</h2>
            <span className="text-sm text-gray-500">
              {stats.businesses.length} bisnis
            </span>
          </div>
          <BusinessList
            businesses={stats.businesses}
            onDelete={deleteBusiness}
            deletingId={deletingId}
          />
        </div>
      </div>
    </div>
  );
}
