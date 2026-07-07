export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Business {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category: {
    id: string;
    name: string;
  };
  isOpen?: boolean;
}

export interface User {
  name: string;
  role: string;
}
