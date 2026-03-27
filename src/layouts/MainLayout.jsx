import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div className="w-64 bg-gray-900 text-white p-5 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">📚 SIAKAD</h2>

      <nav className="flex flex-col gap-2">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>

        <Link to="/siswa" className="hover:bg-gray-700 p-2 rounded">
          Data Siswa
        </Link>
      </nav>

      <button
        className="mt-auto bg-red-500 hover:bg-red-600 p-2 rounded"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.replace("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
