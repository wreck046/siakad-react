# 📚 SIAKAD App (Fullstack)

A fullstack academic management system built with React and Spring Boot.

## 🌐 Live Demo

* Frontend: (https://siakad-react-five.vercel.app/)
* Backend: https://siakad-api.onrender.com

## 🚀 Features

* 🔐 Login Authentication (Token-based)
* 👨‍🎓 Student Management (CRUD)
* 📊 Dashboard with Chart
* ⚡ Real-time UI update
* ⏳ Loading feedback (UX enhancement)

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Spring Boot
* REST API
* H2 in-memory (data contoh dimuat otomatis saat startup)

### Deployment

* Vercel (Frontend)
* Render (Backend)

## ⚙️ Konfigurasi

Frontend membaca URL backend dari `VITE_API_URL` (lihat `.env.example`).

* Lokal: salin `.env.example` menjadi `.env`.
* Vercel: isi di *Settings → Environment Variables* lalu redeploy
  (variabel `VITE_*` ditanam saat build).

Backend di Render (free tier) tidur setelah 15 menit tanpa traffic dan butuh sekitar
satu menit untuk bangun. Database H2 in-memory direset setiap restart.

## 🧠 Key Concepts

* MVVM (Frontend)
* MVC (Backend)
* Axios Interceptor (Auth Handling)
* Protected Routes
* RESTful API Integration

## 📌 Notes

This project was built as a portfolio to demonstrate fullstack development skills.

## 👨‍💻 Author

Ivan Koroh
