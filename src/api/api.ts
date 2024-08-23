import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_LOCAL,
  headers: {
    "Content-Type": "application/json",
  },
});
