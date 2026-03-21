import { useEffect, useState } from "react";
import { getSiswa } from "../services/siswaService";

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
    await createSiswa({
      nama,
      nis,
    });
    setNama("");
    setNis("");
    loadData();
  };

  const handleHapus = async (id) => {
    await deleteSiswa(id);
    loadData();
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Data Siswa</h1>

      {/* Form */}
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <input
          className="border p-2 mr-2"
          placeholder="NIS"
          value={nis}
          onChange={(e) => setNis(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={handleTambah}
        >
          Tambah
        </button>
      </div>

      {/* List */}
      <ul>
        {siswa.map((item) => (
          <li key={item.id} className="border p-2 mb-2 flex justify-between">
            <span>
              {item.nama} - {item.nis}
            </span>
            <button
              className="bg-red-500 text-white px-2"
              onClick={() => handleDelete(item.id)}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
