'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import 'leaflet/dist/leaflet.css';
import { defaultIcon } from '@/lib/leaflet-icon';

// Import Leaflet components secara dynamic (client-side only)
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

interface Business {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  category?: { name: string };
}

interface MapProps {
  businesses: Business[];
  center?: [number, number];
  zoom?: number;
}

export default function Map({
  businesses,
  center = [-6.2088, 106.8456],
  zoom = 13,
}: MapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        () => {
          console.warn('Geolocation not available, using default');
        }
      );
    }
  }, []);

  if (!isMounted) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  const mapCenter = userLocation || center;

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      className="z-0 rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {userLocation && (
        <Marker position={userLocation} icon={defaultIcon}>
          <Popup>📍 Kamu di sini</Popup>
        </Marker>
      )}

      {businesses.map((business) => (
        <Marker
          key={business.id}
          position={[business.lat, business.lng]}
          icon={defaultIcon}
        >
          <Popup>
            <div className="min-w-[150px] p-2">
              <h3 className="text-sm font-bold text-gray-800">
                {business.name}
              </h3>
              <p className="mt-1 text-xs text-gray-600">{business.address}</p>
              {business.category && (
                <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                  {business.category.name}
                </span>
              )}
              <button
                className="mt-2 w-full rounded-lg bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700"
                onClick={() =>
                  (window.location.href = `/business/${business.id}`)
                }
              >
                Lihat Detail →
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
