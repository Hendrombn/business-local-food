import type { Favorite } from '@/hooks/useFavorite';

import FavoriteCard from '../FavoriteCard';
import styles from './FavoriteGrid.module.css';

interface FavoriteGridProps {
  favorites: Favorite[];
}

export default function FavoriteGrid({ favorites }: FavoriteGridProps) {
  return (
    <section className={styles.grid}>
      {favorites.map((favorite) => (
        <FavoriteCard key={favorite.id} favorite={favorite} />
      ))}
    </section>
  );
}
