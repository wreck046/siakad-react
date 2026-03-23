import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SiswaPage from "./pages/SiswaPage";

function App() {
  const isAuth = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isAuth ? <Dashboard /> : <Login />} />
        <Route path="/siswa" element={isAuth ? <SiswaPage /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
