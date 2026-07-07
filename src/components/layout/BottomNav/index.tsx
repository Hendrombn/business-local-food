'use client';

import {
  Home,
  Search,
  Heart,
  User,
  LayoutDashboard,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useSession } from '@/hooks/useSession';

import styles from './BottomNav.module.css';

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useSession();

  const showDashboard =
    user && (user.role === 'OWNER' || user.role === 'ADMIN');
  const showAdmin = user && user.role === 'ADMIN';

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/explore', label: 'Explore', icon: Search },
    { href: '/saved', label: 'Saved', icon: Heart },
  ];

  if (showDashboard) {
    navItems.push({
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    });
  }

  // ✅ Link Admin - hanya untuk ADMIN
  if (showAdmin) {
    navItems.push({
      href: '/admin',
      label: 'Admin',
      icon: Shield,
    });
  }

  navItems.push({ href: '/profile', label: 'Profile', icon: User });

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href) ?? false;
  };

  return (
    <nav className={styles.bottomNav}>
      <div className={styles.container}>
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${active ? styles.active : ''}`}
            >
              <span className={styles.iconWrapper}>
                <Icon size={24} />
                {active && <span className={styles.activeDot} />}
              </span>
              <span className={styles.label}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
