"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import DataTable from "../../components/DataTable";
import axiosInstance from "../../../utils/axiosInstance";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { FaChartSimple } from "react-icons/fa6";
import { useRouter } from "next/navigation";


import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();

  // Fetching data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/api/dashboard/dashboard"
        );
        setData(response.data);
        console.log("Data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Gagal mengambil data. Silakan coba lagi nanti.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);


  const handleViewDetailStok = () => {
    router.push("/stok");
  };
  
  const handleViewDetailBarangMasuk = () => {
    router.push("/barang-masuk");
  };

  const handleViewDetailBarangKeluar = () => {
    router.push("/barang-keluar");
  };

  const handleViewDetailBarangRusak = () => {
    router.push("/barang-rusak");
  };

  // Update waktu secara real-time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!data) return <div className="text-center">Data tidak tersedia.</div>; // Tambahkan penanganan jika data null

  // Format waktu dan tanggal
  const hari = currentDate.toLocaleDateString("id-ID", { weekday: "long" });
  const tanggal = currentDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Fungsi menghitung nilai maksimum sumbu Y
  const calculateMaxY = (maxValue) => {
    if (maxValue <= 7) return 9;
    if (maxValue <= 10) return 12;
    if (maxValue <= 14) return 16;
    return maxValue + 2;
  };

  // Menghitung maxValue dari data perangkat
  const maxValue = Math.max(
    ...data.data.devices_by_type.map((item) => item.total_devices)
  );

  // Data untuk Bar Chart - Devices
  const barChartDataDevices = {
    labels: data.data.devices_by_type.map((item) => item.type),
    datasets: [
      {
        label: "Jumlah Perangkat",
        data: data.data.devices_by_type.map((item) => item.total_devices),
        backgroundColor: ["#FF6801", "#FE8D00", "#FFB400", "#FFDB00"],
        borderWidth: 1,
      },
    ],
  };

 // Ambil semua low stock items untuk tabel
const lowStockItems = [...data.data.low_stock_items];

// Ambil 6 item terendah untuk bar chart
const lowestStockItemsForChart = lowStockItems
    .sort((a, b) => a.stok - b.stok)
    .slice(0,5);

  // Menghitung maxValue dari data stok barang
  const maxValueLowStock = Math.max(
    ...lowestStockItemsForChart.map((item) => item.stok)
  );

  // Data untuk Bar Chart - Stok Terendah
  const barColors = [
    "#03045E",
    "#023E8A",
    "#0077B6",
    "#00B4D8",
    "#48CAE4",
    "#01D0B3",
  ];

  const barChartDataLowStock = {
    labels: lowestStockItemsForChart.map((item) => item.nama_barang),
    datasets: [
      {
        label: "Stok Terendah",
        data: lowestStockItemsForChart.map((item) => item.stok),
        backgroundColor : barColors,
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className="flex bg-gray-200 min-h-screen overflow-hidden">
    <div className="flex-1 p-4 lg:p-0 pt-16"> 
        {/* Layout dengan dua kolom: kiri (cards dan charts) & kanan (kalender) */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Kolom Kiri: Summary Cards dan Charts */}
          <div className="flex-1">
            {/* Summary Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Total Barang Card */}
              <div className="relative flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4">
                <h3 className="text-sm -mt-2 font-semibold text-gray-900">Total Jumlah Barang</h3>
                <div className="flex items-center">
                  <p className="text-3xl font-bold text-gray-800 -mt-1 mr-2">{data.data.total_barang}</p>
                </div>
                  <hr className="w-full border-t border-gray-300"/>
                    <p 
                    className="text-xs font-semibold text-blue-600 hover:text-orange-500 mt-1 cursor-pointer" 
                    onClick={handleViewDetailStok}
                    >
                    View Details
                  </p>
              </div>
              {/* Barang Masuk Card */}
              <div className="relative flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4">
                <h3 className="text-sm -mt-2 font-semibold text-gray-900">Jumlah Transaksi Masuk</h3>
                  <div className="flex items-center">
                    <p className="text-3xl font-bold text-gray-800 -mt-1 mr-2">{data.data.total_transaksi_masuk}</p>
                  </div>
                    <hr className="w-full border-t border-gray-300"/>
                      <p 
                      className="text-xs font-semibold text-blue-600 hover:text-orange-500 mt-1 cursor-pointer" 
                      onClick={handleViewDetailBarangMasuk}
                      >
                      View Details
                </p> 
              </div>
              {/* Barang Keluar Card */}
              <div className="relative flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4">
                <h3 className="text-sm -mt-2 font-semibold text-gray-900">Jumlah Transaksi Keluar</h3>
                <div className="flex items-center">
                  <p className="text-3xl font-bold text-gray-800 -mt-1 mr-2">{data.data.total_transaksi_keluar}</p>
                </div>
                  <hr className="w-full border-t border-gray-300"/>
                      <p 
                      className="text-xs font-semibold text-blue-600 hover:text-orange-500 mt-1 cursor-pointer" 
                      onClick={handleViewDetailBarangKeluar}
                      >
                      View Details
                </p> 
              </div>
              {/* Barang Rusak Card */}
              <div className="relative flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4">
                <h3 className="text-sm -mt-2 font-semibold text-gray-900">Jumlah Transaksi Rusak</h3>
                <div className="flex items-center">
                  <p className="text-3xl font-bold text-gray-800 -mt-1 mr-2">{data.data.total_transaksi_rusak}</p>
                </div>
                <hr className="w-full border-t border-gray-300"/>
                    <p 
                      className="text-xs font-semibold text-blue-600 hover:text-orange-500 mt-1 cursor-pointer" 
                      onClick={handleViewDetailBarangRusak}
                      >
                      View Details
                </p>  
              </div>
            </div>
              
           {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2 -mt-4">
            {/* Bar Chart Devices */}
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col h-[250px] md:h-[300px]">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <FaChartSimple className="mr-2" /> {/* Ikon di sebelah kiri teks */}
              Total Jumlah Device
            </h2>
              <div className="flex-1">
                <Bar
                  data={barChartDataDevices}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                    },
                    scales: {
                      x: {
                        ticks: {
                          maxRotation: 0,
                          minRotation: 0,
                          autoSkip: false,
                        },
                      },
                      y: {
                        beginAtZero: true,
                        max: calculateMaxY(maxValue),
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Bar Chart Low Stock */}
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col h-[250px] md:h-[300px]">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <FaChartSimple className="mr-2" /> {/* Ikon di sebelah kiri teks */}
              Barang Stok Rendah
            </h2>
              <div className="rounded-lg p-0 flex-1">
                <Bar
                  data={barChartDataLowStock}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          font: {
                            size: 12,
                          },
                        },
                      },
                    },
                    scales: {
                      x: {
                        ticks: {
                          display: true,
                          font: {
                            size: 10,
                          },
                          maxRotation: 0,
                          minRotation: 0,
                          autoSkip: false,
                        },
                      },
                      y: {
                        beginAtZero: true,
                        max: calculateMaxY(maxValueLowStock),
                        ticks: {
                          font: {
                            size: 10,
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
          </div>
  
            {/* Kotak Calendar */}
              <div className="w-full lg:w-1/4 flex flex-col">
                <div className="bg-white shadow-md rounded-lg p-4 flex-1">
                    <Calendar 
                    className="custom-calendar" 
                    value={selectedDate} 
                    onChange={setSelectedDate} 
                  />
                </div>

                {/* Kotak Hari dan Tanggal */}
                <div className="relative shadow-md text-sm rounded-md bg-white p-4 w-full mt-6 border border-gray-300" style={{ top: '-8px' }}>
                <div className="text-center border border-gray-700 rounded-md p-0">
                  <h2 className="text-xl font-bold text-gray-800">{hari}</h2>
                  <p className="text-lg text-gray-600">{tanggal}</p>
                </div>
              </div>
            </div>
        </div>
        {/* Low Stock Items Table */}
        <DataTable items={lowStockItems} />
      </div>
    </div>
  );
};

export default Dashboard;