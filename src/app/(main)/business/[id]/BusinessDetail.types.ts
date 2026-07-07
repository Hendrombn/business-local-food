export interface BusinessDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Menu {
  id: string;
  name: string;
  description: string | null;
  price: number;
  isAvailable: boolean;
}

export interface Photo {
  id: string;
  url: string;
  isPrimary: boolean;
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  reply: string | null;
  createdAt: Date; // ✅ Bisa Date atau string
  user: User;
}

export interface Business {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string | null;
  website: string | null;
  openTime: string | null;
  closeTime: string | null;
  operatingDays: string | null;
  description: string | null;
  category: Category;
  menus: Menu[];
  photos: Photo[];
  reviews: Review[];
}

export interface BusinessDetailClientProps {
  business: Business;
  averageRating: number;
  isOpen: boolean;
}
