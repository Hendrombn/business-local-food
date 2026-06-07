'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';

import { NAV_ITEMS } from './Navbar.constants';
import styles from './Navbar.module.css';

const MOCK_USER = {
  name: 'Budi Santoso',
  role: 'Owner',
  isLoggedIn: true,
};

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🍴</span>
          <span className={styles.logoText}>Kuliner Lokal</span>
        </Link>

        {/* Nav Items */}
        <div className={styles.nav}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  styles.navItem,
                  isActive ? styles.navItemActive : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {Icon && <Icon size={16} className={styles.navIcon} />}
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className={styles.right}>
          {MOCK_USER.isLoggedIn ? (
            <div className={styles.userInfo}>
              <Avatar name={MOCK_USER.name} size="sm" />
              <div className={styles.userTexts}>
                <span className={styles.userName}>{MOCK_USER.name}</span>
                <span className={styles.userRole}>{MOCK_USER.role}</span>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.divider} />
              <Button variant="primary" size="sm">
                Masuk / Login
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
