import { Clock, MapPin, Phone } from 'lucide-react';

import ActionButtons from '@/components/business/ActionButtons';

import styles from './BusinessSidebar.module.css';
import type { BusinessDetailClientProps } from '../../BusinessDetail.types';

type Business = BusinessDetailClientProps['business'];

interface BusinessSidebarProps {
  business: Business;
  onReserveClick: () => void;
}

export default function BusinessSidebar({
  business,
  onReserveClick,
}: BusinessSidebarProps) {
  return (
    <div className={styles.stack}>
      <div className={styles.actionsCard}>
        <ActionButtons business={business} />
        <button
          type="button"
          onClick={onReserveClick}
          className={styles.reserveButton}
        >
          Reservasi Meja
        </button>
      </div>

      <div className={styles.infoCard}>
        <div className={styles.infoRow}>
          <span className={styles.infoIcon}>
            <MapPin size={18} />
          </span>
          <div>
            <p className={styles.infoLabel}>Alamat</p>
            <p className={styles.infoValue}>{business.address}</p>
          </div>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.infoIcon}>
            <Phone size={18} />
          </span>
          <div>
            <p className={styles.infoLabel}>Telepon</p>
            <p className={styles.infoValue}>{business.phone ?? '-'}</p>
          </div>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.infoIcon}>
            <Clock size={18} />
          </span>
          <div>
            <p className={styles.infoLabel}>Jam Operasional</p>
            <p className={styles.infoValue}>
              {business.openTime ?? 'Belum diatur'} –{' '}
              {business.closeTime ?? 'Belum diatur'}
            </p>
            {business.operatingDays && (
              <p className={styles.infoSub}>{business.operatingDays}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
