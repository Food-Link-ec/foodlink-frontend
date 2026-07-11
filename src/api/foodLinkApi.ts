import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    
    // LA MAGIA: Solo enviamos el token si existe Y la ruta NO es la de login
    if (token && !config.url?.includes('/auth/login')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;