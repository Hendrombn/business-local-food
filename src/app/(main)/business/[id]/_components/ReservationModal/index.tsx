import { CalendarDays, Clock, Users, X } from 'lucide-react';
import { useState } from 'react';

import styles from './ReservationModal.module.css';

interface ReservationModalProps {
  businessName: string;
  onClose: () => void;
  onSubmit?: (data: {
    date: string;
    time: string;
    guests: number;
    notes: string;
  }) => void;
}

export default function ReservationModal({
  businessName,
  onClose,
  onSubmit,
}: ReservationModalProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    onSubmit?.({ date, time, guests, notes });
    setSubmitted(true);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>📅 Reservasi Meja</h2>
            <p className={styles.subtitle}>Untuk {businessName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeIcon}
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className={styles.successState}>
            <p className={styles.successTitle}>Reservasi terkirim ✅</p>
            <p className={styles.successText}>
              {businessName} akan mengonfirmasi meja kamu untuk {date || '-'}{' '}
              pukul {time || '-'} ({guests} orang).
            </p>
            <button
              type="button"
              onClick={onClose}
              className={styles.doneButton}
            >
              Selesai
            </button>
          </div>
        ) : (
          <div className={styles.form}>
            <label className={styles.field}>
              <span className={styles.label}>
                <CalendarDays size={16} /> Tanggal
              </span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>
                <Clock size={16} /> Jam
              </span>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>
                <Users size={16} /> Jumlah Tamu
              </span>
              <input
                type="number"
                min={1}
                max={20}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Catatan (opsional)</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Misal: dekat jendela, alergi seafood, dll."
                className={styles.textarea}
              />
            </label>

            <div className={styles.actions}>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelButton}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!date || !time}
                className={styles.submitButton}
              >
                Kirim Reservasi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
