import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-teal-100">
      {/* Sidebar */}
      <div className="w-64 bg-teal-500 p-4">
        <h2 className="text-xl font-bold mb-6">📚 SIAKAD</h2>

        <nav className="flex flex-col gap-3">
          <Link to="/" className="hover:bg-gray-200 p-2 rounded text-black">
            Dashboard
          </Link>

          <Link
            to="/siswa"
            className="hover:bg-gray-200 p-2 rounded text-black"
          >
            Data Siswa
          </Link>
        </nav>

        {/* Logout */}
        <button
          className="mt-10 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-200 text-white"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
