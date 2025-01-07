import React, { useState, useEffect } from 'react';

const TableStok = ({ data, onDelete, onEdit }) => {
 
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

 
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus item ini?");
    if (confirmDelete) {
      onDelete(id);
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
    <div className="flex w-full justify-center mt-4">
      <div className="w-full bg-white rounded-2xl shadow-xl p-6 relative">
        <div className="border mt-2">
          <table className="min-w-full bg-white border border-slate-300">
            <thead className="bg-slate-600 sticky top-0">
              <tr>
                <th className="px-4 py-3 border-b text-xs font-semibold text-center text-gray-100 uppercase tracking-wider w-32">Part Number</th>
                <th className="px-4 py-3 border-b text-xs font-semibold text-center text-gray-100 uppercase tracking-wider w-40">Nama Barang</th>
                <th className="px-4 py-3 border-b text-xs font-semibold text-center text-gray-100 uppercase tracking-wider w-32">Kategori</th>
                <th className="px-4 py-3 border-b text-xs font-semibold text-center text-gray-100 uppercase tracking-wider w-32">Lokasi</th>
                <th className="px-4 py-3 border-b text-xs font-semibold text-center text-gray-100 uppercase tracking-wider w-24">Stok</th>
                <th className="px-4 py-3 border-b text-xs font-semibold text-center text-gray-100 uppercase tracking-wider w-24">Satuan</th>
                <th className="px-4 py-3 border-b text-xs font-semibold text-center text-gray-100 uppercase tracking-wider w-40">Keterangan</th>
                {(userRole === 'superuser' || userRole === 'atasan') && (
                  <th className="px-4 py-3 border-b text-xs font-semibold text-center text-gray-100 uppercase tracking-wider w-32">Aksi</th>
                )}
              </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={item.id_barang} className="bg-slate-200 border-b border-slate-300 hover:bg-slate-300">
                  <td className="px-4 py-2 text-center text-sm text-gray-900 w-32">{item.part_number}</td>
                  <td className="px-4 py-2 text-center text-sm text-gray-900 w-40">{item.nama_barang}</td>
                  <td className="px-4 py-2 text-center text-sm text-gray-900 w-32">{item.nama_kategori}</td>
                  <td className="px-4 py-2 text-center text-sm text-gray-900 w-32">{item.lokasi_barang}</td>
                  <td className="px-4 py-2 text-center text-sm text-gray-900 w-24">{item.stok}</td>
                  <td className="px-4 py-2 text-center text-sm text-gray-900 w-24">{item.satuan}</td>
                  <td className="px-4 py-2 text-center text-sm text-gray-900 w-40">{item.keterangan}</td>
                  {(userRole === 'superuser' || userRole === 'atasan') && (
                    <td className="px-4 py-2 text-center text-sm text-gray-900 w-32">
                      <button 
                        onClick={() => onEdit(item)}
                        className="bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id_barang)} 
                        className="bg-red-500 text-white px-2 py-1 text-xs rounded ml-2 hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-3 px-4 text-center">Tidak Terdapat Data</td>
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

export default TableStok;
