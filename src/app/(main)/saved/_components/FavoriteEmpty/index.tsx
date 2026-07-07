import { Heart } from 'lucide-react';
import Link from 'next/link';

import styles from './FavoriteEmpty.module.css';

export default function FavoriteEmpty() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <Heart size={52} className={styles.icon} strokeWidth={1.8} />
        </div>

        <h2 className={styles.title}>Belum Ada Favorit</h2>

        <p className={styles.description}>
          Simpan bisnis favorit agar lebih mudah ditemukan kembali kapan saja.
        </p>

        <Link href="/" className={styles.button}>
          Cari Bisnis
        </Link>
      </div>
    </section>
  );
}
