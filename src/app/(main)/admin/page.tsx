'use client';

import AdminStats from './_components/AdminStats';
import PendingBusinesses from './_components/PendingBusinesses';
import ReportedReviews from './_components/ReportedReviews';
import { useAdmin } from './_hooks/useAdmin';

export default function AdminPage() {
  const {
    stats,
    pendingBusinesses,
    reportedReviews,
    loading,
    activeTab,
    setActiveTab,
    handleVerifyBusiness,
    handleModerateReview,
  } = useAdmin();

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
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          🛡️ Admin Portal
        </h1>

        <AdminStats stats={stats} />

        {/* Tabs */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setActiveTab('stats')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'stats'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📊 Statistik
          </button>
          <button
            onClick={() => setActiveTab('businesses')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'businesses'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🏪 Verifikasi ({stats.pendingBusinesses})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'reviews'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ⭐ Moderasi ({stats.reportedReviews})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'businesses' && (
          <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-4">
              <h2 className="font-semibold text-gray-800">
                🏪 Verifikasi Bisnis
              </h2>
              <p className="text-sm text-gray-500">
                Approve atau reject bisnis yang mendaftar
              </p>
            </div>
            <PendingBusinesses
              businesses={pendingBusinesses}
              onVerify={handleVerifyBusiness}
            />
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-4">
              <h2 className="font-semibold text-gray-800">
                ⭐ Moderasi Ulasan
              </h2>
              <p className="text-sm text-gray-500">
                Tinjau ulasan yang dilaporkan
              </p>
            </div>
            <ReportedReviews
              reviews={reportedReviews}
              onModerate={handleModerateReview}
            />
          </div>
        )}
      </div>
    </div>
  );
}
