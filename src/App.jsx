import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SiswaPage from "./pages/SiswaPage";
import Login from "./pages/Login";

function App() {
  const isAuth = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/siswa"
          element={isAuth ? <SiswaPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
