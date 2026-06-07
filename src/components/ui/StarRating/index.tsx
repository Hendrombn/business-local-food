'use client';

import { useState } from 'react';

import styles from './StarRating.module.css';
import type { StarRatingProps } from './StarRating.types';

export default function StarRating({
  value,
  max = 5,
  onChange,
  readonly = false,
  size = 'md',
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const displayed = hovered ?? value;

  return (
    <span
      className={[styles.wrapper, styles[size], readonly ? styles.readonly : '']
        .filter(Boolean)
        .join(' ')}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= displayed;

        return (
          <span
            key={i}
            className={[styles.star, isFilled ? styles.starFilled : '']
              .filter(Boolean)
              .join(' ')}
            onClick={() => !readonly && onChange?.(starValue)}
            onMouseEnter={() => !readonly && setHovered(starValue)}
            onMouseLeave={() => !readonly && setHovered(null)}
            aria-label={`${starValue} bintang`}
          >
            ★
          </span>
        );
      })}
    </span>
  );
}
