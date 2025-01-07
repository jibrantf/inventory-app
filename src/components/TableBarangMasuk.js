import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const TableBarangMasuk = ({ data, idField = "id_masuk", onDelete, onEdit, onViewDetail }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error("Token tidak valid:", error);
      }
    }
  }, []);

  const formattedData = data.map((item) => {
    let formattedDate = "Tanggal tidak tersedia";

    if (item.created_at && item.created_at !== "Tanggal tidak tersedia") {
      const createdDate = new Date(item.created_at);
      if (!isNaN(createdDate.getTime())) {
        formattedDate = format(createdDate, 'dd MMM yyyy HH:mm:ss');
      } else {
        formattedDate = "Tanggal tidak tersedia";
      }
    }

    return { ...item, created_at: formattedDate };
  });

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = formattedData ? Math.ceil(formattedData.length / itemsPerPage) : 0;
  const currentItems = formattedData ? formattedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDelete = (id_masuk) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus item ini?");
    if (confirmDelete) {
      onDelete(id_masuk);
    }
  };

  const handleEdit = (item) => {
    if (typeof onEdit === 'function') {
      onEdit(item);
    } else {
      console.error('onEdit is not a function');
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

  return (
    <div className="flex w-full justify-center mt-2">
      <div className="w-full bg-white rounded-2xl shadow-xl p-6 relative">
        <div className="border mt-2">
          <table className="min-w-full bg-white border border-slate-300">
            <thead className="bg-slate-600 sticky top-0">
              <tr>
                <th className="px-3 py-3 border-b text-xs font-semibold text-center text-gray-100 uppercase tracking-wider w-24">Part Number</th>
                <th className="px-3 py-3 border-b text-xs font-semibold text-center text-gray-100 uppercase tracking-wider w-32">Nama Barang</th>
                <th className="px-2 py-3 border-b text-xs font-semibold text-center text-gray-100 uppercase tracking-wider w-14">Jumlah Masuk</th>
                <th className="px-3 py-3 border-b text-xs font-semibold text-center text-gray-100 uppercase tracking-wider w-16">Kategori</th>
                <th className="px-6 py-3 border-b text-xs font-semibold text-center text-gray-100 uppercase tracking-wider w-16">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={`${item[idField]}-${index}`} className="bg-slate-200 border-b border-slate-300 hover:bg-slate-300">
                    <td className="px-3 py-2 text-center text-sm text-gray-900 w-24">{item.part_number}</td>
                    <td className="px-3 py-2 text-center text-sm text-gray-900 w-32">{item.nama_barang}</td>
                    <td className="px-2 py-2 text-center text-sm text-gray-900 w-14">{item.jumlah}</td>
                    <td className="px-3 py-2 text-center text-sm text-gray-900 w-16">{item.nama_kategori}</td>
                    <td className="px-6 py-2 text-center text-sm text-gray-900 w-16">
                      <button
                        onClick={() => handleEdit(item)} 
                        className="bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item[idField])}
                        className="bg-red-500 text-white px-2 py-1 text-xs rounded ml-2 hover:bg-red-600"
                      >
                        Hapus
                      </button>
                      {(userRole === 'superuser' || userRole === 'atasan') && (
                        <button
                          onClick={(e) => onViewDetail(item.id_masuk, e)}
                          className="bg-yellow-500 text-white px-2 py-1 text-xs rounded ml-2 hover:bg-yellow-600"
                        >
                          Info
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">Tidak ada data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
    </div>
  );
};

export default TableBarangMasuk;
