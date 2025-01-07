"use client";

import { useEffect, useState } from "react";
import { parseISO, format } from "date-fns";
import TableBarangRusak from "../../components/TableBarangRusak";
import FormBarangRusak from "../../components/FormBarangRusak";
import Alert from '../../components/Alert';
import axiosInstance from "../../../utils/axiosInstance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesPacking } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';


const BarangRusakPage = () => {
  const [barangRusak, setBarangRusak] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    id_rusak: '', 
    id_kategori: '',
    nama_kategori: '',
    nama_barang: '',
    jumlah_rusak: '',
    keterangan: '',
    created_at: '',
    created_by: '',
  });

  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemStocks, setItemStocks] = useState({});
  const [noItemsMessage, setNoItemsMessage] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false); 
  const [barangRusakDetail, setBarangRusakDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredBarangRusak, setFilteredBarangRusak] = useState([]);
  const displayData = filteredBarangRusak.length > 0 ? filteredBarangRusak : barangRusak;

  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });


  const filterDataByDate = (date, data) => {
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.created_at).toISOString().split('T')[0];
      return itemDate === date;
    });

    if (filteredData.length === 0) {
      setNoItemsMessage('Tidak ada data untuk tanggal yang dipilih');
    } else {
      setNoItemsMessage(''); 
    }

    setFilteredBarangRusak(filteredData);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    filterDataByDate(date, barangRusak);
  };

  const handleReset = () => {
    setSelectedDate('');
    setFilteredBarangRusak(barangRusak); 
    setNoItemsMessage(''); 
  };

  useEffect(() => {
    fetchBarangRusak(); 
  }, []);


  const fetchBarangRusak = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:3000/api/barang-rusak/get-barang-rusak");
      setBarangRusak(response.data.data || []);
      console.log("Data barang rusak:", response.data.data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data barang rusak:", error);
      setError("Gagal mengambil data barang rusak.");
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchBarangRusak(); 
  }, []); 

  useEffect(() => {
    const filteredData = barangRusak.filter((item) => {
      const matchesSearch = searchQuery
        ? item.nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
  
      const matchesDate = selectedDate
        ? new Date(item.created_at).toISOString().split("T")[0] === selectedDate
        : true;
  
      return matchesSearch && matchesDate;
    });
  
    setFilteredBarangRusak(filteredData);
  }, [searchQuery, selectedDate, barangRusak]);
  

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:3000/api/kategori/get-kategori');
      if (response.data.success) {
        console.log("Data kategori:", response.data.data);
        setCategories(response.data.data);
      } else {
        setError(response.data.message || 'Gagal mengambil kategori.');
      }
    } catch (err) {
      setError('Gagal menghubungi server.');
    }
  };

  const fetchItemsByCategory = async (id_kategori) => {
    if (!id_kategori) {
      setFilteredItems([]);
      setItemStocks({});
      setNoItemsMessage('');
      return;
    }

    try {
      const response = await axiosInstance.get(`http://localhost:3000/api/barang/get-barang/${id_kategori}`);
      if (response.data.success) {
        if (response.data.data.length === 0) {
          setNoItemsMessage('Tidak ada barang di kategori ini.');
          setFilteredItems([]);
        } else {
          setFilteredItems(response.data.data);
          setNoItemsMessage('');

          const stocks = {};
          response.data.data.forEach(item => {
            stocks[item.nama_barang] = item.stok;
          });
          setItemStocks(stocks);
        }
      } else {
        setError(response.data.message || 'Gagal mengambil barang.');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setNoItemsMessage('Kategori tidak ditemukan.');
        setFilteredItems([]);
      } else {
        setError('Gagal menghubungi server.');
      }
    }
  };

  const fetchDetailBarangRusak = async (id_rusak) => {
    try {
      const response = await axiosInstance.get(`http://localhost:3000/api/barang-rusak/detail-barang-rusak/${id_rusak}`);
      console.log("Data barang rusak detail:", response.data.data);
      if (response.data.success) {
        const data = response.data.data;
    
        const formattedDate = data.created_at
        ? format(parseISO(data.created_at), "dd MMM yyyy HH:mm:ss")
        : "Tanggal tidak tersedia";

        setBarangRusakDetail({
          id_rusak: data.id_rusak,
          nama_kategori: data.nama_kategori,
          nama_barang: data.nama_barang,
          jumlah_rusak: data.jumlah_rusak,
          keterangan: data.keterangan,
          created_at: formattedDate,
          created_by: data.created_by ? data.created_by.username : 'N/A',
        });
    
        setShowDetailModal(true);
      } else {
        setError(response.data.message || "Gagal mengambil detail barang rusak.");
      }
    } catch (error) {
      setError("Gagal menghubungi server.");
    }
  };

  const handleDetail = async (id_rusak, e) => {
    if (e && e.target) {
      const buttonRect = e.target.getBoundingClientRect();
      
      setModalPosition({
        top: buttonRect.top + window.scrollY - 5,
        left: buttonRect.left + window.scrollX - 260,
      });
    }
  
    try {
      await fetchDetailBarangRusak(id_rusak);
    } catch (error) {
      console.error("Error fetching detail barang rusak:", error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (name === 'id_kategori') {
      setForm((prevForm) => ({ ...prevForm, nama_barang: '' }));
      fetchItemsByCategory(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.id_kategori || !form.nama_barang || form.jumlah_rusak === '' || form.keterangan === undefined || !form.tempat_barang) {
      setError('Kategori, nama barang, jumlah rusak, keterangan, dan tempat barang harus diisi.');
      return;
    }
  
    if (!filteredItems.length) {
      setError('Kategori yang dipilih tidak memiliki barang.');
      return;
    }
  
    const currentStock = itemStocks[form.nama_barang] ? Number(itemStocks[form.nama_barang]) : 0;
    const jumlahRusak = Number(form.jumlah_rusak);
    const newStock = currentStock - jumlahRusak;
  
    const selectedCategory = categories.find(cat => cat.id_kategori === form.id_kategori);
  
    try {
      const response = form.id_rusak
        ? await axiosInstance.put(`http://localhost:3000/api/barang-rusak/update-barang-rusak/${form.id_rusak}`, {
            nama_kategori: selectedCategory ? selectedCategory.nama_kategori : '',
            nama_barang: form.nama_barang,
            jumlah_rusak: jumlahRusak,
            keterangan: form.keterangan || null,
            tempat_barang: form.tempat_barang,  // Mengirimkan tempat_barang
            new_stock: newStock,
          })
        : await axiosInstance.post('http://localhost:3000/api/barang-rusak/add-barang-rusak', {
            nama_kategori: selectedCategory ? selectedCategory.nama_kategori : '',
            nama_barang: form.nama_barang,
            jumlah_rusak: jumlahRusak,
            keterangan: form.keterangan || null,
            tempat_barang: form.tempat_barang,  // Mengirimkan tempat_barang
            new_stock: newStock,
          });
  
      if (response.data.success) {
        setAlert({
          message: form.id_rusak ? 'Barang rusak berhasil diubah' : 'Barang rusak berhasil ditambahkan',
          type: 'success',
          visible: true,
        });
        fetchBarangRusak();
        setIsFormOpen(false);
      } else {
        setError(response.data.message || 'Gagal menambahkan/merubah barang rusak.');
        setAlert({ message: response.data.message || 'Gagal menambahkan/merubah barang rusak.', type: 'error', visible: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menambahkan/merubah barang rusak. Coba lagi.');
    }
  
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 2000);
  };
  
  
  const deleteBarangRusak = async (id_rusak) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus barang rusak ini?");
    
    if (!confirmDelete) return;
  
    try {
      const response = await axiosInstance.delete(`http://localhost:3000/api/barang-rusak/delete-barang-rusak/${id_rusak}`);
      console.log(response);
  
      if (response.data.success) {
        setBarangRusak((prev) => prev.filter((item) => item.id_rusak !== id_rusak));
        setAlert({ message: "Barang rusak berhasil dihapus.", type: "success", visible: true });
      } else {
        setAlert({ message: "Gagal menghapus barang rusak.", type: "error", visible: true });
      }
    } catch (error) {
      console.error(error);
      setAlert({ message: "Gagal menghapus barang rusak.", type: "error", visible: true });
    }
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 2000);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  

  const filteredData = barangRusak.filter(item =>
    item.nama_barang.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.nama_kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCancel = () => {
    setIsFormOpen(false);
    setForm({
      id_rusak: '',
      id_kategori: '',
      nama_barang: '',
      jumlah: '',
      tempat_barang: '',
      keterangan: '',
    });
  };

  const handleEdit = (barang) => {
    setForm({
      id_rusak: barang.id_rusak || '',
      id_kategori: barang.id_kategori || '',
      nama_barang: barang.nama_barang || '',
      jumlah_rusak: barang.jumlah || '',
      tempat_barang: barang.tempat_barang || '',
      keterangan: barang.keterangan || '',
    });
    fetchItemsByCategory(barang.id_kategori);
    setIsFormOpen(true);
  };

  useEffect(() => {
    fetchBarangRusak();
    fetchCategories();
  }, []);

  const closeAlert = () => setAlert({ ...alert, visible: false }); 

  if (loading) return <div className="flex justify-center items-center h-screen"> </div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;


  return (
    <div className="flex bg-gray-200 min-h-screen">
      <div className="flex-1 p-4 lg:p-0">
        <div className="flex justify-between items-center mt-8 relative flex-wrap sm:flex-nowrap">
        <h1 className="text-xl font-semibold text-black flex items-center ml-2">
                <FontAwesomeIcon icon={faBoxesPacking} className="mr-2" />TRANSAKSI BARANG RUSAK
              </h1>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            {noItemsMessage && (
              <div className="text-red-500 text-sm">
                {noItemsMessage}
              </div>
            )}
          
            <div className="flex items-center gap-2 ml-4 sm:ml-0">
              <div>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateClick(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
              <button
                onClick={handleReset} 
                className="bg-gray-500 text-white px-2 py-1 text-sm rounded hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
  
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Cari barang..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="border rounded px-2 py-1 text-sm"
              />
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-emerald-500 text-white px-2 py-1 text-sm rounded hover:bg-emerald-600"
              >
                {form.id_rusak ? 'Edit Barang Rusak' : 'Tambah Transaksi'}
              </button>
            </div>
          </div>
        </div>
  
        {showDetailModal && barangRusakDetail && (
          <div
            className="fixed text-xs bg-white border border-gray-300 p-4 rounded shadow-xl z-50 w-64"
            style={{
              top: modalPosition.top, 
              left: modalPosition.left,
            }}
          >
            <p><strong>Waktu Input:</strong> {barangRusakDetail.created_at}</p>
            <p><strong>Oleh:</strong> {barangRusakDetail.created_by}</p>
  
            <button
              onClick={() => setShowDetailModal(false)}
              className="mt-2 text-blue-500 hover:underline"
            >
              Tutup
            </button>
          </div>
        )}
  
        <TableBarangRusak
          data={displayData.map(item => ({
            ...item,
            created_at: item.created_at ? new Date(item.created_at).toLocaleString() : "Tanggal tidak tersedia",
          }))}
          onEdit={handleEdit}
          onDelete={deleteBarangRusak}
          onViewDetail={(id_rusak, e) => handleDetail(id_rusak, e)} // Kirimkan event ke handler
        />
  
        {isFormOpen && (
          <FormBarangRusak
            form={form}
            setForm={setForm}
            categories={categories}
            filteredItems={filteredItems}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          />
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
  
  export default BarangRusakPage;
  
