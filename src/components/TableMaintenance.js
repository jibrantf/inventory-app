import React, { useState, useMemo } from 'react'; 


const TableMaintenance = ({
  maintenanceData,
  setMaintenanceStartDate,
  setMaintenanceEndDate,
  maintenanceStartDate,
  maintenanceEndDate,
  handlemaintenanceFilter,
  maintenanceselectedDate,
  handleMaintenanceDateChange,
  maintenancesearchQuery,
  handleMaintenanceSearchChange,
  handleMaintenanceReset,
  openEditModal,
  handleDelete,
  openMaintenanceModal,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const groupedData = maintenanceData.reduce((acc, item) => {
    const formattedCreatedAt = item.created_at
      ? new Date(item.created_at).toLocaleString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })
      : "Tanggal tidak tersedia";

      const formattedHistory = `(${item.created_by?.username || "Unknown"}, ${formattedCreatedAt}) ${item.history} (${item.kategori_maintenance || "Kategori tidak tersedia"})`;

    if (acc[item.serial_number_device]) {
      acc[item.serial_number_device].history.push(formattedHistory);
    } else {
      acc[item.serial_number_device] = {
        serial_number_device: item.serial_number_device,
        type: item.type,
        history: [formattedHistory],
      };
    }

    return acc;
  }, {});

  const mergedData = Object.values(groupedData);

  const totalPages = Math.ceil(mergedData.length / itemsPerPage);

  const currentPageData = mergedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
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
        onClick={() => typeof page === "number" && handlePageChange(page)}
        className={`px-2 py-1 text-sm ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} rounded hover:bg-blue-400`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div>
      {/* Filter Tanggal dan Reset */}
      <div className="flex justify-between items-center mt-8 mb-4">
        <h1 className="text-xl font-semibold text-black -mt-2">Maintenance Device</h1>
        <div className="flex items-center gap-2 ml-auto">
        <div className="flex items-center gap-2">
          <input
              type="date"
              value={maintenanceStartDate}
              onChange={(e) => setMaintenanceStartDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <input
              type="date"
              value={maintenanceEndDate}
              onChange={(e) => setMaintenanceEndDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <button
              onClick={handleMaintenanceReset}
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
              value={maintenancesearchQuery}
              onChange={handleMaintenanceSearchChange}
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
          {/* Tombol Tambah Maintenance */}
          <button
            onClick={() => openMaintenanceModal(null, "add")}
            className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600"
          >
            Tambah Maintenance
          </button>
        </div>
      </div>

      {/* Tabel Data Maintenance */}
      <table className="w-full border-collapse bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-slate-300">
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-14">
              Serial Number
            </th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-12">
              Type
            </th>
            <th className="py-2 px-4 text-center text-sm font-medium text-gray-700 border-b w-72">
              History
            </th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                Tidak ada data yang ditemukan
              </td>
            </tr>
          ) : (
            currentPageData.map((item) => (
              <tr key={item.serial_number_device} className="bg-slate-50 hover:bg-slate-200">
                <td className="py-2 px-4 text-center text-sm text-gray-900 border-b w-14">
                  {item.serial_number_device}
                </td>
                <td className="py-2 px-4 text-center text-sm text-gray-900 border-b w-12">
                  {item.type}
                </td>
                <td className="py-2 px-4 text-left text-xs font-serif text-gray-900 border-b w-72">
                  <div className="mb-4">
                    <pre className="whitespace-pre-line">
                      {item.history.join("\n")}
                    </pre>
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
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous
        </button>
        {renderPagination()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default TableMaintenance;
