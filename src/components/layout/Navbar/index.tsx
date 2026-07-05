'use client';

import {
  Home,
  Heart,
  User,
  Search,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import LogoutButton from '@/components/auth/index';
import SearchBar from '@/components/business/SeachBar';
import Avatar from '@/components/ui/Avatar';
import { useSession } from '@/hooks/useSession';

import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading } = useSession();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/explore', label: 'Explore', icon: Search },
    { href: '/saved', label: 'Favorit', icon: Heart },
  ];

  // Tambahkan dashboard link hanya untuk OWNER atau ADMIN
  const showDashboard =
    user && (user.role === 'OWNER' || user.role === 'ADMIN');

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href) ?? false;
  };

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🍴</span>
          <span className={styles.logoText}>Kuliner Lokal</span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className={styles.searchWrapper}>
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className={styles.nav}>
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
              >
                <Icon size={18} className={styles.navIcon} />
                {item.label}
              </Link>
            );
          })}

          {/* Dashboard Link - hanya untuk OWNER/ADMIN */}
          {showDashboard && (
            <Link
              href="/dashboard"
              className={`${styles.navItem} ${isActive('/dashboard') ? styles.navItemActive : ''}`}
            >
              <LayoutDashboard size={18} className={styles.navIcon} />
              Dashboard
            </Link>
          )}
        </div>

        <div className={styles.right}>
          {loading ? (
            <div className={styles.userInfo}>
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
              <div className="hidden sm:block">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                <div className="mt-1 h-3 w-12 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ) : user ? (
            <div className={styles.userInfo}>
              <Link href="/profile" className="flex items-center gap-3">
                <Avatar name={user.name} size="sm" />
                <div className={styles.userTexts}>
                  <span className={styles.userName}>{user.name}</span>
                  <span className={styles.userRole}>{user.role}</span>
                </div>
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <Link href="/login" className={styles.loginButton}>
              Masuk
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
