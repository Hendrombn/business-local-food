import Image from 'next/image';

import styles from './Avatar.module.css';
import type { AvatarProps } from './Avatar.types';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');
}

export default function Avatar({ src, alt, name, size = 'md' }: AvatarProps) {
  return (
    <span className={[styles.avatar, styles[size]].join(' ')}>
      {src ? (
        <Image
          src={src}
          alt={alt ?? name ?? 'avatar'}
          className={styles.image}
          width={56}
          height={56}
        />
      ) : name ? (
        <span className={styles.initials}>{getInitials(name)}</span>
      ) : (
        <span className={styles.initials}>?</span>
      )}
    </span>
  );
}
