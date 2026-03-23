import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SiswaPage from "./pages/SiswaPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/siswa" element={<SiswaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
