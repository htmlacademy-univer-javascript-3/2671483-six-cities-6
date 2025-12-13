import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL, REQUEST_TIMEOUT } from '../config/service';
import { getErrorMessage } from '../lib/error-formatter';
import { getToken } from '../lib/storage/token';
import { shouldDisplayError } from './api-error-utils';

import type { DetailErrorData } from '../types/Error.type';

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailErrorData>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      }
      throw error;
    }
  );

  return api;
};
