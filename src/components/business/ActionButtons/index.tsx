'use client';

import { Globe, MapPin, Navigation, Phone } from 'lucide-react';
import Link from 'next/link';

import styles from './ActionButtons.module.css';

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
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${business.lat},${business.lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${business.lat},${business.lng}`;

  const whatsappUrl = business.phone
    ? `https://wa.me/${business.phone.replace(/[^0-9]/g, '')}`
    : null;

  const telUrl = business.phone ? `tel:${business.phone}` : null;

  const websiteUrl = business.website
    ? business.website.startsWith('http')
      ? business.website
      : `https://${business.website}`
    : null;

  return (
    <div className={styles.grid}>
      <Link
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.action} ${styles.actionMaps}`}
      >
        <MapPin size={20} />
        <span className={styles.label}>Lihat di Maps</span>
      </Link>

      <Link
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.action} ${styles.actionNavigate}`}
      >
        <Navigation size={20} />
        <span className={styles.label}>Navigasi</span>
      </Link>

      {telUrl && (
        <Link
          href={whatsappUrl || telUrl}
          target={whatsappUrl ? '_blank' : undefined}
          rel="noopener noreferrer"
          className={`${styles.action} ${styles.actionWhatsapp}`}
        >
          <Phone size={20} />
          <span className={styles.label}>
            {whatsappUrl ? 'WhatsApp' : 'Telepon'}
          </span>
        </Link>
      )}

      {websiteUrl && (
        <Link
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.action} ${styles.actionWebsite}`}
        >
          <Globe size={20} />
          <span className={styles.label}>Website</span>
        </Link>
      )}
    </div>
  );
}
