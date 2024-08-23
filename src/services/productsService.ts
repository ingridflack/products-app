import axios from "axios";
import { Product } from "../components/ProductCard/ProductCard";
import { Filters } from "../shared/interfaces";

const BASE_URL_LOCAL = "http://localhost:3000";

interface ApiResponse<T> {
  message: string;
  payload: T[];
}

export const list = (filters?: Filters) => {
  const params = new URLSearchParams();

  if (filters?.categories.length) {
    params.append("categories", filters.categories.join(","));
  }

  if (filters?.brand.length) {
    params.append("brand", filters.brand.join(","));
  }

  if (filters?.minPrice) {
    params.append("minPrice", filters.minPrice.toString());
  }

  if (filters?.maxPrice) {
    params.append("maxPrice", filters.maxPrice.toString());
  }

  if (filters?.name) {
    params.append("name", filters.name);
  }

  return axios.get<ApiResponse<Product>>(`${BASE_URL_LOCAL}/products`, {
    params,
  });
};

export const update = (product: Product) =>
  axios.put(`${BASE_URL_LOCAL}/products/${product._id}`, product);

export const remove = (id: string) =>
  axios.delete(`${BASE_URL_LOCAL}/products/${id}`);

export const getBrands = () =>
  axios.get<ApiResponse<string>>(`${BASE_URL_LOCAL}/brands`);

export const getCategories = () =>
  axios.get<ApiResponse<string>>(`${BASE_URL_LOCAL}/categories`);
