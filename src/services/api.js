import axios from "axios";
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Cambia la URL según tu API de Laravel
  headers: {    'Content-Type': 'application/json'  }
});
// 🔥 Interceptor para agregar el token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject('bfdbfd---'+error)
);
export default api;