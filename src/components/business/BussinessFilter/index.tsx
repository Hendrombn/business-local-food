'use client';

import { X } from 'lucide-react';

import type { BusinessFilterProps } from './BusinessFilter.types';
import styles from './businessFilter.module.css';

export default function BusinessFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: BusinessFilterProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Filter Kategori</h3>
        {selectedCategory && (
          <button
            onClick={() => onCategoryChange(null)}
            className={styles.clearButton}
          >
            <X size={14} />
            Hapus Filter
          </button>
        )}
      </div>

      <div className={styles.pillGroup}>
        <button
          onClick={() => onCategoryChange(null)}
          className={`${styles.pill} ${!selectedCategory ? styles.pillActive : ''}`}
        >
          Semua
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`${styles.pill} ${
              selectedCategory === category.id ? styles.pillActive : ''
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
