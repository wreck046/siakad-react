import axios from "axios";
import toast from "react-hot-toast";

// URL backend dibaca dari environment saat build:
//   - Vercel : Settings → Environment Variables → VITE_API_URL (contoh: https://siakad-api.onrender.com/api)
//   - Lokal  : salin .env.example menjadi .env
// Variabel VITE_* ditanam ke bundle saat build, jadi mengubahnya butuh redeploy.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080/api",
});

// REQUEST → inject token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE → handle 401 dan error jaringan
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const isLoginRequest = error.config?.url?.includes("/auth/login");

    if (status === 401 && !isLoginRequest) {
      // Token tidak valid / kedaluwarsa: hapus lalu kembali ke halaman login.
      localStorage.removeItem("token");
      window.location.replace("/login?expired=1");
    } else if (!error.response) {
      // Tidak ada respons: server mati, sedang bangun dari tidur, atau diblokir CORS.
      toast.error(
        "Server tidak bisa dihubungi. Server gratis butuh sekitar 1 menit untuk bangun, coba lagi sebentar.",
        { id: "network-error" },
      );
    }

    return Promise.reject(error);
  },
);

export default api;
