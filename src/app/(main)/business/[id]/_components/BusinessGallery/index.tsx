import Image from 'next/image';

import styles from './BusinessGallery.module.css';
import type { BusinessDetailClientProps } from '../../BusinessDetail.types';

type Business = BusinessDetailClientProps['business'];
type Photo = Business['photos'][number];

interface BusinessGalleryProps {
  photos: Photo[];
  name: string;
}

export default function BusinessGallery({
  photos,
  name,
}: BusinessGalleryProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>📸 Galeri</h2>
      <div className={styles.grid}>
        {photos.map((photo) => (
          <div key={photo.id} className={styles.item}>
            <Image
              src={photo.url}
              alt={name}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
