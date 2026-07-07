'use client';

import { Home, Search, Heart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

import BottomBar from '../BottomBar';
import Container from '../Container';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import styles from './MainLayout.module.css';
import type { MainLayoutProps } from './MainLayout.types.ts';

export default function MainLayout({
  children,
  showSidebar = false,
  showFooter = true,
  className,
}: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Example sidebar items - you can customize these
  const sidebarItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home size={20} />,
      href: '/',
      isActive: true,
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: <Search size={20} />,
      href: '/explore',
    },
    {
      id: 'saved',
      label: 'Saved',
      icon: <Heart size={20} />,
      href: '/saved',
    },
  ];

  // Example bottom bar items
  const bottomBarItems = [
    {
      id: 'home',
      href: '/',
      label: 'Home',
      icon: <Home size={24} />,
      exact: true,
    },
    {
      id: 'explore',
      href: '/explore',
      label: 'Explore',
      icon: <Search size={24} />,
    },
    {
      id: 'saved',
      href: '/saved',
      label: 'Saved',
      icon: <Heart size={24} />,
    },
    {
      id: 'profile',
      href: '/profile',
      label: 'Profile',
      icon: <User size={24} />,
    },
  ];

  // Example footer links
  const footerLinks = [
    { href: '/about', label: 'About' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className={styles.layout}>
      {/* Navbar */}
      <Navbar />

      <div className={styles.main}>
        {/* Sidebar - Desktop */}
        {showSidebar && (
          <Sidebar
            items={sidebarItems}
            isOpen={isSidebarOpen}
            onToggle={setIsSidebarOpen}
          />
        )}

        {/* Main Content */}
        <main
          className={[styles.content, className ?? '']
            .filter(Boolean)
            .join(' ')}
        >
          <Container size="xl">{children}</Container>
        </main>
      </div>

      {/* Footer */}
      {showFooter && <Footer links={footerLinks} />}

      {/* Bottom Bar - Mobile */}
      <BottomBar items={bottomBarItems} />
    </div>
  );
}
