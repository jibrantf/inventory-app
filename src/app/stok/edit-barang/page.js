"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axiosInstance from '../../../../utils/axiosInstance'; 
import Sidebar from '../../../components/Sidebar';

const EditBarang = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id_barang = searchParams.get('id');

  const [form, setForm] = useState({
    part_number: '',
    nama_barang: '',
    stok: '',
    satuan: '',
    keterangan: '',
    id_kategori: '',
  });

  const [kategoriOptions, setKategoriOptions] = useState([]); // State untuk data kategori
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  const satuanOptions = ["pcs", "box", "roll", "meter", "pack"]; // Enum satuan

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:3000/api/kategori/get-kategori');
        setKategoriOptions(response.data.data);
      } catch (err) {
        console.error('Error fetching kategori:', err);
        setError('Gagal mengambil data kategori.');
      }
    };

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:3000/api/barang/detail/${id_barang}`);
        if (response.data.success) {
          const data = response.data.data;
          setForm({
            part_number: data.part_number,
            nama_barang: data.nama_barang,
            stok: data.stok,
            satuan: data.satuan,
            keterangan: data.keterangan || '', // Pastikan keterangan tidak undefined
            id_kategori: data.id_kategori,
          });
        } else {
          setError(response.data.message || 'Gagal mengambil data barang.');
        }
      } catch (err) {
        console.error('Error fetching barang data:', err);
        setError('Gagal mengambil data barang.');
      }
    };

    if (id_barang) {
      fetchKategori();
      fetchData();
    }
  }, [id_barang]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(null); // Reset error saat ada perubahan
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.part_number || !form.nama_barang || form.stok === '' || !form.satuan || !form.id_kategori) {
      setError('Kode barang, nama barang, stok, satuan, dan kategori harus diisi.');
      return;
    }
  
    const selectedKategori = kategoriOptions.find(k => k.id_kategori === form.id_kategori);
    const nama_kategori = selectedKategori ? selectedKategori.nama_kategori : '';
  
    const dataToSend = {
      ...form,
      nama_kategori, // Tambahkan nama_kategori jika diperlukan oleh API
    };
  
    try {
      const response = await axiosInstance.put(`http://localhost:3000/api/barang/update-barang/${id_barang}`, dataToSend);
      if (response.data.success) {
        setAlert({ message: 'Barang berhasil diperbarui', type: 'success' });
        router.push('/stok');
      } else {
        setError(response.data.message || 'Gagal mengedit barang.');
      }
    } catch (err) {
      console.error('Error editing barang:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || 'Gagal mengedit barang. Coba lagi.');
    }
  };

  const handleCancel = () => {
    router.push('/stok');
  };

  return (
    <div className="flex bg-gray-100 min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-6 lg:ml-64 max-w-8xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Edit Barang</h1>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {alert && <p className={`mb-4 text-center ${alert.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>{alert.message}</p>}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
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

              <div>
                <label className="block text-gray-700">Kategori</label>
                <select
                  name="id_kategori"
                  value={form.id_kategori}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="" disabled>Pilih Kategori</option>
                  {kategoriOptions.map((kategori) => (
                    <option key={kategori.id_kategori} value={kategori.id_kategori}>
                      {kategori.nama_kategori}
                    </option>
                  ))}
                </select>
              </div>

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
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Edit Barang
              </button>

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

export default EditBarang;
