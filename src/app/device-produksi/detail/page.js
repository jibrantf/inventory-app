"use client";

import { useEffect, useState } from "react";
import { parseISO, format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "../../../../utils/axiosInstance";
import Navbar from "../../../components/Navbar";
import TableDetailProduksi from "../../../components/TableDetailProduksi";
import FormProduksi from "../../../components/FormProduksi";

const DetailDeviceProduksi = () => {
  const [data, setData] = useState([]);  // Menyimpan data yang diambil
  const [isLoading, setIsLoading] = useState(true);  // Menyimpan status loading
  const [error, setError] = useState(null);  // Menyimpan error jika ada
  const [selectedItem, setSelectedItem] = useState(null);  // Menyimpan item yang dipilih untuk edit
  const [noItemsMessage, setNoItemsMessage] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);  // Status form edit terbuka
  const [InfoDeviceProduksi, setInfoDeviceProduksi] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredDetailDeviceProduksi, setFilteredDetailDeviceProduksi] = useState([]);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });


  const searchParams = useSearchParams();
  const id_part_box = searchParams.get("id_part_box");  // Mengambil id_part_box dari query string
  const router = useRouter();  // Inisialisasi router

  // Mengambil data dari API berdasarkan id_part_box
  const fetchData = async () => {
    if (!id_part_box) return;
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `http://localhost:3000/api/device-produksi/detail-device-produksi/${id_part_box}`
      );
      const fetchedData = response.data.data || [];
      setData(fetchedData);
      setFilteredDetailDeviceProduksi(fetchedData); // Default: tampilkan semua data
    } catch (error) {
      setError("Gagal mengambil detail device produksi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const filterData = () => {
    const filteredData = data.filter((item) => {
      const matchesSerialNumber =
        item.serial_number_device_produksi?.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery;
      const matchesDate = !selectedDate || item.created_at?.split("T")[0] === selectedDate;
      return matchesSerialNumber && matchesDate;
    });
    setFilteredDetailDeviceProduksi(filteredData);
  };

  const handleReset = () => {
    setSelectedDate('');
    setFilteredDetailDeviceProduksi(data); // Menampilkan seluruh data
    setNoItemsMessage(''); // Reset pesan
  };

  useEffect(() => {
    const id_part_box = new URLSearchParams(window.location.search).get("id_part_box");
    if (id_part_box) fetchData(id_part_box);
  }, []);

  useEffect(() => {
    filterData();
  }, [searchQuery, selectedDate]);

  // Menangani klik untuk menambah device produksi baru
  const handleAddClick = () => {
    setSelectedItem(null);  // Reset selectedItem untuk data baru
    setIsFormOpen(true);  // Menampilkan form
  };

  // Menangani klik untuk mengedit item
  const handleEditClick = (item) => {
    console.log("Item yang dipilih untuk edit:", item);  // Pastikan data sudah benar
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  // Menghapus item
  const handleDelete = async (id_device_produksi) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus item ini?")) return;
    try {
      const response = await axiosInstance.delete(`http://localhost:3000/api/device-produksi/delete-device-produksi/${id_device_produksi}`);
      if (response.data.success) {
        // Menghapus item dari state lokal
        setData((prevData) => prevData.filter((item) => item.id_device_produksi !== id_device_produksi));
      } else {
        setError("Gagal menghapus item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Gagal menghapus item.");
    }
  };

  // Menangani submit form (untuk tambah atau edit)
  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = selectedItem
        ? await axiosInstance.put(`http://localhost:3000/api/device-produksi/update-device-produksi/${selectedItem.id_device_produksi}`, formData)
        : await axiosInstance.post(`http://localhost:3000/api/device-produksi/add-device-produksi/${id_part_box}`, formData);

      if (response.data.success) {
        setIsFormOpen(false);
        fetchData(); // Update data setelah form disubmit
      } else {
        setError("Gagal menyimpan data.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Gagal menyimpan data.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInfoDeviceProduksi = async (id_device_produksi) => {
    try {
      const response = await axiosInstance.get(`http://localhost:3000/api/device-produksi/info-device-produksi/${id_device_produksi}`);
      console.log("Data device produksi info:", response.data.data);
      if (response.data.success) {
        const data = response.data.data;
    
        // Cek dan format tanggal
        const formattedDate = data.created_at
        ? format(parseISO(data.created_at), "dd MMM yyyy HH:mm:ss")  // Menggunakan format baru
        : "Tanggal tidak tersedia";

        // Menyimpan informasi created_by dengan username
        setInfoDeviceProduksi({
          id_device_produksi: data.id_device_produksi,
          serial_number_device_produksi: data.serial_number_device_produksi,
          created_at: formattedDate,
          created_by: data.created_by ? data.created_by.username : 'N/A', // Menyimpan username
        });
    
        setShowInfoModal(true); // Menampilkan modal setelah data tersedia
      } else {
        setError(response.data.message || "Gagal mengambil info device produksi.");
      }
    } catch (error) {
      setError("Gagal menghubungi server.");
    }
  };

  const handleInfo = async (id_device_produksi, e) => {
    if (e && e.target) {
      // Mendapatkan posisi tombol yang diklik
      const buttonRect = e.target.getBoundingClientRect();
      
      // Menyimpan posisi tombol dalam state
      setModalPosition({
        top: buttonRect.top + window.scrollY - 5,
        left: buttonRect.left + window.scrollX - 260,
      });
    }
  
    try {
      await fetchInfoDeviceProduksi(id_device_produksi);
    } catch (error) {
      console.error("Error fetching info device produksi:", error);
    }
  };

  // Menangani cancel form
  const handleCancel = () => {
    setIsFormOpen(false);
    setSelectedItem(null);  // Reset selectedItem jika cancel
  };

  // Kembali ke halaman sebelumnya
  const handleGoBack = () => {
    router.back();  // Mengarahkan kembali ke halaman sebelumnya
  };

  useEffect(() => {
    fetchData();
  }, [id_part_box]);

  if (isLoading) {
    return <div className="text-center mt-10">Sedang memuat...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="bg-gray-200 min-h-screen p-6">
      <Navbar />
      <div className="flex justify-between items-center -mb-2 mt-8">
        <h1 className="text-xl font-semibold text-black">Detail Device Produksi</h1>
        {noItemsMessage && (
    <div className="absolute left-0 text-red-500 text-sm mt-1 ml-[420px]">
      {noItemsMessage}
    </div>
  )}

  {/* Filter Tanggal dan Reset */}
  <div className="flex items-center gap-2 ml-[700px]">
    <div>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
      />
    </div>
    <button
      onClick={handleReset} // Fungsi untuk memuat ulang semua data
      className="bg-gray-500 text-white px-2 py-1 text-sm rounded hover:bg-gray-600"
    >
      Reset
    </button>
  </div>

            {/* Pencarian dan Tombol Tambah */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Cari Serial Number"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border rounded px-2 py-1 text-sm"
              />
              <button
                onClick={handleAddClick}
                className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600"
              >
                Tambah Device Produksi
              </button>
            </div>
          </div>

            <TableDetailProduksi
            data={filteredDetailDeviceProduksi.map(item => ({
              ...item,
              created_at: item.created_at ? new Date(item.created_at).toLocaleString() : "Tanggal tidak tersedia",
            }))}
            onEdit={handleEditClick}
            onDelete={handleDelete}
            onViewInfo={(id_device_produksi, e) => handleInfo(id_device_produksi, e)} 
            />

              {showInfoModal && InfoDeviceProduksi&& (
              <div
                className="fixed text-xs bg-white border border-gray-300 p-4 rounded  shadow-xl z-50 w-64"
                style={{
                  top: modalPosition.top, // Posisi top modal berdasarkan tombol
                  left: modalPosition.left, // Posisi left modal berdasarkan tombol
                }}
              >
                    <p> {InfoDeviceProduksi.serial_number_device_produksi}</p>
                    <p>Tanggal Input: {InfoDeviceProduksi.created_at}</p>
                    <p>Input By: {InfoDeviceProduksi.created_by}</p>

                  <button
                    onClick={() => setShowInfoModal(false)}
                    className="mt-2 text-blue-500 hover:underline"
                  >
                    Tutup
                  </button>
                  </div>
            )}

      {isFormOpen && (
        <FormProduksi
          data={selectedItem}  // Pastikan data yang diteruskan adalah selectedItem
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          isEdit={selectedItem !== null}  // Tentukan form sebagai mode edit jika selectedItem ada
        />

      )}
      <div className="mt-4">
        <button
          onClick={handleGoBack}
          className="bg-gray-500 text-white px-2 py-1 text-sm rounded hover:bg-gray-600"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default DetailDeviceProduksi;
