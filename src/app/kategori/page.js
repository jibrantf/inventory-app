"use client";

import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import Alert from '../../components/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const Kategori = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form, setForm] = useState({
    nama_kategori: '',
    id_kategori: '',
  });

  const [userRole, setUserRole] = useState("");
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:3000/api/kategori/get-kategori');
        setData(response.data.data);
        console.log('Data kategori:', response.data.data);
      } catch (err) {
        console.error('Error fetching kategori:', err);
        setError('Gagal mengambil data kategori.');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };


    const token = localStorage.getItem("token"); 
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserRole(decodedToken.role);
    }


    fetchData();
  }, []);

  const handleOpenForm = (kategori = null) => {
    if (kategori) {
      setIsEditMode(true);
      setForm({
        nama_kategori: kategori.nama_kategori,
        id_kategori: kategori.id_kategori,
      });
    } else {
      setIsEditMode(false);
      setForm({
        nama_kategori: '',
        id_kategori: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nama_kategori) {
      setError('Nama kategori harus diisi.');
      return;
    }

    try {
      if (isEditMode) {
        // Update kategori
        await axiosInstance.put(`http://localhost:3000/api/kategori/update-kategori/${form.id_kategori}`, {
          nama_kategori: form.nama_kategori,
        });
        setData((prevData) =>
          prevData.map((item) =>
            item.id_kategori === form.id_kategori
              ? { ...item, nama_kategori: form.nama_kategori }
              : item
          )
        );
        setAlert({ message: "Kategori berhasil diperbarui!", type: "success", visible: true });
      } else {
        const response = await axiosInstance.post('http://localhost:3000/api/kategori/add-kategori', {
          nama_kategori: form.nama_kategori,
        });
        setData((prevData) => [...prevData, response.data.data]);
        setAlert({ message: "Kategori berhasil ditambahkan!", type: "success", visible: true });
      }
      handleCloseForm();
    } catch (err) {
      console.error('Error submitting kategori:', err);
      setAlert({ message: "Terjadi kesalahan!", type: "error", visible: true });
    }

    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 2000);
  };

  

  const handleDelete = async (id_kategori) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus kategori ini?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`http://localhost:3000/api/kategori/delete-kategori/${id_kategori}`);
      setData((prevData) => prevData.filter((item) => item.id_kategori !== id_kategori));
      setAlert({ message: "Kategori berhasil dihapus!", type: "success", visible: true });
    } catch (err) {
      console.error('Error deleting kategori:', err);
      alert('Gagal menghapus kategori.');
    }
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 2000);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxPageButtons = 5;

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) => (
      <button
        key={index}
        onClick={() => typeof page === 'number' && goToPage(page)}
        className={`px-2 py-1 text-sm ${currentPage === page ? 'bg-gray-300' : 'bg-gray-200'} text-gray-700 rounded hover:bg-gray-300`}
      >
        {page}
      </button>
    ));
  };

  const closeAlert = () => setAlert({ ...alert, visible: false }); 

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;


  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="flex-1 p-4 lg:p-0">
      <div className="flex justify-between items-center -mb-4 mt-6">
      <h1 className="text-xl font-semibold text-black flex items-center ml-2">
            <FontAwesomeIcon icon={faLayerGroup} className="mr-2" /> KATEGORI BARANG
          </h1>
          {(userRole === "superuser" || userRole === "atasan") && (
          <button
            onClick={() => handleOpenForm()}
            className="bg-emerald-500 text-white text-sm px-2 py-1 rounded hover:bg-emerald-600"
          >
            Tambah Kategori Baru
          </button>
          )}
        </div>
        <div className="mt-6 w-full bg-white rounded-2xl shadow-xl p-6 border border-gray-300">
        <table className="min-w-full bg-white border border-gray-300 rounded">
  <thead>
    <tr className="bg-slate-600 text-gray-100">
      <th className="py-3 text-center text-xs font-semibold uppercase">Nama Kategori</th>
      { (userRole === "superuser" || userRole === "atasan") && (
        <th className="py-3 pr-0 text-center text-xs font-semibold uppercase">Aksi</th>
      )}
    </tr>
  </thead>
  <tbody>
      {currentItems.length > 0 ? (
        currentItems.map((kategori, index) => (
      <tr key={kategori.id_kategori} className="bg-slate-200 hover:bg-slate-300 text-gray-900">
        <td className="py-2 px-4 border-b border-gray-300 text-center">{kategori.nama_kategori}</td>
        { (userRole === "superuser" || userRole === "atasan") && (
          <td className="py-2 px-4 border-b border-gray-300 text-center">
            <button
              onClick={() => handleOpenForm(kategori)}
              className="bg-blue-500 text-white text-xs px-2 py-1 rounded mr-2 hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(kategori.id_kategori)}
              className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
            >
              Hapus
            </button>
          </td>
        )}
      </tr>
      ))
    ) : (
      <tr>
        <td colSpan={userRole === "superuser" || userRole === "atasan" ? 3 : 2} className="py-3 px-4 text-center">Tidak Terdapat Data</td>
      </tr>
    )}

  </tbody>
</table>
 {/* Kontrol Navigasi Halaman */}
 <nav className="flex justify-start mt-4 space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous
          </button>
          {renderPagination()}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </nav>
    </div>

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl transform translate-x-0 sm:translate-x-0 lg:translate-x-20 -mt-60">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                {isEditMode ? 'Edit Kategori' : 'Tambah Kategori Baru'}
              </h2>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="mb-4">
                  <label className="block text-black text-sm">Nama Kategori</label>
                  <input
                    type="text"
                    name="nama_kategori"
                    value={form.nama_kategori}
                    onChange={handleChange}
                    className="w-full bg-white px-4 py-2 text-sm border rounded-md"
                    required
                  />
                </div>
                <div className="flex justify-end">
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
                    {isEditMode ? 'Simpan Perubahan' : 'Tambah Kategori'}
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

export default Kategori;
