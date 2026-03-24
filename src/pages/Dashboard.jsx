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
      },
    ],
  };
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  });

  const loadData = async () => {
    const res = await getSiswa();
    setTotalSiswa(res.data.length);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl text-black font-bold mb-8">📊 Dashboard</h1>

      <div className="bg-whitesmoke p-4 rounded-xl shadow mt-6 mb-5">
        <Bar data={data} />
      </div>

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-black mb-2">Total Siswa</h2>
          <p className="text-3xl font-bold">{totalSiswa}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-black mb-2">Data Aktif</h2>
          <p className="text-3xl font-bold text-green-500">Aktif</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-black mb-2">Status</h2>
          <p className="text-3xl font-bold text-blue-500">Online</p>
        </div>
      </div>

      <button
        className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        onClick={() => navigate("/siswa")}
      >
        Kelola Siswa
      </button>
    </div>
  );
}
