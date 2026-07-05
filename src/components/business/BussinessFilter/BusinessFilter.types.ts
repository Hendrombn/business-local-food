export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface BusinessFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}
