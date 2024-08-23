import { Dispatch, SetStateAction } from "react";

export interface Filters {
  [key: string]: string | number | string[];
  name: string;
  categories: string[];
  brand: string[];
  minPrice: number;
  maxPrice: number;
}

export interface Filterable {
  filters: Filters;
  onFilterChange: Dispatch<SetStateAction<Filters>>;
}
