import { useEffect, useState } from "react";
import { getSiswa, createSiswa, deleteSiswa } from "../services/siswaService";

export default function SiswaPage() {
  const [siswa, setSiswa] = useState([]);
  const [nama, setNama] = useState("");
  const [nis, setNis] = useState("");

  const loadData = async () => {
    const res = await getSiswa();
    setSiswa(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTambah = async () => {
    await createSiswa({ nama, nis });
    setNama("");
    setNis("");
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteSiswa(id);
    loadData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">📚 Data Siswa</h1>

      {/* Form */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-3 justify-center">
        <input
          className="border p-2 rounded w-48"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <input
          className="border p-2 rounded w-32"
          placeholder="NIS"
          value={nis}
          onChange={(e) => setNis(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleTambah}
        >
          Tambah
        </button>
      </div>

      {/* List */}
      <div className="grid md:grid-cols-2 gap-4">
        {siswa.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-lg">{item.nama}</p>
              <p className="text-gray-500 text-sm">{item.nis}</p>
            </div>

            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => handleDelete(item.id)}
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
