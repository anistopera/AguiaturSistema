export interface IPackage {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  languages: string[];
  includes: string[];
  images: string[];
  departure_dates: Date[];
  category_id: number;
}

export interface IPackageFilter {
  name?: string;
}
