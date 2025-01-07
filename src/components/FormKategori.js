import React from 'react';

const FormKategori = ({ namaKategori, setNamaKategori, handleSubmit, editData, setShowForm }) => {
  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Nama Kategori"
        value={namaKategori}
        onChange={(e) => setNamaKategori(e.target.value)}
        className="border px-4 py-2 rounded w-full mb-2"
      />
      <button
        onClick={handleSubmit}
        className="text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600"
      >
        {editData ? 'Update Kategori' : 'Simpan Kategori'}
      </button>
      <button
        onClick={() => setShowForm(false)}
        className="text-gray-600 bg-gray-300 px-4 py-2 rounded ml-2 hover:bg-gray-400"
      >
        Batal
      </button>
    </div>
  );
};

export default FormKategori;
