import axios from 'axios';

import Cookies from 'js-cookie';
import { useAuthStore } from 'store/use.auth.store';
import { apiURL } from './baseurl';

const api = axios.create({
  baseURL: apiURL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const logout = useAuthStore.getState().logout; // Ambil fungsi logout dari store
      logout();
    }
    return Promise.reject(error);
  }
);

export default api;
