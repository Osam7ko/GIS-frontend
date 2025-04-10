// src/services/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE || "http://localhost:8081/api",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
