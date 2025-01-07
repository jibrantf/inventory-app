"use client";

import { Pie, Bar } from "react-chartjs-2";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar"; 
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const DashboardSummary = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  const lowStockItems = [...data.low_stock_items];
  const lowestStockItems = lowStockItems.sort((a, b) => a.stok - b.stok).slice(0, 6);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hari = currentDate.toLocaleDateString("id-ID", { weekday: "long" });
  const tanggal = currentDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const pieChartData = {
    labels: ["Barang Masuk", "Barang Keluar", "Barang Rusak"],
    datasets: [
      {
        label: "Jumlah Transaksi",
        data: [
          data.total_transaksi_masuk,
          data.total_transaksi_keluar,
          data.total_transaksi_rusak,
        ],
        backgroundColor: ["#0B60B0", "#394867", "#7FC7D9"],
        borderColor: ["#FFFFFF"],
        borderWidth: 1,
      },
    ],
  };


  const barColors = ["#0B60B0", "#0110B3", "#014CFC", "#038CFD", "#01BDFE", "#99EFF9"];

  // Data untuk Low Stock Items (Bar Chart)
  const lowStockData = {
    labels: lowestStockItems.map((item) => item.nama_barang),
    datasets: [
      {
        label: "Stok Barang",
        data: lowestStockItems.map((item) => item.stok),
        backgroundColor: barColors.slice(0, lowestStockItems.length), // Ambil warna sebanyak item
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
  {/* Kotak Box dan Keterangan Hari Tanggal */}
  <div className="grid grid-cols-1 xl:grid-cols-[4fr_1fr] lg:grid-cols-[3fr_1fr] gap-4">
    {/* Bagian Kotak Box */}
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Total Barang */}
      <div className="relative shadow-xl rounded-md bg-white p-4 h-24 border border-gray-300 hover:bg-slate-100 hover:scale-105 w-full">
        <div className="absolute top-1 left-4 flex items-center">
          <img
            src="/assets/icon-panah.png"
            alt="Ikon Total Barang"
            className="w-8 h-8 mr-4 mt-12"
          />
          <h3 className="text-sm font-semibold text-gray-900 -mt-12 -ml-6">
            Total Jumlah Barang
          </h3>
        </div>
        <div className="flex items-center mt-2 justify-center h-full">
          <p className="text-3xl font-bold text-gray-800">{data.total_barang}</p>
        </div>
      </div>

      {/* Jumlah Transaksi Masuk */}
      <div className="relative shadow-xl rounded-md bg-white p-4 h-24 border border-gray-300 hover:bg-slate-100 hover:scale-105 w-full">
        <div className="absolute top-1 left-4 flex items-center">
          <img
            src="/assets/icon-panah.png"
            alt="Ikon Transaksi Masuk"
            className="w-8 h-8 mr-4 mt-12"
          />
          <h3 className="text-sm font-semibold text-gray-900 -mt-12 -ml-8">
            Jumlah Transaksi Masuk
          </h3>
        </div>
        <div className="flex items-center mt-2 justify-center h-full">
          <p className="text-3xl font-bold text-gray-800">{data.total_transaksi_masuk}</p>
        </div>
      </div>

      {/* Jumlah Transaksi Keluar */}
      <div className="relative shadow-xl rounded-md bg-white p-4 h-24 border border-gray-300 hover:bg-slate-100 hover:scale-105 w-full">
        <div className="absolute top-1 left-4 flex items-center">
          <img
            src="/assets/icon-panah.png"
            alt="Ikon Transaksi Keluar"
            className="w-8 h-8 mr-4 mt-12"
          />
          <h3 className="text-sm font-semibold text-gray-900 -mt-12 -ml-8">
            Jumlah Transaksi Keluar
          </h3>
        </div>
        <div className="flex items-center mt-2 justify-center h-full">
          <p className="text-3xl font-bold text-gray-800">{data.total_transaksi_keluar}</p>
        </div>
      </div>

      {/* Jumlah Transaksi Rusak */}
      <div className="relative shadow-xl rounded-md bg-white p-4 h-24 border border-gray-300 hover:bg-slate-100 hover:scale-105 w-full">
        <div className="absolute top-1 left-4 flex items-center">
          <img
            src="/assets/icon-panah.png"
            alt="Ikon Transaksi Rusak"
            className="w-8 h-8 mr-4 mt-12"
          />
          <h3 className="text-sm font-semibold text-gray-900 -mt-12 -ml-8">
            Jumlah Transaksi Rusak
          </h3>
        </div>
        <div className="flex items-center mt-2 justify-center h-full">
          <p className="text-3xl font-bold text-gray-800">{data.total_transaksi_rusak}</p>
        </div>
      </div>
    </div>

    {/* Keterangan Hari dan Tanggal */}
    <div className="flex flex-col justify-between items-center space-y-4">
      <div className="relative shadow-xl text-sm rounded-md bg-white p-4 w-full max-w-xs border border-gray-300">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">{hari}</h2>
          <p className="text-lg text-gray-600">{tanggal}</p>
        </div>
      </div>
    </div>
  </div>

 {/* Kalender, Pie Chart, dan Bar Chart */}
 <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_1fr] gap-4">
    {/* Pie Chart */}
    <div className="bg-white p-4 rounded-lg shadow-xl flex justify-center items-center border border-gray-300 h-[300px]">
      <Pie
        data={pieChartData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                },
              },
            },
            legend: {
              position: "top",
            },
          },
        }}
      />
    </div>

    {/* Bar Chart */}
    <div className="bg-white p-4 rounded-lg shadow-xl flex justify-center items-center border border-gray-300 h-[300px]">
    <h2 className="text-lg font-bold mb-2">Low Stock Items</h2>
      <Bar
        data={lowStockData}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                },
              },
            },
            legend: {
              position: "bottom",
            },
          },
          scales: {
            x: {
              title: {
                display: false,
                text: "Nama Barang",
              },
              barPercentage: 0.5,
              categoryPercentage: 0.7,
              ticks: {
                maxRotation: 0,
                minRotation: 0,
              },
            },
            y: {
              title: {
                display: true,
                text: "Jumlah Stok",
              },
            },
          },
        }}
      />
    </div>

    {/* Kalender */}
    <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-300 h-[300px] flex justify-center items-center">
      <Calendar
        className="custom-calendar"
        onChange={setSelectedDate}
        value={selectedDate}
      />
    </div>
  </div>
</div>

  );
  
};

export default DashboardSummary;
