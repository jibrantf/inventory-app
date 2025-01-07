import React, { useState, useEffect } from 'react';

const FormProduksi = ({ data, handleChange, handleSubmit, handleCancel, loading, error, isEdit = false }) => {
  const [formData, setFormData] = useState({
    Serial_Number_Device_Produksi: '',
    Type: '',
    Versi_Modul: '',
    Versi_Firmware: '',
    Tanggal_Produksi: '',
    Tanggal_Instalasi: '',
    Warranty: '',
    Lokasi: '',
    Mode_Unit: '',
    Code_Unit: '',
    Status: '',
    History: ''
  });

  const convertToDateInputFormat = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (isEdit && data) {
      console.log('Data yang diterima:', data);
      setFormData(prevFormData => ({
        ...prevFormData,
        ...data,
        Tanggal_Produksi: convertToDateInputFormat(data.Tanggal_Produksi),
        Tanggal_Instalasi: convertToDateInputFormat(data.Tanggal_Instalasi),
        Warranty: convertToDateInputFormat(data.Warranty),
      }));

    } else {
      setFormData({
        Serial_Number_Device_Produksi: '',
        Type: '',
        Versi_Modul: '',
        Versi_Firmware: '',
        Tanggal_Produksi: '',
        Tanggal_Instalasi: '',
        Warranty: '',
        Lokasi: '',
        Mode_Unit: '',
        Code_Unit: '',
        Status: '',
        History: ''
      });
    }
  }, [data, isEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mx-4 transform translate-x-40 -mt-10">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isEdit ? 'Edit Detail Device Produksi' : 'Tambah Detail Device Produksi'}
        </h2>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <form onSubmit={(e) => handleSubmit(e, formData)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kolom Kiri */}
            <div>
              <label htmlFor="Serial_Number_Device_Produksi" className="block text-gray-900 text-sm font-semibold">Serial Number</label>
              <input
                type="text"
                id="Serial_Number_Device_Produksi"
                name="Serial_Number_Device_Produksi"
                value={formData.Serial_Number_Device_Produksi}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="Type" className="block text-gray-900 text-sm font-semibold">Type</label>
              <input
                type="text"
                id="Type"
                name="Type"
                value={formData.Type}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="Versi_Modul" className="block text-gray-900 text-sm font-semibold">Versi Modul</label>
              <input
                type="text"
                id="Versi_Modul"
                name="Versi_Modul"
                value={formData.Versi_Modul}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="Versi_Firmware" className="block text-gray-900 text-sm font-semibold ">Versi Firmware</label>
              <input
                type="text"
                id="Versi_Firmware"
                name="Versi_Firmware"
                value={formData.Versi_Firmware}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="Tanggal_Produksi" className="block text-gray-900 text-sm font-semibold">Tanggal Produksi</label>
              <input
                type="date"
                id="Tanggal_Produksi"
                name="Tanggal_Produksi"
                value={formData.Tanggal_Produksi}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="Tanggal_Instalasi" className="block text-gray-900 text-sm font-semibold">Tanggal Instalasi</label>
              <input
                type="date"
                id="Tanggal_Instalasi"
                name="Tanggal_Instalasi"
                value={formData.Tanggal_Instalasi}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md text-sm"
                required
              />
            </div>

            {/* Kolom Kanan */}
            <div>
              <label htmlFor="Warranty" className="block text-gray-900 text-sm font-semibold">Warranty</label>
              <input
                type="date"
                id="Warranty"
                name="Warranty"
                value={formData.Warranty}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="Lokasi" className="block text-gray-900 text-sm font-semibold">Lokasi</label>
              <input
                type="text"
                id="Lokasi"
                name="Lokasi"
                value={formData.Lokasi}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="Mode_Unit" className="block text-gray-900 text-sm font-semibold">Mode Unit</label>
              <input
                type="text"
                id="Mode_Unit"
                name="Mode_Unit"
                value={formData.Mode_Unit}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="Code_Unit" className="block text-gray-900 text-sm font-semibold">Code Unit</label>
              <input
                type="text"
                id="Code_Unit"
                name="Code_Unit"
                value={formData.Code_Unit}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="Status" className="block text-gray-900 text-sm font-semibold">Status</label>
              <select
                id="Status"
                name="Status"
                value={formData.Status}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md text-sm"
                required
              >
                <option value="">Pilih Status</option>
                <option value="Ready">Ready</option>
                <option value="Problem">Problem</option>
              </select>
            </div>

            <div>
              <label htmlFor="History" className="block text-gray-900 text-sm font-semibold">History</label>
              <textarea
                id="History"
                name="History"
                value={formData.History}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border rounded-md text-sm"
                required
              />
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-900 px-2 py-1 text-sm rounded-sm mr-2 hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-2 py-1 text-sm rounded-sm hover:bg-blue-600"
            >
              {loading ? 'Loading...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormProduksi;
