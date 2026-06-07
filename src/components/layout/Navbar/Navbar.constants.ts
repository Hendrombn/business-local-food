import { MapPin, Shield, Star } from 'lucide-react';

import type { NavItem } from './Navbar.types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Peta Kuliner', href: '/', icon: MapPin },
  { label: 'Profile Outlet', href: '/dashboard', icon: Star },
  { label: 'Admin Portal', href: '/admin', icon: Shield },
];
