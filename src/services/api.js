import axios from "axios";
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Cambia la URL según tu API de Laravel
  headers: {    'Content-Type': 'application/json'  }
});
export default api;