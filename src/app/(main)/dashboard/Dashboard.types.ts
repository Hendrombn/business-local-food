export interface Business {
  id: string;
  name: string;
  address: string;
  category: {
    id: string;
    name: string;
  };
  categoryId?: string;
  reviews: { rating: number }[];
  menus: { id: string }[];
  lat: number;
  lng: number;
  phone: string | null;
  website: string | null;
  description: string | null;
  openTime: string | null;
  closeTime: string | null;
  operatingDays: string | null;
  status?: string;
  userId?: string;
}

export interface Stats {
  totalBusinesses: number;
  totalReviews: number;
  totalMenus: number;
  averageRating: number;
  businesses: Business[];
}

export interface User {
  id?: string;
  name: string;
  role: string;
  email?: string;
}

export interface StatsCardsProps {
  stats: Stats;
}

export interface DashboardHeaderProps {
  user: User | null;
}

export interface BusinessListProps {
  businesses: Business[];
  onDelete: (id: string) => void;
  deletingId: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
}

export interface BusinessFormData {
  name: string;
  categoryId: string;
  address: string;
  lat: string;
  lng: string;
  phone: string;
  website: string;
  description: string;
  openTime: string;
  closeTime: string;
  operatingDays: string;
}

export interface BusinessFormProps {
  categories: Category[];
  initialData?: Business | null;
  onSubmit: (data: BusinessFormData) => void;
  isSubmitting: boolean;
  submitLabel: string;
}
