"use client";

import { useState, useEffect } from "react";

const TableHistory = ({
  historyData,
  historyselectedDate,
  setHistoryStartDate,
  setHistoryEndDate,
  historyStartDate,
  historyEndDate,
  handlehistoryFilter,
  handleHistoryDateChange,
  historysearchQuery,
  handleHistorySearchChange,
  handleHistoryReset,
}) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const groupedHistoryData = historyData.reduce((acc, item) => {
    if (!acc[item.id_device]) {
      acc[item.id_device] = { ...item, history: [] };
    }
  
    if (Array.isArray(item.history)) {
      item.history.forEach(hist => {
        acc[item.id_device].history.push({
          maintenance_created_at: hist.maintenance_created_at,
          maintenance_created_by: hist.maintenance_created_by,
          history: hist.history,
        });
      });
    } else {
      acc[item.id_device].history.push({
        maintenance_created_at: item.maintenance_created_at,
        maintenance_created_by: item.maintenance_created_by,
        history: item.history,
      });
    }
  
    return acc;
  }, {});
  
  const groupedDataArray = Object.values(groupedHistoryData);
  
  const totalPages = Math.ceil(groupedDataArray.length / itemsPerPage);
  const currentItems = groupedDataArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      {/* Filter Tanggal dan Reset */}
      <div className="flex justify-between items-center mt-8 mb-4">
        <h1 className="text-xl font-semibold text-black -mt-2">History Device</h1>
        <div className="flex items-center gap-2 ml-auto">
        <div className="flex items-center gap-2">
          <input
              type="date"
              value={historyStartDate}
              onChange={(e) => setHistoryStartDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          <input
              type="date"
              value={historyEndDate}
              onChange={(e) => setHistoryEndDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          <button
              onClick={handleHistoryReset}
              className="bg-gray-500 text-white px-2 py-1 text-sm rounded hover:bg-gray-600"
            >
              Reset
          </button>
          </div>
          {/* Elemen Pencarian */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Cari Serial Number"
              value={historysearchQuery}
              onChange={handleHistorySearchChange}
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Tabel History */}
      <table className="w-full border-collapse bg-slate-50 rounded-lg shadow">
        <thead>
          <tr className="bg-slate-300">
            <th className="py-2 px-4 text-center text-xs font-medium text-gray-800 border-b w-14">
              Serial Number
            </th>
            <th className="py-2 px-4 text-center text-xs font-medium text-gray-800 border-b w-12">
              Type
            </th>
            <th className="py-2 px-4 text-center text-xs font-medium text-gray-800 border-b w-14">
              Versi Modul
            </th>
            <th className="py-2 px-4 text-center text-xs font-medium text-gray-800 border-b w-14">
              Versi Firmware
            </th>
            <th className="py-2 px-4 text-center text-xs font-medium text-gray-800 border-b w-14">
              Tanggal Produksi
            </th>
            <th className="py-2 px-4 text-center text-xs font-medium text-gray-800 border-b w-14">
              Tanggal Installasi
            </th>
            <th className="py-2 px-4 text-center text-xs font-medium text-gray-800 border-b w-14">
              Warranty
            </th>
            <th className="py-2 px-4 text-center text-xs font-medium text-gray-800 border-b w-14">
              Lokasi
            </th>
            <th className="py-2 px-4 text-center text-xs font-medium text-gray-800 border-b w-14">
              Mode Unit
            </th>
            <th className="py-2 px-4 text-center text-xs font-medium text-gray-800 border-b w-14">
              Code Unit
            </th>
            <th className="py-2 px-4 text-center text-xs font-medium text-gray-800 border-b w-14">
              Status
            </th>
            <th className="py-2 px-4 text-center text-xs font-medium text-gray-800 border-b w-40">
              History
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4">
                Tidak ada data yang ditemukan
              </td>
            </tr>
          ) : (
            currentItems.map((row) => (
              <tr key={row.id_device} className="hover:bg-gray-200">
                <td className="py-2 px-4 text-center text-xs text-gray-900 border-b w-14">
                  {row.serial_number_device}
                </td>
                <td className="py-2 px-4 text-center text-xs text-gray-900 border-b w-12">
                  {row.type}
                </td>
                <td className="py-2 px-4 text-center text-xs text-gray-900 border-b w-12">
                  {row.versi_modul}
                </td>
                <td className="py-2 px-4 text-center text-xs text-gray-900 border-b w-12">
                  {row.versi_firmware}
                </td>
                <td className="py-2 px-4 text-center text-xs text-gray-900 border-b w-12">
                  {row.tanggal_produksi}
                </td>
                <td className="py-2 px-4 text-center text-xs text-gray-900 border-b w-12">
                  {row.tanggal_installasi}
                </td>
                <td className="py-2 px-4 text-center text-xs text-gray-900 border-b w-12">
                  {row.warranty}
                </td>
                <td className="py-2 px-4 text-center text-xs text-gray-900 border-b w-12">
                  {row.lokasi}
                </td>
                <td className="py-2 px-4 text-center text-xs text-gray-900 border-b w-12">
                  {row.mode_unit}
                </td>
                <td className="py-2 px-4 text-center text-xs text-gray-900 border-b w-12">
                  {row.code_unit}
                </td>
                <td className="py-2 px-4 text-center text-xs text-gray-900 border-b w-12">
                  {row.status}
                </td>
                <td className="py-2 px-4 text-left text-xs text-gray-900 border-b w-40">
                  <ul className="list-disc pl-5">
                    {row.history.map((hist, index) => (
                      <li key={index}>
                        <div>
                          <span>{hist.maintenance_created_at} </span>
                          <span>{hist.maintenance_created_by} </span>
                          <strong>History: {hist.history}</strong>
                        </div>
                      </li>
                    ))}
                  </ul>
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

export default TableHistory;
