import axios from 'axios';
import { getCookie } from "cookies-next";

export const api = axios.create({
  baseURL : '/api/v1',
})

api.interceptors.request.use(
  async (config) => {
    const token = getCookie("TOKEN");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  },
);