import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import { useNavigate } from "react-router-dom";
import { getSiswa } from "../services/siswaService";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
export default function Dashboard() {
  const [totalSiswa, setTotalSiswa] = useState(0);
  const data = {
    labels: ["Siswa"],
    datasets: [
      {
        label: "Total Siswa",
        data: [totalSiswa],
        backgroundColor: "#3b82f6",
      },
    ],
  };
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getSiswa();
    setTotalSiswa(res.data.length);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl text-gray-900 font-bold mb-6">📊 Dashboard</h1>

      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <Bar data={data} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
          <p className="text-gray-200 mb-2">Total Siswa</p>
          <h2 className="text-3xl text-gray-500 font-bold">{totalSiswa}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-200 mb-2">Data Aktif</h2>
          <p className="text-3xl font-bold text-green-500">Aktif</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-200 mb-2">Status</h2>
          <p className="text-3xl font-bold text-blue-500">Online</p>
        </div>
      </div>

      <button
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition"
        onClick={() => navigate("/siswa")}
      >
        Kelola Siswa
      </button>
    </div>
  );
}
