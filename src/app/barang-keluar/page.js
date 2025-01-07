"use client";

import { useEffect, useState } from "react";
import { parseISO, format } from "date-fns";
import TableBarangKeluar from "../../components/TableBarangKeluar";
import FormBarangKeluar from "../../components/FormBarangKeluar";
import Alert from '../../components/Alert';
import axiosInstance from "../../../utils/axiosInstance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesPacking } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const BarangKeluarPage = () => {
  const [barangKeluar, setBarangKeluar] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    id_keluar: '',
    id_kategori: '',
    nama_barang: '',
    jumlah_keluar: '',
    keterangan: '',
    created_at: '',
    createdBy: '',
  });

  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemStocks, setItemStocks] = useState({});
  const [noItemsMessage, setNoItemsMessage] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [barangKeluarDetail, setBarangKeluarDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredBarangKeluar, setFilteredBarangKeluar] = useState([]);
  const displayData = filteredBarangKeluar.length > 0 ? filteredBarangKeluar : barangKeluar;

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

    setFilteredBarangKeluar(filteredData);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date); 
    filterDataByDate(date, barangKeluar); 
  };

  const handleReset = () => {
    setSelectedDate('');
    setFilteredBarangKeluar(barangKeluar);
    setNoItemsMessage(''); 
  };

  useEffect(() => {
    fetchBarangKeluar();
  }, []);

  // Fetch Barang Keluar
  const fetchBarangKeluar = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:3000/api/barang-keluar/get-barang-keluar");
      setBarangKeluar(response.data.data || []);
      console.log("Data barang keluar:", response.data.data);
      if (selectedDate) {
        filterDataByDate(selectedDate, response.data.data);
      }
    } catch (error) {
      setError("Gagal mengambil data barang keluar.");
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBarangKeluar(); 
  }, []); 
  useEffect(() => {
    const filteredData = barangKeluar.filter((item) => {
      const matchesSearch = searchQuery
        ? item.nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
  
      const matchesDate = selectedDate
        ? new Date(item.created_at).toISOString().split("T")[0] === selectedDate
        : true;
  
      return matchesSearch && matchesDate;
    });
  
    setFilteredBarangKeluar(filteredData);
  }, [searchQuery, selectedDate, barangKeluar]);



  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:3000/api/kategori/get-kategori");
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
      setError("Gagal mengambil barang.");
    }
  };
  
  const fetchDetailBarangKeluar = async (id_keluar) => {
    try {
      const response = await axiosInstance.get(`http://localhost:3000/api/barang-keluar/detail-barang-keluar/${id_keluar}`);
      console.log("Data barang keluar detail:", response.data.data);
      if (response.data.success) {
        const data = response.data.data;

        const formattedDate = data.created_at
        ? format(parseISO(data.created_at), "dd MMM yyyy HH:mm:ss")
        : "Tanggal tidak tersedia";

        setBarangKeluarDetail({
          id_keluar: data.id_keluar,
          nama_kategori: data.nama_kategori,
          nama_barang: data.nama_barang,
          jumlah_keluar: data.jumlah_keluar,
          keterangan: data.keterangan,
          created_at: formattedDate,
          created_by: data.created_by ? data.created_by.username : 'N/A',
        });
    
        setShowDetailModal(true); 
      } else {
        setError(response.data.message || "Gagal mengambil detail barang keluar.");
      }
    } catch (error) {
      setError("Gagal menghubungi server.");
    }
  };

  const handleDetail = async (id_keluar, e) => {
    if (e && e.target) {
      const buttonRect = e.target.getBoundingClientRect();

      setModalPosition({
        top: buttonRect.top + window.scrollY - 5,
        left: buttonRect.left + window.scrollX - 260,
      });
    }
  
    try {
      await fetchDetailBarangKeluar(id_keluar);
    } catch (error) {
      console.error("Error fetching detail barang keluar:", error);
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
  
    if (!form.id_kategori || !form.nama_barang || form.jumlah_keluar === '' || form.keterangan === undefined) {
      setError('Kategori, nama barang, jumlah keluar, dan keterangan harus diisi.');
      return;
    }
  
    if (!filteredItems.length) {
      setError('Kategori yang dipilih tidak memiliki barang.');
      return;
    }
  
    const selectedCategory = categories.find(cat => cat.id_kategori === form.id_kategori);
    const jumlahKeluar = parseInt(form.jumlah_keluar, 10);
    const currentStock = itemStocks[form.nama_barang] || 0;
  
    try {
      const response = form.id_keluar
        ? await axiosInstance.put(`http://localhost:3000/api/barang-keluar/update-barang-keluar/${form.id_keluar}`, {
            nama_kategori: selectedCategory ? selectedCategory.nama_kategori : '',
            nama_barang: form.nama_barang,
            jumlah_keluar: jumlahKeluar,
            keterangan: form.keterangan || null, 
          })
        : await axiosInstance.post('http://localhost:3000/api/barang-keluar/add-barang-keluar', {
            nama_kategori: selectedCategory ? selectedCategory.nama_kategori : '',
            nama_barang: form.nama_barang,
            jumlah_keluar: jumlahKeluar,
            keterangan: form.keterangan || null,
            stok: currentStock - jumlahKeluar,
          });
  
      if (response.data.success) {
        setAlert({ message: form.id_keluar ? 'Barang keluar berhasil diubah' : 'Barang keluar berhasil ditambahkan', type: 'success', visible: true });
        fetchBarangKeluar();
        setIsFormOpen(false);
      } else {
        setError(response.data.message || 'Gagal menambahkan/merubah barang keluar.');
        setAlert({ message: response.data.message || 'Gagal menambahkan/merubah barang keluar.', type: 'error', visible: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menambahkan/merubah barang keluar. Coba lagi.');
      setAlert({ message: err.response?.data?.message || 'Gagal menambahkan/merubah barang keluar. Coba lagi.', type: 'error', visible: true });
    }
  
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 2000);
  };
  

  // Handle Delete Barang Keluar
  const deleteBarangKeluar = async (id_keluar) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus barang ini?");
    if (!confirmDelete) return;

    try {
      const response = await axiosInstance.delete(`http://localhost:3000/api/barang-keluar/delete-barang-keluar/${id_keluar}`);

      if (response.data.success) {
        setBarangKeluar((prev) => prev.filter((item) => item.id_keluar !== id_keluar));
        setAlert({ message: "Barang keluar berhasil dihapus.", type: "success", visible: true });
      } else {
        setAlert({ message: "Gagal menghapus barang keluar. Coba lagi.", type: "error" });
        setAlert({ message: "Gagal menghapus barang keluar. Coba lagi.", type: "error", visible: true });
      }
    } catch (error) {
      setAlert({ message: "Gagal menghapus barang keluar. Coba lagi.", type: "error", visible: true });
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
  

  const filteredData = barangKeluar.filter(item =>
    item.nama_barang.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.nama_kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCancel = () => {
    setIsFormOpen(false);
    setForm({
      id_keluar: '',
      id_kategori: '',
      nama_barang: '',
      jumlah_keluar: '',
      keterangan: '',
    });
  };

  const handleEdit = (barang) => {
    setForm({
      id_keluar: barang.id_keluar || '',
      id_kategori: barang.id_kategori || '',
      nama_barang: barang.nama_barang || '',
      jumlah_keluar: barang.jumlah_keluar || '',
      keterangan: barang.keterangan || '',
    });
    fetchItemsByCategory(barang.id_kategori);
    setIsFormOpen(true);
  };

  useEffect(() => {
    fetchBarangKeluar();
    fetchCategories();
  }, []);

  const closeAlert = () => setAlert({ ...alert, visible: false }); 

  if (isloading) return <div className="flex justify-center items-center h-screen"></div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;


  return (
    <div className="flex bg-gray-200 min-h-screen">
      <div className="flex-1 p-4 lg:p-0">
        <div className="flex justify-between items-center mt-8 relative flex-wrap sm:flex-nowrap">
          <h1 className="text-xl font-semibold text-black flex items-center ml-2">
              <FontAwesomeIcon icon={faBoxesPacking} className="mr-2" />TRANSAKSI BARANG KELUAR
            </h1>
         <div className="flex items-center gap-2 mt-2 sm:mt-0">
              {noItemsMessage && (
                <div className="text-red-500 text-sm">
                  {noItemsMessage}
                </div>
              )}

              <div className="flex items-center gap-2">
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
            {form.id_keluar ? 'Edit Barang Keluar' : 'Tambah Transaksi'}
          </button>
        </div>
        </div>
        </div>

        
        {showDetailModal && barangKeluarDetail && (
              <div
                className="fixed text-xs bg-white border border-gray-300 p-4 rounded  shadow-xl z-50 w-64"
                style={{
                  top: modalPosition.top, 
                  left: modalPosition.left,
                }}
              >
                    <p><strong>Waktu Input:</strong> {barangKeluarDetail.created_at}</p>
                    <p><strong>Oleh:</strong> {barangKeluarDetail.created_by}</p>

                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="mt-2 text-blue-500 hover:underline"
                  >
                    Tutup
                  </button>
                  </div>
            )}

        <TableBarangKeluar
           data={displayData.map(item => ({
            ...item,
            created_at: item.created_at ? new Date(item.created_at).toLocaleString() : "Tanggal tidak tersedia"
          }))} 
          onEdit={handleEdit}
          onDelete={deleteBarangKeluar}
          onViewDetail={(id_keluar, e) => handleDetail(id_keluar, e)}
        />

        {isFormOpen && (
          <FormBarangKeluar
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

export default BarangKeluarPage;
