interface BaseType {
  id: string;
  name: string;
}

interface Sluggable {
  slug: string;
}

export interface IProduct extends BaseType, Sluggable {
  description: string;
  productType: string | IProductType;
  image: string;
  price: number;
  category: string | ICategory;
  rating: number;
  color: string;
  in_stock: number; // OR isAvailable: boolean
}

export interface IProductType extends BaseType, Sluggable {
}

export interface ICategory extends BaseType, Sluggable {
  description?: string;
}

export interface IProductsInputType {
  category: string;
  priceFrom: number;
  priceTo: number;
  colors: string[];
  sortBy: string;
  order: string;
}