import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import SiswaPage from "./pages/SiswaPage";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";

// Token dibaca setiap kali route dirender, bukan sekali saat App dimuat.
function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("token");

  return isAuth ? (
    <MainLayout>{children}</MainLayout>
  ) : (
    <Navigate to="/login" replace />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/siswa"
          element={
            <ProtectedRoute>
              <SiswaPage />
            </ProtectedRoute>
          }
        />

        {/* Path yang tidak dikenal */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
