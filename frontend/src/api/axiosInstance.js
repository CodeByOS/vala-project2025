import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:9000/api" : "/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage (or wherever you store it)
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
