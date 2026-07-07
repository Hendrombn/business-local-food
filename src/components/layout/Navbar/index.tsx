'use client';

import {
  Home,
  Heart,
  Search,
  LayoutDashboard,
  Shield,
  UtensilsCrossed,
  ChevronDown,
  User,
  LogOut,
  Settings2,
  Settings,
  UserCog,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import SearchBar from '@/components/business/SeachBar';
import Avatar from '@/components/ui/Avatar';
import { useSession } from '@/hooks/useSession';

import styles from './Navbar.module.css';
import type { NavbarProps } from './Navbar.types';

export default function Navbar({ onSearch }: NavbarProps) {
  const pathname = usePathname();
  const { user, loading, logout } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    // { href: '/explore', label: 'Explore', icon: Search },
    { href: '/saved', label: 'Favorit', icon: Heart },
  ];

  const showDashboard =
    user && (user.role === 'OWNER' || user.role === 'ADMIN');
  const showAdmin = user && user.role === 'ADMIN';

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href) ?? false;
  };

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  // Tutup dropdown kalau klik di luar area
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Tutup dropdown tiap kali pindah halaman
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDropdownOpen(false);
  }, [pathname]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <UtensilsCrossed size={22} className={styles.logoIcon} />
          <span className={styles.logoText}>Kuliner Lokal</span>
        </Link>

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

          {showDashboard && <div className={styles.divider} />}

          {showDashboard && (
            <Link
              href="/dashboard"
              className={`${styles.navItem} ${isActive('/dashboard') ? styles.navItemActive : ''}`}
            >
              <LayoutDashboard size={18} className={styles.navIcon} />
              Dashboard
            </Link>
          )}

          {showAdmin && (
            <Link
              href="/admin"
              className={`${styles.navItem} ${isActive('/admin') ? styles.navItemActive : ''}`}
            >
              <UserCog size={18} className={styles.navIcon} />
              Admin
            </Link>
          )}
        </div>

        <div className={styles.right}>
          {loading ? (
            <div className={styles.userInfo}>
              <div className={styles.skeletonAvatar} />
              <div className={styles.skeletonTexts}>
                <div className={styles.skeletonLineLg} />
                <div className={styles.skeletonLineSm} />
              </div>
            </div>
          ) : user ? (
            <div className={styles.dropdownWrapper} ref={dropdownRef}>
              <button
                type="button"
                className={styles.userTrigger}
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <Avatar name={user.name} size="sm" />
                <div className={styles.userTexts}>
                  <span className={styles.userName}>{user.name}</span>
                  <span className={styles.userRole}>{user.role}</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`${styles.chevronIcon} ${dropdownOpen ? styles.chevronOpen : ''}`}
                />
              </button>

              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link href="/profile" className={styles.dropdownItem}>
                    <User size={16} />
                    Profil Saya
                  </Link>
                  <button
                    type="button"
                    className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                    onClick={() => logout?.()}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
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
