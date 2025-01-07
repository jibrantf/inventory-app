import React from 'react';

const FormBarangMasuk = ({
  form,
  categories,
  filteredItems,
  handleChange,
  handleSubmit,
  handleCancel,
  alert,
  error,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl transform translate-x-0 sm:translate-x-0 lg:translate-x-60 -mt-10">
        <h2 className="text-xl text-black font-semibold text-center mb-4">
          {form.id_masuk ? 'Edit Barang Masuk' : 'Tambah Barang Masuk'}
        </h2>

        {alert && (
          <div className={`mb-4 p-2 rounded ${alert.type === 'success' ? 'bg-green-200' : 'bg-red-200'}`}>
            {alert.message}
          </div>
        )}
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="id_kategori" className="block text-gray-900 text-sm font-semibold">Kategori</label>
              <select
                id="id_kategori"
                name="id_kategori"
                value={form.id_kategori}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-sm"
                disabled={form.id_masuk ? true : false}
                required
              >
                <option value="">Pilih Kategori</option>
                {categories.map((category) => (
                  <option key={category.id_kategori} value={category.id_kategori}>
                    {category.nama_kategori}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="nama_barang" className="block text-gray-900 text-sm font-semibold">Nama Barang</label>
              <select
                id="nama_barang"
                name="nama_barang"
                value={form.nama_barang}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-sm"
                disabled={form.id_masuk ? true : false} 
                required
              >
                <option value="">Pilih Barang</option>
                {filteredItems.map((item) => (
                  <option key={item.id_barang} value={item.nama_barang}>
                    {item.nama_barang}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="jumlah_masuk" className="block text-gray-900 text-sm font-semibold">Jumlah Masuk</label>
              <input
                type="number"
                id="jumlah_masuk"
                name="jumlah_masuk"
                value={form.jumlah_masuk}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-sm"
                required
                min="1"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-900 text-sm px-2 py-1 rounded-md mr-2 hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white text-sm px-2 py-1 rounded-md hover:bg-blue-600"
            >
              {form.id_masuk ? 'Simpan Perubahan' : 'Tambah Barang Masuk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormBarangMasuk;
