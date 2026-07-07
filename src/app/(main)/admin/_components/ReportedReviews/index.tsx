import { Eye, EyeOff } from 'lucide-react';

import type { Review } from '../../_hooks/useAdmin';

interface ReportedReviewsProps {
  reviews: Review[];
  onModerate: (id: string, status: 'ACTIVE' | 'HIDDEN') => void;
}

export default function ReportedReviews({
  reviews,
  onModerate,
}: ReportedReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        ✅ Tidak ada ulasan yang dilaporkan
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {reviews.map((review) => (
        <div key={review.id} className="flex items-start justify-between p-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {review?.user?.name || 'User tidak diketahui'}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-sm text-gray-600">
                {review?.business?.name || 'Bisnis tidak diketahui'}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-yellow-500">
              {Array.from({ length: review?.rating || 0 }, (_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
            <p className="mt-1 text-gray-700">
              {review?.comment || 'Komentar tidak tersedia'}
            </p>
          </div>
          <div className="ml-4 flex flex-shrink-0 gap-2">
            <button
              onClick={() => onModerate(review.id, 'ACTIVE')}
              className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700"
            >
              <Eye size={16} /> Tampilkan
            </button>
            <button
              onClick={() => onModerate(review.id, 'HIDDEN')}
              className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
            >
              <EyeOff size={16} /> Sembunyikan
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
