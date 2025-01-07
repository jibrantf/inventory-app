"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useRouter } from "next/navigation";
import Alert from "../../components/Alert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock } from '@fortawesome/free-solid-svg-icons';



const ManajemenPenggunaPage = () => {
  const [allUsers, setAllUsers] = useState([]); 
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loadingAll, setLoadingAll] = useState(true); 
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });
  const [errorAll, setErrorAll] = useState(null); 
  const [filter, setFilter] = useState("all"); 
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [userData, setUserData] = useState(null);
  const [userIdToApprove, setUserIdToApprove] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const router = useRouter();

  const checkRole = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const role = decodedToken.role; 
      if (role !== "superuser") {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    checkRole();
    fetchAllUsers();
  }, []);

  // Mengambil data semua pengguna (all users)
  const fetchAllUsers = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3000/api/auth/all-users"
      );
      if (response.data.success) {
        setAllUsers(response.data.users);
        setFilteredUsers(response.data.users); 
      } else {
        setErrorAll(response.data.message);
      }
    } catch (error) {
      setErrorAll("Gagal mengambil data semua pengguna.");
      router.push('/login');
    } finally { 
      setLoadingAll(false);
    }
  };

  // Mengubah filter dan menyesuaikan tampilan data pengguna
  // Mengubah filter dan menyesuaikan tampilan data pengguna
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    if (event.target.value === "all") {
      setFilteredUsers(allUsers);
    } else {
      setFilteredUsers(allUsers.filter((user) => user.status === event.target.value));
    }
  };


  const openApproveModal = (user) => {
    console.log(user);
    setUserData(user);
    setShowModal(true);
    setUserIdToApprove(user.id);
  };

  const handleCancel = () => {
    setShowModal(false); 
    setSelectedRole("");
  };
  


  // Fungsi untuk menyetujui pengguna setelah memilih role
  const handleApprove = async () => {
    try {
      const response = await axiosInstance.put(
        `http://localhost:3000/api/auth/approve/${userIdToApprove}`,
        { role: selectedRole }
      );
      if (response.data.success) {
        setAllUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userIdToApprove ? { ...user, status: "Approved", role: selectedRole } : user
          )
        );
        setFilteredUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userIdToApprove ? { ...user, status: "Approved", role: selectedRole } : user
          )
        );
        setAlert({ message: "Pengguna berhasil disetujui.", type: "success", visible: true });
      } else {
        alert("Gagal menyetujui pengguna: " + response.data.message);
        setAlert({ message: "Gagal menyetujui pengguna.", type: "error", visible: true });
      }
    } catch (error) {
      alert("Gagal menyetujui pengguna.");
      setAlert({ message: "Gagal menyetujui pengguna.", type: "error", visible: true });
    }
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 2000);
    setShowModal(false);
  };

  // Fungsi untuk menghapus pengguna
  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      try {
        const response = await axiosInstance.delete(
          `http://localhost:3000/api/auth/deleted-users/${id}`
        );
        if (response.data.success) {
          setAllUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          setAlert({ visible: true, message: "Pengguna berhasil dihapus." });
        } else {
          alert("Gagal menghapus pengguna: " + response.data.message);
          setAlert({ visible: true, message: "Gagal menghapus pengguna.", type: "error" });
        }
      } catch (error) {
        alert("Gagal menghapus pengguna.");
        setAlert({ visible: true, message: "Gagal menghapus pengguna.", type: "error" });
      }
    }
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 2000);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentItems = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
        onClick={() => typeof page === 'number' && goToPage(page)}
        className={`px-2 py-1 text-sm ${currentPage === page ? 'bg-gray-300' : 'bg-gray-200'} text-gray-700 rounded hover:bg-gray-300`}
      >
        {page}
      </button>
    ));
  };

  const closeAlert = () => setAlert({ ...alert, visible: false }); 
  if (loadingAll) return <div className="flex justify-center items-center h-screen"></div>;

  return (
    <div className="flex bg-gray-200 min-h-screen overflow-hidden">
      <div className="flex-1 p-4 lg:p-0">
         <h1 className="text-xl font-semibold text-black flex items-center ml-2 mt-4">
                    <FontAwesomeIcon icon={faUserLock} className="mr-2" /> MANAJEMEN PENGGUNA
                  </h1>

        <div className="mb-4 mt-4 ">
          <label htmlFor="filter" className="mr-2">Filter By:</label>
          <select
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            className="px-2 py-1 text-sm border border-gray-300 rounded-md"
          >
            <option value="all">All Users</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

       {/* Tabel berdasarkan filter */}
       <div className="w-full bg-white rounded-2xl shadow-xl p-6 relative mt-3">
        <div className="border mt-2">
          <div className="overflow-x-auto">
              {loadingAll ? (
                <p>Loading...</p>
                ) : errorAll ? (
                <p className="text-red-500">{errorAll}</p>
                  ) : (
                  <table className={`min-w-full border border-slate-300 rounded-sm shadow ${filter === "Pending" ? "bg-slate-100" : filter === "Approved" ? "bg-slate-100" : "bg-slate-200"}`}>
                    <thead>
                      <tr className="bg-slate-600">
                        <th className="px-4 py-2 text-sm font-medium text-gray-100 text-center">Username</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-100 text-center">Email</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-100 text-center">Role</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-100 text-center">Status</th>
                        {(filter === "Pending" || filter === "Approved") && (
                          <th className="px-4 py-2 text-xs font-medium text-gray-100 text-center">Action</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                    {currentItems.length === 0 ? (
                      <tr>
                        <td colSpan={filter === "Pending" || filter === "Approved" ? 6 : 5} className="px-4 py-2 text-center text-gray-800">
                          Tidak terdapat data
                        </td>
                      </tr>
                    ) : (
                      currentItems.map((user, index) => (
                    <tr key={user.id} className="bg-slate-200 border-b border-slate-300 hover:bg-slate-300">
                      <td className="px-4 py-2 border-b text-gray-900 text-sm text-center">{user.username}</td>
                      <td className="px-4 py-2 border-b text-gray-900 text-sm text-center">{user.email}</td>
                      <td className="px-4 py-2 border-b text-gray-900 text-sm text-center">{user.role}</td>
                      <td
                        className={`px-4 py-2 border-b text-sm text-center ${
                          user.status === "Approved" ? "text-blue-600" : "text-red-600"
                        }`}
                      >
                      {user.status}
                    </td>
                    {filter === "Pending" && (
                      <td className="px-4 py-2 border-b text-center">
                        <button
                          onClick={() => openApproveModal(user)}
                          className="px-2 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="ml-2 px-2 py-1 text-xs bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                    {filter === "Approved" && (
                      <td className="px-4 py-2 border-b text-center">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="px-2 py-1 text-xs bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
         </table>
        )}
    </div>
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

{showModal && userData && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    onClick={() => setShowModal(false)}
  >
    <div
      className="bg-white p-8 rounded-lg w-96"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-semibold mb-4">Setujui Pengguna</h2>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium">Username:</label>
        <input
          type="text"
          id="username"
          value={userData.username}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium">Email:</label>
        <input
          type="email"
          id="email"
          value={userData.email}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-medium">Role:</label>
        <select
          id="role"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">Pilih Role</option>
          <option value="atasan">Atasan</option>
          <option value="user">User  </option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleApprove}
          className="px-2 py-1 text-sm bg-blue-500 text-white rounded-md"
        >
          Setujui
        </button>
        <button
          onClick={handleCancel}
          className="px-2 py-1 text-sm bg-gray-300 text-black rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
        {alert.visible && (
          <Alert message={alert.message} type={alert.type} closeAlert={closeAlert} />
        )}
      </div>
    </div>
    </div>
  );
};

export default ManajemenPenggunaPage;
