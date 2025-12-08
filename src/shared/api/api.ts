import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { BASE_URL, REQUEST_TIMEOUT } from '../config/service';
import { getToken } from '../lib/storage/token';

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  return api;
};
