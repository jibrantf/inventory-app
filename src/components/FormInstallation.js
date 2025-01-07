"use client";

import { useState, useEffect } from "react";

const FormInstallation = ({
  newInstallationData,
  setNewInstallationData,
  handleAddInstallation,
  handleUpdateInstallation,
  closeInstallationModal,
  serialNumberOptions,
  isEditMode, 
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Changed field:", name, "New Value:", value);
    setNewInstallationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (isEditMode) {
      handleUpdateInstallation(); 
    } else {
      handleAddInstallation();
    }
  };

 useEffect(() => {
  console.log("isEditMode: ", isEditMode); 
  console.log("newInstallationData.id_device: ", newInstallationData.id_device);
  if (isEditMode && newInstallationData.id_device) {
    const selectedSerialNumber = serialNumberOptions.find(
      (option) => option.id_device === newInstallationData.id_device
    );
    if (selectedSerialNumber) {
      setNewInstallationData((prevData) => ({
        ...prevData,
        serial_number_device: selectedSerialNumber.serial_number_device,
      }));
    }
  }
}, [isEditMode, newInstallationData.id_device, serialNumberOptions]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl transform translate-x-0 sm:translate-x-0 lg:translate-x-20 -mt-10">
        <h2 className="text-xl font-semibold mb-4">
          {newInstallationData.id_installation ? "Edit Instalasi" : "Tambah Instalasi"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
           <label className="block text-gray-700 text-sm font-bold mb-2">
                Serial Number Device
              </label>
              {isEditMode ? (
                <input
                  type="text"
                  value={newInstallationData.serial_number_device || ""}
                  readOnly 
                  className="w-full px-2 py-2 border rounded-md text-sm "
                />
              ) : (
                <select
                  name="id_device"
                  value={newInstallationData.id_device || ""}
                  onChange={handleInputChange}
                  className="w-full px-2 py-2 border rounded-md text-sm"
                >
                  <option value="">Pilih Serial Number</option>
                  {serialNumberOptions.map((sn, index) => (
                    <option key={`${sn.id_device}-${index}`} value={sn.id_device}>
                      {sn.serial_number_device} 
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tanggal Instalasi
              </label>
              <input
                type="date"
                name="tanggal_installasi"
                value={newInstallationData.tanggal_installasi || ""}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border rounded-md text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Warranty
              </label>
              <input
                type="date"
                name="warranty"
                value={newInstallationData.warranty || ""}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border rounded-md text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Lokasi
              </label>
              <input
                type="text"
                name="lokasi"
                placeholder="Masukkan lokasi instalasi"
                value={newInstallationData.lokasi || ""}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border rounded-md text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mode Unit
              </label>
              <input
                type="text"
                name="mode_unit"
                placeholder="Masukkan mode unit"
                value={newInstallationData.mode_unit || ""}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border rounded-md text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Code Unit
              </label>
              <input
                type="text"
                name="code_unit"
                placeholder="Masukkan kode unit"
                value={newInstallationData.code_unit || ""}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border rounded-md text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <select
                name="status"
                value={newInstallationData.status || ""}
                onChange={handleInputChange}
                className="w-full px-2 py-2 border rounded-md text-sm"
              >
                <option value="" disabled>
                  Pilih Status
                </option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Keterangan
            </label>
            <textarea
              name="keterangan"
              value={newInstallationData.keterangan || ""}
              onChange={handleInputChange}
              placeholder="Masukkan keterangan tambahan"
              className="w-full px-2 py-2 border rounded-md text-sm"
              rows="3"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeInstallationModal}
              className="bg-gray-500 text-white px-3 py-1 text-sm rounded-md hover:bg-gray-600"
            >
              Batal
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600`}
            >
              {isEditMode ? "Simpan" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormInstallation;
