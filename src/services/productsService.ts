import { Product } from "../components/ProductCard/ProductCard";
import { Filters } from "../shared/interfaces";
import { axiosInstance } from "../api/api";

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

  return axiosInstance.get<ApiResponse<Product>>(`/products`, {
    params,
  });
};

export const update = (product: Product) =>
  axiosInstance.put(`/products/${product._id}`, product);

export const remove = (id: string) => axiosInstance.delete(`/products/${id}`);

export const getBrands = () =>
  axiosInstance.get<ApiResponse<string>>(`/brands`);

export const getCategories = () =>
  axiosInstance.get<ApiResponse<string>>(`/categories`);
