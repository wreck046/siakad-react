import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import SiswaPage from "./pages/siswaPage";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Toaster position="top-right" />
      <SiswaPage />
    </>
  );
}

export default App;
