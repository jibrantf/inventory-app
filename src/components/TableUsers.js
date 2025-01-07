import React, { useState } from 'react';

const TableUsers = ({ data, onApprove, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const itemsPerPage = 10; 

  const filteredData = data.filter((user) => {
    if (filter === 'approved') return user.approved;
    if (filter === 'pending') return !user.approved;
    return true; 
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
  };

  const handleApprove = (userId) => {
    onApprove(userId);
  };

  const handleDelete = (userId) => {
    onDelete(userId);
    if (currentData.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisiblePages = 3;
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      if (startPage > 1) visiblePages.push(1);
      if (startPage > 2) visiblePages.push('...');
      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }
      if (endPage < totalPages - 1) visiblePages.push('...');
      if (endPage < totalPages) visiblePages.push(totalPages);
    }

    return visiblePages;
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-end w-full p-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white text-gray-700"
        >
          <option value="all">All Users</option>
          <option value="approved">Approved Users</option>
          <option value="pending">Pending Users</option>
        </select>
      </div>

      <div className="w-full bg-white rounded-xl p-4">
        <h2 className="text-xl text-black font-medium mb-4">
          {filter === 'approved'
            ? 'Approved Users'
            : filter === 'pending'
            ? 'Pending Users'
            : 'All Users'}
        </h2>


        <div className="w-full bg-white rounded-2xl shadow-xl p-6 relative mt-3">
        <div className="border mt-2">
        <table className="min-w-full border rounded-xl">
          <thead>
            <tr className="bg-custom2">
              <th className="border text-gray-100 font-semibold border-gray-300 px-2 py-1">No.</th>
              <th className="border text-gray-100 font-semibold border-gray-300 px-4 py-2">Nama</th>
              <th className="border text-gray-100 font-semibold border-gray-300 px-4 py-2">Email</th>
              <th className="border text-gray-100 font-semibold border-gray-300 px-4 py-2">Role</th>
              <th className="border text-gray-100 font-semibold border-gray-300 px-4 py-2">Status</th>
              {filter === 'approved' || filter === 'pending' ? (
                <th className="border text-gray-100 font-semibold border-gray-300 px-4 py-2">Aksi</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((user, index) => (
                <tr key={user.id}>
                  <td className="border text-center bg-gray-100 border-gray-300 px-2 py-1">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="border text-center bg-gray-100 border-gray-300 px-4 py-2">
                    {user.username}
                  </td>
                  <td className="border text-center bg-gray-100 border-gray-300 px-4 py-2">
                    {user.email || 'Tidak ada email'}
                  </td>
                  <td className="border text-center bg-gray-100 border-gray-300 px-4 py-2">
                    {user.role}
                  </td>
                  <td className="border text-center bg-gray-100 border-gray-300 px-4 py-2">
                    {user.status === 'approved' ? 'Approved' : 'Pending'}
                  </td>

                  {filter === 'approved' || filter === 'pending' ? (
                    <td className="border text-center bg-gray-100 border-gray-300 px-4 py-2">
                      {user.approved ? (
                        <button
                          className="bg-emerald-500 text-white px-2 py-1 text-xs rounded hover:bg-emerald-600"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      ) : (
                        <>
                          <button
                            className="bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-600"
                            onClick={() => handleApprove(user.id)}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 text-xs rounded ml-2 hover:bg-red-600"
                            onClick={() => handleDelete(user.id)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  ) : null}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">
                  Tidak ada pengguna {filter === 'approved' ? 'disetujui' : filter === 'pending' ? 'pending' : 'ditemukan'}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>

    {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm">
            Halaman {currentPage} dari {totalPages}
          </span>
          <div className="flex items-center">
            <button
              className="px-2 py-1 text-blue-500 hover:underline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {getVisiblePages().map((page, index) => (
              <button
                key={index}
                className={`px-2 py-1 ${
                  currentPage === page ? 'text-blue-700 font-bold' : 'text-blue-500 hover:underline'
                }`}
                onClick={() => page !== '...' && handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="px-2 py-1 text-blue-500 hover:underline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TableUsers;
