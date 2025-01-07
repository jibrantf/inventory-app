import React from "react";

const FormMaintenance = ({
  newMaintenanceData,
  setNewMaintenanceData,
  handleAddMaintenance,
  handleUpdateMaintenance,
  closeMaintenanceModal,
  serialNumberWithInstallation,
  isEditMode,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaintenanceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      handleUpdateMaintenance();
    } else {
      handleAddMaintenance();
    }
  };
  

  return (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl transform translate-x-0 sm:translate-x-0 lg:translate-x-20 -mt-10">
        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? "Edit Maintenance" : "Tambah Maintenance"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700  text-sm font-bold mb-2" htmlFor="id_device">
              Serial Number
            </label>
            <select
              id="id_device"
              name="id_device"
              value={newMaintenanceData.id_device}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm p-2"
            >
              <option value="">Pilih Serial Number</option>
              {serialNumberWithInstallation.map((serial) => (
                <option key={serial.id_device} value={serial.id_device}>
                  {serial.serial_number_device}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              Type
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={newMaintenanceData.type || "OFA"}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm p-2"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kategori_maintenance">
              Kategori Maintenance
            </label>
            <select
              id="kategori_maintenance"
              name="kategori_maintenance"
              value={newMaintenanceData.kategori_maintenance}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm p-2"
            >
              <option value="">Pilih Kategori Maintenance</option>
              <option value="Display">Display</option>
              <option value="Wiring">Wiring</option>
              <option value="Sensor">Sensor</option>
              <option value="Modul">Modul</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="history">
              History
            </label>
            <textarea
              id="history"
              name="history"
              value={newMaintenanceData.history}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm p-2"
              rows={4}
              placeholder="Isi catatan maintenance"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeMaintenanceModal}
              className="bg-gray-300 text-gray-800 px-3 py-1  text-sm rounded-md hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600"
            >
              {isEditMode ? "Update" : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormMaintenance;
