import React, { useState } from "react";
import { MdDelete, MdOutlineOpenInNew } from "react-icons/md";

const TableList = ({
  filtereddeviceData,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleFilter,
  selectedDate,
  handleDateChange,
  searchQuery,
  handleSearchChange,
  handleReset,
  openDeviceModal,
  handleDelete,
}) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((filtereddeviceData?.length || 0) / itemsPerPage);
  const currentItems = filtereddeviceData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) || [];

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
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) => (
      <button
        key={index}
        onClick={() => typeof page === "number" && goToPage(page)}
        className={`px-2 py-1 text-sm ${
          currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
        } rounded hover:bg-blue-400`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div>
      {/* Filter and Search */}
      <div className="flex justify-between items-center mt-8 mb-4">
        <h1 className="text-xl font-semibold text-black -mt-2">Device Production</h1>
        <div className="flex items-center gap-2 ml-auto">
        <div className="flex items-center gap-2">
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <button
                onClick={handleReset}
                className="bg-gray-500 text-white px-2 py-1 text-sm rounded hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          <input
            type="text"
            placeholder="Cari Serial Number"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border rounded px-2 py-1 text-sm"
          />
          <button
            onClick={() => openDeviceModal()}
            className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600"
          >
            Tambah List Device
          </button>
        </div>
      </div>

      {/* Table List */}
      <table className="w-full border-collapse bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-slate-300">
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-24">Serial Number</th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-16">Type</th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-20">Versi Modul</th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-20">Versi Firmware</th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-20">Tanggal Produksi</th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-20">Status</th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-20">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4">
                Tidak ada data yang ditemukan
              </td>
            </tr>
          ) : (
            currentItems.map((item) => (
              <tr key={item.id_device} className= "bg-slate-50 hover:bg-slate-200">
                <td className="py-2 px-4 text-center text-sm text-gray-900 border-b w-24">{item.serial_number_device}</td>
                <td className="py-2 px-4 text-center text-sm text-gray-900 border-b w-16">{item.type}</td>
                <td className="py-2 px-4 text-center text-sm text-gray-900 border-b w-20">{item.versi_modul}</td>
                <td className="py-2 px-4 text-center text-sm text-gray-900 border-b w-20">{item.versi_firmware}</td>
                <td className="py-2 px-4 text-center text-sm text-gray-900 border-b w-20">{item.tanggal_produksi}</td>
                <td className="py-2 px-4 text-center text-sm font-semibold border-b w-20">
                <span className={item.status === 'stok' ? 'text-blue-600' : item.status === 'repair' ? 'text-red-600' : item.status === 'terpasang' ? 'text-emerald-600' : 'text-emerald-600'}>
                  {item.status === 'stok' ? 'Stok' : item.status === 'repair' ? 'Repair' : item.status === 'terpasang' ? 'Terpasang' : item.status}
              </span>
              </td>
              <td className="border-b px-4 py-2 text-center text-sm text-gray-900 w-20">
                  <div className="flex justify-center items-center gap-2 ml-2">
                    <button onClick={() => openDeviceModal(item.id_device)} 
                      className="text-gray-800 hover:text-blue-600">
                      <MdOutlineOpenInNew size={22} />
                    </button>
                    <button onClick={() => handleDelete(item.id_device)} 
                      className="text-gray-800 hover:text-orange-600">
                      <MdDelete size={25} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
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
  );
};

export default TableList;
