import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';  // Pastikan jwtDecode diimpor dengan benar

const useRole = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');  // Atau gunakan mekanisme lain untuk mengambil token

    if (token) {
      try {
        const decoded = jwtDecode(token); // Dekode token jika ada
        const userRole = decoded.role; // Role ada di dalam payload token
        setRole(userRole); // Set role ke state
      } catch (error) {
        console.error('Error decoding token:', error);
        setRole(null); // Jika terjadi kesalahan dalam mendekode token, set role menjadi null
      }
    }
  }, []);

  return role;
};

export default useRole;
