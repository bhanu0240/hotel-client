import axios from "axios";

const apiUrl: string = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json" },
});

let getToken: (() => string | null) | null = null;

export const setTokenGetter = (getter: () => string | null) => {
  getToken = getter;
};

api.interceptors.request.use((config) => {
  if (getToken) {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
