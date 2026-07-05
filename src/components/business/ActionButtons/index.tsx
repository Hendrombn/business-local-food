'use client';

import { MapPin, Phone, Globe, Navigation } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

interface ActionButtonsProps {
  business: {
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
    phone: string | null;
    website: string | null;
  };
}

export default function ActionButtons({ business }: ActionButtonsProps) {
  // Debug: cek data business
  useEffect(() => {
    console.log('ActionButtons - business:', business);
  }, [business]);

  // Debug: cek apakah komponen di-render
  console.log('ActionButtons rendered!');

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${business.lat},${business.lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${business.lat},${business.lng}`;

  const whatsappUrl = business.phone
    ? `https://wa.me/${business.phone.replace(/[^0-9]/g, '')}`
    : null;

  const telUrl = business.phone ? `tel:${business.phone}` : null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {/* Google Maps */}
      <Link
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-3 text-blue-700 transition-colors hover:bg-blue-100"
      >
        <MapPin size={20} />
        <span className="text-sm font-medium">Lihat di Maps</span>
      </Link>

      {/* Navigasi */}
      <Link
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-green-700 transition-colors hover:bg-green-100"
      >
        <Navigation size={20} />
        <span className="text-sm font-medium">Navigasi</span>
      </Link>

      {/* Telepon/WhatsApp */}
      {telUrl && (
        <Link
          href={whatsappUrl || telUrl}
          target={whatsappUrl ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-green-700 transition-colors hover:bg-green-100"
        >
          <Phone size={20} />
          <span className="text-sm font-medium">
            {whatsappUrl ? 'WhatsApp' : 'Telepon'}
          </span>
        </Link>
      )}

      {/* Website */}
      {business.website && (
        <Link
          href={
            business.website.startsWith('http')
              ? business.website
              : `https://${business.website}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-purple-50 px-4 py-3 text-purple-700 transition-colors hover:bg-purple-100"
        >
          <Globe size={20} />
          <span className="text-sm font-medium">Website</span>
        </Link>
      )}
    </div>
  );
}
