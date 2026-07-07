import type { ReactNode } from 'react';

import styles from './BusinessSection.module.css';

interface BusinessSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function BusinessSection({
  title,
  icon,
  children,
}: BusinessSectionProps) {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        {icon && <div className={styles.icon}>{icon}</div>}

        <h2 className={styles.title}>{title}</h2>
      </header>

      <div className={styles.body}>{children}</div>
    </section>
  );
}
