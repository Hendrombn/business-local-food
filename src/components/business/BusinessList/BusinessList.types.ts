export interface Category {
  id: string;
  name: string;
}

export interface Business {
  id: string;
  name: string;
  address: string;
  category?: Category;
  rating?: number;
  isOpen?: boolean;
}

export interface BusinessListProps {
  businesses: Business[];
}
