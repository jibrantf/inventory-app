import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { MdOutlineDevices } from "react-icons/md";
import { FaChartSimple } from "react-icons/fa6";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DashboardDevice = ({ deviceStatus, deviceByType, maintenanceCategories }) => {
  // Data untuk Bar Chart - Device by Type
  const barChartData = {
    labels: deviceByType.map((item) => item.type),
    datasets: [
      {
        label: "Jumlah Perangkat",
        data: deviceByType.map((item) => item.totalDevices),
        backgroundColor: ["#107838", "#1DB233", "#FFE253", "#FFD500"],
        hoverBackgroundColor: ["#107838", "#1DB233", "#FFE253", "#FFD500"],
        borderWidth: 1,
      },
    ],
  };

  // Opsi untuk Bar Chart - Device by Type
  const barChartOptionsDeviceType = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
  };


const calculateMaxYMaintenance = (maxValue) => {
  if (maxValue <= 5) return 7;
  if (maxValue <= 7) return 9;
  if (maxValue <= 10) return 12;
  if (maxValue <= 14) return 16;
  return maxValue + 2; 
};

const maxValueMaintenance = Math.max(
  ...maintenanceCategories.map((category) => category.total)
);

  // Data untuk Bar Chart - Maintenance Categories
  const maintenanceCategoriesData = {
    labels: maintenanceCategories && maintenanceCategories.length > 0 
      ? maintenanceCategories.map((category) => category.category)
      : ["No Data"],
    datasets: [
      {
        label: "Jumlah Maintenance",
        data: maintenanceCategories && maintenanceCategories.length > 0 
          ? maintenanceCategories.map((category) => category.total)
          : [0],
        backgroundColor: ["#032D4D", "#146886", "#30B2BE", "#57F6E7"], // Warna baru
        hoverBackgroundColor: ["#00184D", "#146086", "#309EBE", "#57DEE7"], // Warna hover baru
        borderWidth: 1,
      },
    ],
  };

  // Opsi untuk Bar Chart - Maintenance Categories
const barChartOptionsMaintenanceCategories = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    tooltip: {
      backgroundColor: "#546E7A",
      titleColor: "#fff",
      bodyColor: "#fff",
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 10,
        },
        autoSkip: false, 
        maxRotation: 0, 
        minRotation: 0,
      },
    },
    y: {
      beginAtZero: true,
      max: calculateMaxYMaintenance(maxValueMaintenance),
      ticks: {
        font: {
          size: 10,
        },
      },
    },
  },
};

  // Menghitung total devices
  const totalDevices = deviceStatus.reduce((total, status) => total + status.total, 0);
  const totalStok = deviceStatus.find((status) => status.status === "stok")?.total || 0;
  const totalTerpasang = deviceStatus.find((status) => status.status === "terpasang")?.total || 0;
  const totalRepair = deviceStatus.find((status) => status.status === "repair")?.total || 0;

  return (
    <div className="p-1 space-y-4 mt-4">
      <div className="grid grid-cols-2 gap-6">
        {/* KOTAK Box */}
        <div className="bg-white p-6 rounded-lg shadow h-64">
          <div className="grid grid-cols-1 gap-4 h-full">
          <div className="bg-white border border-gray-700 p-4 rounded-lg shadow flex flex-row items-center justify-between h-full overflow-hidden">
            <div className="flex items-center">
               <MdOutlineDevices className="text-blue-600 mr-2 text-2xl" />
               <p className="text-lg font-medium text-blue-600">Device Stok</p>
            </div>
              <p className="text-2xl font-bold text-blue-600">{totalStok}</p>
            </div>

          <div className="bg-white border border-gray-700 p-4 rounded-lg shadow flex flex-row items-center justify-between h-full overflow-hidden">
            <div className="flex items-center">
              <MdOutlineDevices className="text-emerald-600 mr-2 text-2xl" />
              <p className="text-lg font-medium text-emerald-600">Device Terpasang</p>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{totalTerpasang}</p>
          </div>

          <div className="bg-white border border-gray-700 p-4 rounded-lg shadow flex flex-row items-center justify-between h-full overflow-hidden">
            <div className="flex items-center">
              <MdOutlineDevices className="text-red-600 mr-2 text-2xl" />
              <p className="text-lg font-medium text-red-600">Device Repair</p>
            </div>
            <p className="text-2xl font-bold text-red-600">{totalRepair}</p>
          </div>

          <div className="bg-white border border-gray-700 p-4 rounded-lg shadow flex flex-row items-center justify-between h-full overflow-hidden">
            <div className="flex items-center">
              <MdOutlineDevices className="text-gray-700 mr-2 text-2xl" />
              <p className="text-lg font-medium text-gray-700">Total Device</p>
            </div>
            <p className="text-2xl font-bold text-gray-700">{totalDevices}</p>
          </div>
          </div>
        </div>

        {/* KOTAK Chart 2 */}
       {/* KOTAK Chart 2 */}
<div className="bg-white p-1 rounded-lg h-64">
  <div className="bg-white p-6 rounded-lg h-full flex flex-col justify-between">
    <h2 className="text-lg font-semibold mb-2 flex items-center">
      <FaChartSimple className="mr-2" /> {/* Ikon di sebelah kiri teks */}
      Maintenance Device
    </h2>
    <div className="flex-grow flex items-center justify-center">
      <Bar data={maintenanceCategoriesData} options={barChartOptionsMaintenanceCategories} />
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default DashboardDevice;
