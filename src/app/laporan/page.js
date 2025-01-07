"use client";

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaste } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const Laporan = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tanggalMulai, setTanggalMulai] = useState('');
    const [tanggalAkhir, setTanggalAkhir] = useState('');
    const [exportFormat, setExportFormat] = useState('csv');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalType, setModalType] = useState('');
    const [showLimit, setShowLimit] = useState('all');
    

    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axiosInstance.get('http://localhost:3000/api/laporan/laporan');
          setData(response.data.data);
          console.log('Data laporan:', response.data.data);
        } catch (error) {
          setError('Gagal mengambil data laporan.');
          router.push('/login'); 
        } finally {
          setLoading(false);
        }
      };

      const fetchDataByDate = async () => {
        if (!tanggalMulai || !tanggalAkhir) {
            setError('Tanggal mulai dan akhir harus diisi.');
            return;
        }
    
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(
                `http://localhost:3000/api/laporan/laporan?tanggal_mulai=${tanggalMulai}&tanggal_akhir=${tanggalAkhir}`
            );
            setData(response.data.data || []);
            localStorage.setItem('laporanData', JSON.stringify(response.data.data)); // Simpan ke cache
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || 'Gagal mengambil data laporan berdasarkan tanggal.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
    const handleFilter = (e) => {
        e.preventDefault();
      
        // Jangan lakukan apa-apa jika tanggal mulai atau akhir tidak diisi
        if (!tanggalMulai || !tanggalAkhir) {
          return;
        }
      
        fetchDataByDate();
      };
      

    const handleReset = () => {
        setTanggalMulai('');
        setTanggalAkhir('');
        fetchData(); 
    };

    const exportData = () => {
        if (exportFormat === 'csv') {
            const csvRows = [];
            const headers = ['No', 'Part Number', 'Nama Barang', 'Kategori', 'Stok Awal', 'Jumlah Masuk', 'Jumlah Keluar', 'Jumlah Rusak', 'Stok Sekarang'];
            csvRows.push(headers.join(','));
        
            data.forEach((item, index) => {
                const row = [
                    index + 1,
                    item.part_number,
                    item.nama_barang,
                    item.nama_kategori,
                    item.stok_awal,
                    item.jumlah_masuk,
                    item.jumlah_keluar,
                    item.jumlah_rusak,
                    item.stok_sekarang
                ];
                csvRows.push(row.join(','));
            });
        
            const csvString = csvRows.join('\n');
            const blob = new Blob([csvString], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
        
            window.open(url, '_blank');
        } else if (exportFormat === 'pdf') {
            const doc = new jsPDF();
            doc.autoTable({
                head: [['No', 'Part Number', 'Nama Barang', 'Kategori', 'Stok_awal', 'Jumlah Masuk', 'Jumlah Keluar', 'Jumlah Rusak', 'Stok_sekarang']],
                body: data.map((item, index) => [
                    index + 1,
                    item.part_number,
                    item.nama_barang,
                    item.nama_kategori,
                    item.stok_awal,
                    item.jumlah_masuk, 
                    item.jumlah_keluar,
                    item.jumlah_rusak,
                    item.stok_sekarang
                ])
            });
        
            const pdfBlob = doc.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');
        }
    };

    const getDisplayedData = () => {
        if (showLimit === 'all') {
            return data;
        }
        const limit = parseInt(showLimit, 10);
        return data.slice(0, limit);
    };

    const handleShowLimitChange = (e) => {
        setShowLimit(e.target.value);
    };


    if (loading) return <div className="flex justify-center items-center h-screen"> </div>;

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex bg-gray-200 min-h-screen">
            <div className="flex-1 p-4 lg:p-0">
                {/* Kontainer untuk judul dan filter */}
                <div className="flex justify-between items-center mt-1">
                <h1 className="text-xl font-semibold text-black flex items-center ml-2">
                    <FontAwesomeIcon icon={faPaste} className="mr-2" /> LAPORAN
                </h1>
                    
                    {/* Form Filter Berdasarkan Tanggal */}
                    <form onSubmit={handleFilter} className="flex gap-2 mt-6">
                        <input
                            type="date"
                            value={tanggalMulai}
                            onChange={(e) => setTanggalMulai(e.target.value)}
                            className="border rounded p-1 py-1 px-3 text-xs"
                            placeholder="Tanggal Mulai"
                        />
                        <input
                            type="date"
                            value={tanggalAkhir}
                            onChange={(e) => setTanggalAkhir(e.target.value)}
                            className="border rounded p-1 py-1 px-3 text-xs"
                            placeholder="Tanggal Akhir"
                        />
                       <button type="submit" className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600">
                            Filter
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="bg-gray-500 text-white text-xs px-3 py-1 rounded hover:bg-gray-600"
                        >
                            Reset
                        </button>

                        {/* Dropdown Show Limit */}
                        <select
                            value={showLimit}
                            onChange={handleShowLimitChange}
                            className="border rounded p-1 py-1 px-3 text-xs"
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="100">150</option>
                            <option value="100">200</option>
                            <option value="all">Show All</option>
                        </select>

                        {/* Dropdown Export Format */}
                        <select 
                            value={exportFormat} 
                            onChange={(e) => setExportFormat(e.target.value)} 
                            className="border rounded p-1 py-1 px-3 text-xs"
                        >
                            <option value="csv">CSV</option>
                            <option value="pdf">PDF</option>
                        </select>

                        <button
                            type="button"
                            onClick={exportData}
                            className="bg-emerald-600 text-white text-xs px-3 py-1 rounded hover:bg-green-600"
                        >
                            Ekspor
                        </button>
                    </form>
                </div>

                {/* Tabel Data Laporan */}
<div className="w-full bg-white rounded-2xl shadow-xl p-6 relative mt-3">
    <div className="border mt-2">
        <table className="min-w-full bg-white border border-slate-300 rounded">
            <thead className="bg-slate-600 text-gray-100">
                <tr>
                    <th className="py-3 px-6 text-center text-xs font-semibold uppercase">Part Number</th>
                    <th className="py-3 px-6 text-center text-xs font-semibold uppercase">Nama Barang</th>
                    <th className="py-3 px-6 text-center text-xs font-semibold uppercase">Kategori</th>
                    <th className="py-3 px-6 text-center text-xs font-semibold uppercase">Stok Awal</th>
                    <th className="py-3 px-6 text-center text-xs font-semibold uppercase">Jumlah Masuk</th>
                    <th className="py-3 px-6 text-center text-xs font-semibold uppercase">Jumlah Keluar</th>
                    <th className="py-3 px-6 text-center text-xs font-semibold uppercase">Jumlah Rusak</th>
                    <th className="py-3 px-6 text-center text-xs font-semibold uppercase">Stok Saat Ini</th>
                </tr>
            </thead>
            <tbody>
                {getDisplayedData().length > 0 ? (
                    getDisplayedData().map((item, index) => (
                        <tr key={index} className="bg-slate-200 border-b border-slate-300 hover:bg-slate-300">
                            <td className="py-2 px-6 text-center text-gray-700 text-sm">{item.part_number}</td>
                            <td className="py-2 px-6 text-center text-gray-700 text-sm">{item.nama_barang}</td>
                            <td className="py-2 px-6 text-center text-gray-700 text-sm">{item.nama_kategori}</td>
                            <td className="py-2 px-6 text-center text-gray-700 text-sm">{item.stok_awal}</td>
                            <td className="py-2 px-6 text-center text-gray-700 text-sm">{item.jumlah_masuk}</td>
                            <td className="py-2 px-6 text-center text-gray-700 text-sm">{item.jumlah_keluar}</td>
                            <td className="py-2 px-6 text-center text-gray-700 text-sm">{item.jumlah_rusak}</td>
                            <td className="py-2 px-6 text-center text-gray-700 text-sm">{item.stok_sekarang}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9" className="py-4 text-center text-gray-500">Tidak ada data laporan</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
</div>
        </div>
    </div>
    );
};

export default Laporan;
