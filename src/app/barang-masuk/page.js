  "use client";

  import { useEffect, useState } from "react";
  import { parseISO, format, set } from "date-fns";
  import TableBarangMasuk from "../../components/TableBarangMasuk";
  import FormBarangMasuk from "../../components/FormBarangMasuk";
  import Alert from '../../components/Alert';
  import axiosInstance from "../../../utils/axiosInstance";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faBoxesPacking } from '@fortawesome/free-solid-svg-icons';
  import { useRouter } from 'next/navigation';
  

  const BarangMasukPage = () => {
    const [barangMasuk, setBarangMasuk] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState({ message: "", type: "", visible: false });
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
      id_masuk: '',
      id_kategori: '',
      nama_kategori: '',
      nama_barang: '',
      jumlah_masuk: '',
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
    const [detailData, setDetailData] = useState(null);
    const [barangMasukDetail, setBarangMasukDetail] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [filteredBarangMasuk, setFilteredBarangMasuk] = useState([]);
    const displayData = filteredBarangMasuk.length > 0 ? filteredBarangMasuk : barangMasuk;
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
    
      setFilteredBarangMasuk(filteredData); 
    };
    
    const handleDateClick = (date) => {
      setSelectedDate(date); 
      filterDataByDate(date, barangMasuk); 
    };
  
    const handleReset = () => {
      setSelectedDate('');
      setFilteredBarangMasuk(barangMasuk); 
      setNoItemsMessage(''); 
    };
  
    useEffect(() => {
      fetchBarangMasuk();
    }, []);



    const fetchBarangMasuk = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:3000/api/barang-masuk/get-barang-masuk");
        setBarangMasuk(response.data.data || []);
        console.log("Data barang masuk:", response.data.data);
        if (selectedDate) {
          filterDataByDate(selectedDate, response.data.data);
        }
      } catch (error) {
        setError("Gagal mengambil data barang masuk.");
        setAlert({ message: "Gagal mengambil data barang masuk.", type: "error", visible: true });
    
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
      setTimeout(() => {
        setAlert({ ...alert, visible: false });
      }, 2000);
    };
  
    useEffect(() => {
      fetchBarangMasuk();
    }, []);
  
    
    useEffect(() => {
      const filteredData = barangMasuk.filter((item) => {
        const matchesSearch = searchQuery
          ? item.nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        
        const matchesDate = selectedDate
          ? new Date(item.created_at).toISOString().split("T")[0] === selectedDate
          : true;
        
        return matchesSearch && matchesDate;
      });
    
      setFilteredBarangMasuk(filteredData);
    }, [searchQuery, selectedDate, barangMasuk]);
    

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
      setTimeout(() => {
        setAlert({ ...alert, visible: false });
      }, 2000);
    };

    const fetchDetailBarangMasuk = async (id_masuk) => {
      try {
        const response = await axiosInstance.get(`http://localhost:3000/api/barang-masuk/detail-barang-masuk/${id_masuk}`);
        console.log("Data barang masuk detail:", response.data.data);
        if (response.data.success) {
          const data = response.data.data;
    
          const formattedDate = data.created_at
          ? format(parseISO(data.created_at), "dd MMM yyyy HH:mm:ss")  // Menggunakan format baru
          : "Tanggal tidak tersedia";

          setBarangMasukDetail({
            id_masuk: data.id_masuk,
            nama_kategori: data.nama_kategori,
            nama_barang: data.nama_barang,
            jumlah_masuk: data.jumlah_masuk,
            keterangan: data.keterangan,
            created_at: formattedDate,
            created_by: data.created_by ? data.created_by.username : 'N/A',
          });
      
          setShowDetailModal(true); 
        } else {
          setError(response.data.message || "Gagal mengambil detail barang masuk.");
        }
      } catch (error) {
        setError("Gagal menghubungi server.");
      }
      setTimeout(() => {
        setAlert({ ...alert, visible: false });
      }, 2000);
    };
  


    const handleDetail = async (id_masuk, e) => {
      if (e && e.target) {
        const buttonRect = e.target.getBoundingClientRect();
      
        setModalPosition({
          top: buttonRect.top + window.scrollY - 5,
          left: buttonRect.left + window.scrollX - 260,
        });
      }
    
      try {
        await fetchDetailBarangMasuk(id_masuk);
      } catch (error) {
        console.error("Error fetching detail barang masuk:", error);
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
    
      if (!form.id_kategori || !form.nama_barang || form.jumlah_masuk === '') {
        setError('Kategori, nama barang, dan jumlah masuk harus diisi.');
        setAlert({ message: "Kategori, nama barang, dan jumlah masuk harus diisi.", type: "error", visible: true });
        return;
      }
    
      if (!filteredItems.length) {
        setError('Kategori yang dipilih tidak memiliki barang.');
        setAlert({ message: "Kategori yang dipilih tidak memiliki barang.", type: "error", visible: true });
        return;
      }
    
      const selectedCategory = categories.find(cat => cat.id_kategori === form.id_kategori);
      const jumlahMasuk = parseInt(form.jumlah_masuk, 10);
      const currentStock = itemStocks[form.nama_barang] || 0;
    
      try {
        const response = form.id_masuk
          ? await axiosInstance.put(`http://localhost:3000/api/barang-masuk/update-barang-masuk/${form.id_masuk}`, {
              nama_kategori: selectedCategory ? selectedCategory.nama_kategori : '',
              nama_barang: form.nama_barang,
              jumlah_masuk: jumlahMasuk,
              keterangan: form.keterangan || null,
            })
          : await axiosInstance.post('http://localhost:3000/api/barang-masuk/add-barang-masuk', {
              nama_kategori: selectedCategory ? selectedCategory.nama_kategori : '',
              nama_barang: form.nama_barang,
              jumlah_masuk: jumlahMasuk,
              keterangan: form.keterangan || null, 
              stok: currentStock + jumlahMasuk,
            });
    
        if (response.data.success) {
          setAlert({ message: form.id_masuk ? 'Barang masuk berhasil diubah' : 'Barang masuk berhasil ditambahkan', type: 'success', visible: true });
    
          fetchBarangMasuk();
          setIsFormOpen(false);
        } else {
          setError(response.data.message || 'Gagal menambahkan/merubah barang masuk.');
          setAlert({ message: "Gagal menambahkan/merubah barang masuk.", type: "error", visible: true });
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Gagal menambahkan/merubah barang masuk. Coba lagi.');
        setAlert({ message: "Gagal menambahkan/merubah barang masuk. Coba lagi.", type: "error", visible: true });
      }
    
      setTimeout(() => {
        setAlert({ ...alert, visible: false });
      }, 2000);
    };
    
    const deleteBarangMasuk = async (id_masuk) => {
      const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus barang ini?");
      if (!confirmDelete) return;
      
      try {
        const response = await axiosInstance.delete(`http://localhost:3000/api/barang-masuk/delete-barang-masuk/${id_masuk}`);
        
        if (response.data.success) {
          setBarangMasuk((prev) => prev.filter((item) => item.id_masuk !== id_masuk));
          setAlert({ message: "Barang masuk berhasil dihapus.", type: "success", visible: true });

        } else {
          setAlert({ message: "Gagal menghapus barang masuk. Coba lagi.", type: "error", visible: true });
        }
      } catch (error) {
        setAlert({ message: "Gagal menghapus barang masuk. Coba lagi.", type: "error", visible: true });
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
    

    const filteredData = barangMasuk.filter(item =>
      item.nama_barang.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nama_kategori.toLowerCase().includes(searchQuery.toLowerCase())
    );
    

    const handleCancel = () => {
      setIsFormOpen(false);
      setForm({
        id_masuk: '',
        id_kategori: '',
        nama_barang: '',
        jumlah_masuk: '',
        keterangan: '',
      });
    };

    const handleEdit = (barang) => {
      setForm({
        id_masuk: barang.id_masuk || '',
        id_kategori: barang.id_kategori || '',
        nama_barang: barang.nama_barang || '', 
        jumlah_masuk: barang.jumlah_masuk || '', 
        keterangan: barang.keterangan || '',
      });
      fetchItemsByCategory(barang.id_kategori);
      setIsFormOpen(true);
    };

    useEffect(() => {
      fetchBarangMasuk();
      fetchCategories();
    }, []);

    const closeAlert = () => setAlert({ ...alert, visible: false });

    if (loading) return <div className="flex justify-center items-center h-screen"></div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
      <div className="flex bg-gray-200 min-h-screen">
        <div className="flex-1 p-4 lg:p-0">
          <div className="flex justify-between items-center mt-8 relative flex-wrap sm:flex-nowrap">
            <h1 className="text-xl font-semibold text-black flex items-center ml-2">
                <FontAwesomeIcon icon={faBoxesPacking} className="mr-2" />TRANSAKSI BARANG MASUK
              </h1>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              {noItemsMessage && (
                <div className="text-red-500 text-sm">
                  {noItemsMessage}
                </div>
              )}
    
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateClick(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
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
                  {form.id_masuk ? 'Edit Barang Masuk' : 'Tambah Transaksi'}
                </button>
              </div>
            </div>
          </div>
    
          {showDetailModal && barangMasukDetail && (
            <div
              className="fixed text-xs bg-white border border-gray-300 p-4 rounded shadow-xl z-50 w-64"
              style={{
                top: modalPosition.top,
                left: modalPosition.left,
              }}
            >
              <p><strong>Waktu Input:</strong> {barangMasukDetail.created_at}</p>
              <p><strong>Oleh:</strong> {barangMasukDetail.created_by}</p>
    
              <button
                onClick={() => setShowDetailModal(false)}
                className="mt-2 text-blue-500 hover:underline"
              >
                Tutup
              </button>
            </div>
          )}
    
          <TableBarangMasuk
            data={displayData.map(item => ({
              ...item,
              created_at: item.created_at ? new Date(item.created_at).toLocaleString() : "Tanggal tidak tersedia",
            }))}
            onEdit={handleEdit}
            onDelete={deleteBarangMasuk}
            onViewDetail={(id_masuk, e) => handleDetail(id_masuk, e)} // Kirimkan event ke handler
          />
    
          {isFormOpen && (
            <FormBarangMasuk
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

  export default BarangMasukPage;
