"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../../../utils/axiosInstance'; 
import Sidebar from '../../../components/Sidebar';

const TambahBarang = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    part_number: '',
    nama_barang: '',
    stok: '',
    satuan: '',
    keterangan: '',
    nama_kategori: '',
  });
  const [kategoriOptions, setKategoriOptions] = useState([]); // State untuk data kategori
  const [error, setError] = useState(null);

  const satuanOptions = ["pcs", "box", "roll", "meter", "pack"]; // Enum satuan

  useEffect(() => {
    // Fetch data kategori dari API
    const fetchKategori = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:3000/api/kategori/get-kategori'); // Sesuaikan endpoint API kategori
        setKategoriOptions(response.data.data);
        console.log("Data kategori:", response.data.data)
      } catch (err) {
        console.error('Error fetching kategori:', err);
        setError('Gagal mengambil data kategori.');
      }
    };
    fetchKategori();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.part_number || !form.nama_barang || form.stok === '' || !form.satuan || !form.nama_kategori) {
      setError('Kode barang, nama barang, stok, satuan, dan kategori harus diisi.');
      return;
    }
  
    try {
      const response = await axiosInstance.post('http://localhost:3000/api/barang/add-barang', form);
      if (response.data.success) {
        // Menambahkan barang baru ke tabel
        setData([...data, response.data.data]);
  
        // Pastikan kategori yang digunakan ada di kategoriOptions
        const kategoriBaru = form.nama_kategori;
        if (!kategoriOptions.some((kategori) => kategori.nama_kategori === kategoriBaru)) {
          setKategoriOptions([...kategoriOptions, { id_kategori: Date.now(), nama_kategori: kategoriBaru }]);
        }
  
        // Menutup modal dan mereset form
        setShowForm(false);
        setForm({
          part_number: '',
          nama_barang: '',
          stok: '',
          satuan: '',
          keterangan: '',
          nama_kategori: '',
        });
      } else {
        setError(response.data.message || 'Gagal menambahkan barang.');
      }
    } catch (err) {
      console.error('Error adding barang:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || 'Gagal menambahkan barang. Coba lagi.');
    }
  };

  const handleCancel = () => {
    router.push('/stok'); // Redirect ke halaman stok saat klik Batal
  };

  return (
    <div className="flex bg-gray-100 min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-6 lg:ml-64 max-w-8xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Tambah Barang</h1>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {/* Kolom Kiri */}
              <div>
                <label className="block text-gray-700">Kode Barang</label>
                <input
                  type="text"
                  name="part_number"
                  value={form.part_number}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              {/* Kolom Kanan */}
              <div>
                <label className="block text-gray-700">Nama Barang</label>
                <input
                  type="text"
                  name="nama_barang"
                  value={form.nama_barang}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              {/* Dropdown Kategori */}
              <div>
                <label className="block text-gray-700">Kategori</label>
                <select
                  name="id_kategori"
                  value={form.nama_kategori}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="" disabled>Pilih Kategori</option>
                  {kategoriOptions.map((kategori) => (
                    <option key={kategori.id_kategori} value={kategori.nama_kategori}>
                      {kategori.nama_kategori}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stok */}
              <div>
                <label className="block text-gray-700">Stok</label>
                <input
                  type="number"
                  name="stok"
                  value={form.stok}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              {/* Satuan */}
              <div>
                <label className="block text-gray-700">Satuan</label>
                <select
                  name="satuan"
                  value={form.satuan}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="" disabled>Pilih Satuan</option>
                  {satuanOptions.map((satuan, index) => (
                    <option key={index} value={satuan}>
                      {satuan}
                    </option>
                  ))}
                </select>
              </div>

              {/* Keterangan */}
              <div className="col-span-2">
                <label className="block text-gray-700">Keterangan</label>
                <textarea
                  name="keterangan"
                  value={form.keterangan}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="flex mt-6">
              {/* Tombol Tambah Barang di Kiri */}
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Tambah Barang
              </button>

              {/* Tombol Batal di Kanan */}
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 ml-2"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahBarang;
