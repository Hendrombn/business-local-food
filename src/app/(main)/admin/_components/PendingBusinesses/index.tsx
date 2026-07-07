import { CheckCircle, XCircle } from 'lucide-react';

import type { Business } from '../../_hooks/useAdmin';

interface PendingBusinessesProps {
  businesses: Business[];
  onVerify: (id: string, status: 'ACTIVE' | 'INACTIVE') => void;
}

export default function PendingBusinesses({
  businesses,
  onVerify,
}: PendingBusinessesProps) {
  if (!businesses || businesses.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        ✅ Semua bisnis sudah terverifikasi
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {businesses.map((biz) => (
        <div key={biz.id} className="flex items-center justify-between p-4">
          <div>
            <h3 className="font-medium">
              {biz?.name || 'Nama tidak tersedia'}
            </h3>
            <p className="text-sm text-gray-500">
              {biz?.category?.name || 'Kategori tidak tersedia'} •{' '}
              {biz?.address || 'Alamat tidak tersedia'}
            </p>
            <p className="text-xs text-gray-400">
              Owner: {biz?.user?.name || 'Tidak diketahui'} (
              {biz?.user?.email || '-'})
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onVerify(biz.id, 'ACTIVE')}
              className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700"
            >
              <CheckCircle size={16} /> Approve
            </button>
            <button
              onClick={() => onVerify(biz.id, 'INACTIVE')}
              className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
            >
              <XCircle size={16} /> Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
