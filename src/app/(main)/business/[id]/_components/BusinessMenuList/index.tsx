import { Utensils } from 'lucide-react';

import styles from './BusinessMenuList.module.css';
import type { BusinessDetailClientProps } from '../../BusinessDetail.types';

type Business = BusinessDetailClientProps['business'];
type Menu = Business['menus'][number];

interface BusinessMenuListProps {
  menus: Menu[];
}

export default function BusinessMenuList({ menus }: BusinessMenuListProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>
        <Utensils size={18} />
        Menu
      </h2>
      <div className={styles.grid}>
        {menus.map((menu) => (
          <div key={menu.id} className={styles.item}>
            <div className={styles.itemRow}>
              <div className={styles.itemInfo}>
                <p className={styles.itemName}>{menu.name}</p>
                {menu.description && (
                  <p className={styles.itemDesc}>{menu.description}</p>
                )}
              </div>
              <span className={styles.itemPrice}>
                Rp {menu.price.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
