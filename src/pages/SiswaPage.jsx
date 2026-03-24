import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getSiswa,
  createSiswa,
  deleteSiswa,
  updateSiswa,
} from "../services/siswaService";

export default function SiswaPage() {
  const [siswa, setSiswa] = useState([]);
  const [nama, setNama] = useState("");
  const [nis, setNis] = useState("");
  const [selected, setSelected] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const loadData = async () => {
    const res = await getSiswa();
    setSiswa(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTambah = async () => {
    console.log("CLICKED");
    await createSiswa({ nama, nis });

    toast.success("Siswa berhasil ditambahkan!");

    setNama("");
    setNis("");
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteSiswa(id);

    toast.success("Siswa berhasil dihapus!");

    loadData();
  };

  const handleEdit = (item) => {
    setSelected(item);
    setNama(item.nama);
    setNis(item.nis);
    setIsEditOpen(true);
  };

  const handleUpdate = async () => {
    await updateSiswa(selected.id, { nama, nis });

    toast.success("Siswa berhasil diperbarui!");

    setIsEditOpen(false);
    setNama("");
    setNis("");
    setSelected(null);

    loadData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="min-h-screen bg-gray-100 p-6">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-6 text-center">📚 Data Siswa</h1>

          {/* Form */}
          <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-3">
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
              type="button"
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

                <div className="flex gap-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Modal */}
          {isEditOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
              <div className="bg-white p-6 rounded-xl shadow w-80">
                <h2 className="text-xl font-bold mb-4">Edit Siswa</h2>

                <input
                  className="border p-2 w-full mb-2"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
                <input
                  className="border p-2 w-full mb-4"
                  value={nis}
                  onChange={(e) => setNis(e.target.value)}
                />

                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-400 px-3 py-1 rounded"
                    onClick={() => setIsEditOpen(false)}
                  >
                    Batal
                  </button>

                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={handleUpdate}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
