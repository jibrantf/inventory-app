"use client";

import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import TableStok from '../../components/TableStok';
import Alert from '../../components/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { set } from 'date-fns';
import { useRouter } from 'next/navigation';

const StokBarang = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); 
  const [form, setForm] = useState({
    part_number: '',
    nama_barang: '',
    stok: '',
    satuan: '',
    keterangan: '',
    nama_kategori: '', 
    lokasi_barang: '',
    id_barang: '',
  });
  const [kategoriOptions, setKategoriOptions] = useState([]);
  const lokasiOptions = ['Rak-A', 'Rak-B', 'Rak-C', 'Rak-D', 'Rak-E'];
  const satuanOptions = ["pcs", "meter"];
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [userRole, setUserRole] = useState("");

  const fetchKategori = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:3000/api/kategori/get-kategori');
      setKategoriOptions(response.data.data);
      console.log('Data kategori:', response.data.data);
    } catch (err) {
      console.error('Error fetching kategori:', err);
      setError('Gagal mengambil data kategori.');
    }
  };

  useEffect(() => {
    const getStokData = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:3000/api/barang/get-barang');
        setData(response.data.data);
        console.log('Data stok barang:', response.data.data);
      } catch (error) {
        console.error('Error fetching stok barang:', error);
        setError('Gagal mengambil data stok barang.');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

        // Menentukan peran pengguna berdasarkan token JWT (misalnya, dari localStorage)
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          setUserRole(decodedToken.role);
        }

    fetchKategori();
    getStokData();
  }, []);

  const handleDelete = async (id_barang) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus barang ini?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`http://localhost:3000/api/barang/delete-barang/${id_barang}`);
      setData(data.filter((item) => item.id_barang !== id_barang));
      setAlert({ message: "Data berhasil dihapus", type: "success", visible: true });
    } catch (error) {
      console.error("Error deleting item:", error);
      setAlert({ message: "Gagal menghapus data", type: "error", visible: true });
    }
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 2000);
  };

  const handleOpenForm = (barang = null) => {
    if (barang) {
      setIsEditMode(true);
      setForm({
        part_number: barang.part_number,
        nama_barang: barang.nama_barang,
        stok: barang.stok,
        satuan: barang.satuan,
        keterangan: barang.keterangan || '',
        nama_kategori: barang.nama_kategori || '', 
        lokasi_barang: barang.lokasi_barang || '',
        id_barang: barang.id_barang, 
      });
    } else {
      setIsEditMode(false);
      setForm({
        part_number: '',
        nama_barang: '',
        stok: '',
        satuan: '',
        keterangan: '',
        nama_kategori: '',
        lokasi_barang: '',
        id_barang: '',
      });
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setError(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(item => 
    item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.part_number || !form.nama_barang || form.stok === '' || !form.satuan || !form.nama_kategori || !form.lokasi_barang) {
      setError('Kode barang, nama barang, stok, satuan, dan kategori harus diisi.');
      return;
    }

     // Validasi lokasi barang
  if (!lokasiOptions.includes(form.lokasi_barang)) {
    setError('Lokasi barang tidak valid. Pilih lokasi dari opsi yang tersedia.');
    return;
  }
  
    const updatedForm = { ...form };
  
    const fieldsToUpdate = {
      part_number: updatedForm.part_number,
      nama_barang: updatedForm.nama_barang,
      stok: updatedForm.stok,
      satuan: updatedForm.satuan,
      keterangan: updatedForm.keterangan,
      nama_kategori: updatedForm.nama_kategori,
      lokasi_barang: updatedForm.lokasi_barang
    };
  
    try {
      let response;
      if (isEditMode) {
        if (!form.id_barang) {
          setError('ID barang tidak ditemukan.');
          return;
        }

        response = await axiosInstance.put(`http://localhost:3000/api/barang/update-barang/${form.id_barang}`, fieldsToUpdate);
  
        if (response.data.success) {
          const updatedData = data.map((item) =>
            item.id_barang === form.id_barang ? { ...item, ...response.data.data } : item
          );
          setData(updatedData);
          setAlert({ message: 'Barang berhasil diperbarui', type: 'success', visible: true });
        } else {
          setAlert({ message: 'Gagal mengedit barang.', type: 'error', visible: true });
        }
      } else {
        // Tambah barang baru
        response = await axiosInstance.post('http://localhost:3000/api/barang/add-barang', fieldsToUpdate);
        if (response.data.success) {
          const newBarang = response.data.data;
          setData((prevData) => [...prevData, newBarang]); 
          setAlert({ message: 'Barang berhasil ditambahkan', type: 'success', visible: true });
        } else {
          setError(response.data.message || 'Gagal menambahkan barang.');
        }
      }
  
      fetchKategori();
      handleCloseForm();
    } catch (err) {
      console.error('Error adding/editing barang:', err.response ? err.response.data : err.message);
      setAlert({ message: 'Gagal menambahkan barang.', type: 'error', visible: true });
    }
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 2000);
  };
  
  
  const closeAlert = () => setAlert({ ...alert, visible: false }); 
  
  
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="flex bg-gray-200 min-h-screen">
      <div className="flex-1 p-4 lg:p-0">
        <div className="flex justify-between items-center -mb-2 mt-6">
        <h1 className="text-xl font-semibold text-black flex items-center ml-2">
            <FontAwesomeIcon icon={faBox} className="mr-2" /> STOK BARANG
          </h1>
          <div className="flex items-center">
          <input
            type="text"
            placeholder="Cari Barang..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-2 py-1 text-sm border rounded mr-2" 
          />
          {(userRole === "superuser" || userRole === "atasan") && (
            <button
              onClick={() => handleOpenForm()}
              className="bg-emerald-500 text-white text-sm px-2 py-1 rounded hover:bg-emerald-600"
            >
              Tambah Barang
            </button>
          )}
        </div>
      </div>
       <TableStok 
          data={filteredData} 
          onEdit={handleOpenForm} 
          onDelete={handleDelete} 
        />
        {/* Modal Popup */}
{/* Modal Popup */}
{showForm && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {isEditMode ? 'Edit Barang' : 'Tambah Barang Baru'}
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4" autoComplete="off">
        {/* Part Number */}
        <div>
          <label className="block text-sm text-gray-700">Part Number</label>
          <input
            type="text"
            name="part_number"
            value={form.part_number}
            onChange={handleChange}
            className="w-full bg-white px-4 py-2 text-sm border rounded-md"
            required
          />
        </div>

        {/* Nama Barang */}
        <div>
          <label className="block text-sm text-gray-700">Nama Barang</label>
          <input
            type="text"
            name="nama_barang"
            value={form.nama_barang}
            onChange={handleChange}
            className="w-full bg-white px-4 py-2 text-sm border rounded-md"
            required
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm text-gray-700">Kategori</label>
          <select
            name="nama_kategori"
            value={form.nama_kategori || ''}
            onChange={handleChange}
            className="w-full bg-white px-4 py-2 text-sm border rounded-md"
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
          <label className="block text-sm text-gray-700">Stok</label>
          <input
            type="number"
            name="stok"
            value={form.stok}
            onChange={handleChange}
            className="w-full bg-white px-4 py-2 text-sm border rounded-md"
            required
          />
        </div>

        {/* Satuan */}
        <div>
          <label className="block text-sm text-gray-700">Satuan</label>
          <select
            name="satuan"
            value={form.satuan}
            onChange={handleChange}
            className="w-full bg-white px-4 py-2 text-sm border rounded-md"
            required
          >
            <option value="" disabled>Pilih Satuan</option>
            {satuanOptions.map((satuan) => (
              <option key={satuan} value={satuan}>
                {satuan}
              </option>
            ))}
          </select>
        </div>

        {/* Lokasi */}
        <div>
          <label className="block text-sm text-gray-700">Lokasi Penyimpanan</label>
          <select
            name="lokasi_barang"
            value={form.lokasi_barang}
            onChange={handleChange}
            className="w-full bg-white px-4 py-2 text-sm border rounded-md"
            required
          >
            <option value="" disabled>Pilih</option>
            {lokasiOptions.map((lokasi_barang) => (
              <option key={lokasi_barang} value={lokasi_barang}>
                {lokasi_barang}
              </option>
            ))}
          </select>
        </div>

        {/* Keterangan */}
        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-700">Keterangan</label>
          <textarea
            name="keterangan"
            value={form.keterangan}
            onChange={handleChange}
            className="w-full bg-white px-4 py-2 text-sm border rounded-md"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="sm:col-span-2 flex justify-end mt-6">
          <button
            type="button"
            onClick={handleCloseForm}
            className="bg-gray-300 text-gray-900 px-2 py-1 text-sm rounded-md mr-2 hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-1 text-sm rounded-md hover:bg-blue-600"
          >
            {isEditMode ? 'Simpan Perubahan' : 'Tambah Barang'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

          {alert.visible && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={closeAlert}
          />
        )}
      </div>
    </div>
  );
};

export default StokBarang;
