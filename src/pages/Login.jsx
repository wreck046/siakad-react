import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Dialihkan dari interceptor saat token kedaluwarsa.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("expired")) {
      toast.error("Sesi berakhir, silakan login ulang", { id: "expired" });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      toast.success("Login berhasil 🎉");

      navigate("/", { replace: true });
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      // Error jaringan sudah ditampilkan oleh interceptor.
      if (err.response?.status === 401) {
        toast.error("Username atau password salah ❌");
      } else if (err.response) {
        toast.error("Login gagal ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded flex justify-center items-center disabled:opacity-60"
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="#ffffff" /> : "Login"}
        </button>
      </form>
    </div>
  );
}
