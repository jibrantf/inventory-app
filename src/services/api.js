const API_URL = process.env.NEXT_PUBLIC_API_URL; // Ambil URL dari variabel lingkungan

export const fetchDashboardData = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/dashboard/dashboard`); // Gunakan variabel untuk endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error; // Lempar error agar bisa ditangani di komponen
  }
};
