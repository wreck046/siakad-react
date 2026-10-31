import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import {
  getSiswa,
  createSiswa,
  deleteSiswa,
  updateSiswa,
} from "../services/siswaService";

export default function SiswaPage() {
  //state management
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [siswa, setSiswa] = useState([]);
  const [nama, setNama] = useState("");
  const [nis, setNis] = useState("");
  const [selected, setSelected] = useState(null);
  const [editNama, setEditNama] = useState("");
  const [editNis, setEditNis] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);

  const loadData = async () => {
    try {
      const res = await getSiswa();
      setSiswa(res.data);
    } catch (err) {
      // Error jaringan / 401 sudah ditangani interceptor.
      console.error("Gagal memuat data siswa:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTambah = async () => {
    if (!nama.trim() || !nis.trim()) {
      toast.error("Nama dan NIS wajib diisi");
      return;
    }

    try {
      setLoading(true);
      await createSiswa({ nama: nama.trim(), nis: nis.trim() });

      toast.success("Siswa berhasil ditambahkan!");

      setNama("");
      setNis("");
      await loadData();
    } catch (err) {
      if (err.response) toast.error("Gagal menambahkan siswa");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus siswa ini?")) return;

    try {
      setLoading(true);
      await deleteSiswa(id);

      toast.success("Siswa berhasil dihapus!");

      await loadData();
    } catch (err) {
      if (err.response) toast.error("Gagal menghapus siswa");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setSelected(item);
    setEditNama(item.nama);
    setEditNis(item.nis);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelected(null);
    setEditNama("");
    setEditNis("");
  };

  const handleUpdate = async () => {
    if (!editNama.trim() || !editNis.trim()) {
      toast.error("Nama dan NIS wajib diisi");
      return;
    }

    try {
      setLoading(true);
      await updateSiswa(selected.id, {
        nama: editNama.trim(),
        nis: editNis.trim(),
      });

      toast.success("Siswa berhasil diperbarui!");

      closeEdit();
      await loadData();
    } catch (err) {
      if (err.response) toast.error("Gagal memperbarui siswa");
    } finally {
      setLoading(false);
    }
  };

  const keyword = search.trim().toLowerCase();
  const filteredSiswa = siswa.filter(
    (item) =>
      item.nama?.toLowerCase().includes(keyword) ||
      item.nis?.toLowerCase().includes(keyword),
  );

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
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center min-w-24 disabled:opacity-60"
              onClick={handleTambah}
              disabled={loading}
            >
              {loading ? <ClipLoader size={18} color="#ffffff" /> : "Tambah"}
            </button>
          </div>

          {/* Search Student */}
          <input
            type="text"
            placeholder="Cari nama atau NIS"
            className="border p-2 rounded mb-4 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* List */}
          {filteredSiswa.length === 0 ? (
            <p className="text-center text-gray-500">
              {siswa.length === 0
                ? "Belum ada data siswa."
                : "Tidak ada siswa yang cocok."}
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredSiswa.map((item) => (
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
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded disabled:opacity-60"
                      onClick={() => handleEdit(item)}
                      disabled={loading}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded disabled:opacity-60"
                      onClick={() => handleDelete(item.id)}
                      disabled={loading}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Edit Modal */}
          {isEditOpen && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
              <div className="bg-white p-6 rounded-xl shadow w-80">
                <h2 className="text-xl font-bold mb-4">Edit Siswa</h2>

                <input
                  className="border p-2 w-full mb-2"
                  value={editNama}
                  onChange={(e) => setEditNama(e.target.value)}
                />
                <input
                  className="border p-2 w-full mb-4"
                  value={editNis}
                  onChange={(e) => setEditNis(e.target.value)}
                />

                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-400 px-3 py-1 rounded"
                    onClick={closeEdit}
                  >
                    Batal
                  </button>

                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded flex items-center justify-center min-w-20 disabled:opacity-60"
                    onClick={handleUpdate}
                    disabled={loading}
                  >
                    {loading ? (
                      <ClipLoader size={16} color="#ffffff" />
                    ) : (
                      "Simpan"
                    )}
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
