import Image from 'next/image';

import styles from './Layout.module.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      {/* Kiri — gambar */}
      <div className={styles.leftPanel}>
        <Image
          src="/images/auth-bg.webp"
          alt="Kuliner Lokal"
          fill
          className={styles.bgImage}
          priority
          sizes="50vw"
          quality={80}
        />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <div className={styles.icon}>🍴</div>
          <h1 className={styles.title}>Kuliner Lokal</h1>
          <p className={styles.subtitle}>
            Temukan bisnis makanan lokal terbaik di sekitarmu
          </p>
          <div className={styles.divider} />
          <div className={styles.quoteWrapper}>
            <p className={styles.quote}>
              "Temukan permata tersembunyi di kotamu. Bergabunglah dengan
              komunitas pecinta kuliner dan jelajahi merchant lokal terbaik yang
              dikurasi khusus untukmu."
            </p>
          </div>
        </div>
      </div>

      {/* Kanan — form */}
      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>{children}</div>
      </div>
    </div>
  );
}
