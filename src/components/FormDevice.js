"use client";

import { useState } from "react";

const FormDevice = ({
  newDeviceData,
  setNewDeviceData,
  handleAddDevice,
  handleUpdateDevice,
  closeDeviceModal,
}) => {
  const parseDate = (inputDate) => {
    const [day, month, year] = inputDate.split("-");
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "tanggal_produksi") {
      setNewDeviceData({ ...newDeviceData, [name]: value });
    } else {
      setNewDeviceData({ ...newDeviceData, [name]: value });
    }
  };
  

  return (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl transform translate-x-0 sm:translate-x-0 lg:translate-x-20 -mt-10">
<form autoComplete="off">
        <h2 className="text-xl font-semibold mb-4">
          {newDeviceData.id_device ? "Edit" : "Tambah"} Device
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Serial Number Device
          </label>
          <input
            type="text"
            name="serial_number_device"
            value={newDeviceData.serial_number_device}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Masukkan serial number device"
            
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Type
          </label>
          <input
            type="text"
            name="type"
            value={newDeviceData.type}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Versi Modul
          </label>
          <input
            type="text"
            name="versi_modul"
            value={newDeviceData.versi_modul}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Masukkan versi modul"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Versi Firmware
          </label>
          <input
            type="text"
            name="versi_firmware"
            value={newDeviceData.versi_firmware}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Masukkan versi firmware"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tanggal Produksi
          </label>
          <input
            type="date"
            name="tanggal_produksi"
            value={newDeviceData.tanggal_produksi}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={closeDeviceModal}
            className="bg-gray-500 text-white px-3 py-1 text-sm rounded-md hover:bg-gray-600"
          >
            Batal
          </button>
          <button
            onClick={newDeviceData.id_device ? handleUpdateDevice : handleAddDevice}
            className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600"
          >
            {newDeviceData.id_device ? "Simpan" : "Tambah"}
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default FormDevice;
