"use client";

import { useState } from "react";
import { MdOutlineOpenInNew } from "react-icons/md";

const TableInstallation = ({
  filteredInstallationData,
  installationData,
  setInstallationStartDate,
  setInstallationEndDate,
  installationStartDate,
  installationEndDate,
  handleInstallationFilter,
  installationselectedDate,
  handleInstallationDateChange,
  installationsearchQuery,
  handleInstallationSearchChange,
  handleInstallationReset,
  openInstallationModal,
}) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = installationData ? Math.ceil(installationData.length / itemsPerPage) : 0;
  const currentItems = installationData
    ? installationData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

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
      {/* Filter Tanggal dan Reset */}
      <div className="flex justify-between items-center mt-8 mb-4">
        <h1 className="text-xl font-semibold text-black -mt-2">Installation Device</h1>
        <div className="flex items-center gap-2 ml-auto">
        <div className="flex items-center gap-2">
          <input
            type="date"
            name="startDate"
            value={installationStartDate}
            onChange={(e) => setInstallationStartDate(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
          <input
            type="date"
            name="endDate"
            value={installationEndDate}
            onChange={(e) => setInstallationEndDate(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
          <button
            onClick={handleInstallationReset}
            className="bg-gray-500 text-white px-2 py-1 text-sm rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Cari Serial Number"
              value={installationsearchQuery}
              onChange={handleInstallationSearchChange}
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
          <button
            onClick={() => openInstallationModal()}
            className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600"
          >
            Tambah Installation
          </button>
        </div>
      </div>

      {/* Tabel Installation */}
      <table className="w-full border-collapse bg-white rounded-lg shadow">
  <thead>
    <tr className="bg-slate-300">
      <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-16">Serial Number</th>
      <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-14">Tanggal Installasi</th>
      <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-14">Warranty</th>
      <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-14">Lokasi</th>
      <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-14">Mode Unit</th>
      <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-14">Code Unit</th>
      <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-14">Status</th>
      <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-44">Keterangan</th>
      <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-16">Actions</th>
    </tr>
  </thead>
  <tbody>
    {currentItems.length === 0 ? (
      <tr>
        <td colSpan="9" className="text-center py-4">Tidak ada data yang ditemukan</td>
      </tr>
    ) : (
      currentItems.map((item) => (
        <tr key={item.id_installation} className="bg-slate-50 hover:bg-slate-200">
          <td className="py-2 px-4 text-center text-sm text-gray-900 border-b w-16">{item.serial_number_device}</td>
          <td className="py-2 px-4 text-center text-sm text-gray-900 border-b w-14">{item.tanggal_installasi}</td>
          <td className="py-2 px-4 text-center text-sm text-gray-900 border-b w-14">{item.warranty}</td>
          <td className="py-2 px-4 text-center text-sm text-gray-900 border-b w-14">{item.lokasi}</td>
          <td className="py-2 px-4 text-center text-sm text-gray-900 border-b w-14">{item.mode_unit}</td>
          <td className="py-2 px-4 text-center text-sm text-gray-900 border-b w-14">{item.code_unit}</td>
          <td className="py-2 px-4 text-center text-sm border-b w-14">
        <span className={`font-semibold ${item.status === 'Online' ? 'text-emerald-600' : 'text-red-600'}`}>
          {item.status}
        </span>
      </td>
          <td className="py-2 px-4 text-center text-sm text-gray-900 border-b w-44">
            {item.keterangan || '-'}
          </td>
          <td className="border-b px-4 py-2 text-center text-sm text-gray-900 w-16">
            <div className="flex justify-center items-center gap-2 ml-2">
              <button onClick={() => openInstallationModal(item.id_installation)} 
                className="text-gray-800 hover:text-blue-600">
               <MdOutlineOpenInNew size={22} />
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

export default TableInstallation;
