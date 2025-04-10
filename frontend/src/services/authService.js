// src/services/authService.js
import { ref, computed } from "vue";
import axiosInstance from "./axiosInstance";

const token = ref(localStorage.getItem("token") || null);

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value);

  const login = (newToken) => {
    token.value = newToken;
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    token.value = null;
    localStorage.removeItem("token");
  };

  return {
    token,
    isAuthenticated,
    login,
    logout,
  };
}

export const signup = async (user) => {
  return await axiosInstance.post("/auth/register", user);
};

export const loginUser = async (user) => {
  const response = await axiosInstance.post("/auth/login", user);

  const tokenFromResponse = response.data.token || response.data; 
  if (tokenFromResponse) {
    token.value = tokenFromResponse;
    localStorage.setItem("token", tokenFromResponse);
  }

  return { token: tokenFromResponse };
};
export const getToken = () => {
  return token.value;
}
export async function fetchCurrentUser() {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axiosInstance.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    throw error;
  }
}
