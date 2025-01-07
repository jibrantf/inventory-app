"use client";

import TabPartBook from '../../components/TabPartBook';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const DevicePartBookPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Konten untuk setiap tab
 const tabContent = {
  ofa: {
    title: "PENJELASAN SERIAL NUMBER OFA SET",
    content: (
      <div className="relative max-w-full mx-auto space-y-6">
        {/* Kotak untuk Teks Utama */}
        <h2 className="text-2xl font-bold text-center mb-4">OFA24.01.00.00.0000</h2>

        <div className="space-y-6">
          {/* Tahun Product */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg">24</span>
            <div className="flex items-center flex-1 mx-4">
              <div className="h-px flex-1 bg-gray-400"></div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <span className="text-gray-800 italic text-sm">Tahun Product</span>
          </div>

          {/* Versi Product */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg -mt-6">01</span>
            <div className="flex items-center flex-1 mx-4 -mt-6">
              <div className="h-px flex-1 bg-gray-400"></div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <span className="text-gray-800 italic text-sm -mt-6">Versi Product</span>
          </div>

          {/* Bagian Product */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg -mt-6">00</span>
            <div className="flex items-center flex-1 mx-4 -mt-6">
              <div className="h-px flex-1 bg-gray-400"></div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <span className="text-gray-800 italic text-sm -mt-6">Bagian Product</span>
          </div>

          {/* Sub Bagian Product */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg -mt-6">00</span>
            <div className="flex items-center flex-1 mx-4 -mt-6">
              <div className="h-px flex-1 bg-gray-400"></div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <span className="text-gray-800 italic text-sm -mt-6">Sub Bagian Product</span>
          </div>

          {/* Nomor Product */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg -mt-6">0000</span>
            <div className="flex items-center flex-1 mx-4 -mt-6">
              <div className="h-px flex-1 bg-gray-400"></div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <span className="text-gray-800 italic text-sm -mt-6">Nomor Product ke-</span>
          </div>
        </div>

        {/* Kotak Utama */}
        <div className="bg-slate-300 shadow-md rounded-lg p-6 border border-gray-300">
     {/* Kotak Pertama */}  
    <div className="bg-white p-4 mb-6 rounded-lg">
  <h3 className="text-xl font-semibold mb-4">OFA SET</h3>
  {isClient && (
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <Image src="/assets/PartBook/OFA/OFASETPB.png" alt="Deskripsi Gambar" width={400} height={300} className="rounded-lg max-w-full h-auto" />
      </div>
        <div className="border p-4 rounded-lg max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ml-8 w-full">
        <p className="font-semibold text-lg mb-4">OFA SET (OFA24.01.00.00.0000)</p>

            {/* Tabel Deskripsi */}
            <table className="min-w-full table-auto">
              <thead>
                <tr className="text-left font-semibold">
                  <th className="px-6 py-1">No</th>
                  <th className="px-6 py-1">Nama Part</th>
                  <th className="px-6 py-1">Serial Number</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t font-semibold text-custom24 hover:scale-105 hover:text-gray-800">
                  <td className="px-6 py-1">1</td>
                  <td className="px-6 py-1">MODUL OFA</td>
                  <td className="px-6 py-1">OFA24.01.01.00.000</td>
                </tr>
                <tr className="border-t font-semibold text-custom24 hover:scale-105 hover:text-gray-800">
                  <td className="px-6 py-1">2</td>
                  <td className="px-6 py-1">TAB OFA</td>
                  <td className="px-6 py-1">OFA24.01.02.00.000</td>
                </tr>
                <tr className="border-t font-semibold text-custom24 hover:scale-105 hover:text-gray-800">
                  <td className="px-6 py-1">3</td>
                  <td className="px-6 py-1">ANTENA LTE</td>
                  <td className="px-6 py-1">OFA24.01.03.00.000</td>
                </tr>
                <tr className="border-t font-semibold text-custom24 hover:scale-105 hover:text-gray-800">
                  <td className="px-6 py-1">4</td>
                  <td className="px-6 py-1">ANTENA GPS</td>
                  <td className="px-6 py-1">OFA24.01.04.00.000</td>
                </tr>
                <tr className="border-t font-semibold text-custom24 hover:scale-105 hover:text-gray-800">
                  <td className="px-6 py-1">5</td>
                  <td className="px-6 py-1">BRAKET TAB OFA</td>
                  <td className="px-6 py-1">OFA24.01.05.00.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        )}
    </div>




{/* Kotak Kedua */}
<div className="bg-white p-4 mb-6 rounded-lg">
  <h3 className="text-xl font-semibold mb-4">MODUL OFA</h3>
  {isClient && (
    <div className="flex items-center">
      <div className="border border-custom24 p-4 rounded-lg flex-grow mr-4">
        <p className="text-gray-800 mb-2">
          <strong>1. Modul OFA (OFA24.01.01.00.0000)</strong>
        </p>

        <div className="description-table">
          <div className="table-row table-header">
            <div className="table-cell px-4 py-1">No</div>
            <div className="table-cell px-4 py-1">Serial Number Part</div>
            <div className="table-cell px-4 py-1">Deskripsi</div>
          </div>

          <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
            <div className="table-cell px-4 py-1">1.1</div>
            <div className="table-cell px-4 py-1">OFA24.01.01.01.000</div>
            <div className="table-cell px-4 py-1">PCB MAIN BOARD</div>
          </div>

          <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
            <div className="table-cell px-4 py-1">1.2</div>
            <div className="table-cell px-4 py-1">OFA24.01.01.02.000</div>
            <div className="table-cell px-4 py-1">MODUL GPS</div>
          </div>

          <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
            <div className="table-cell px-4 py-1">1.3</div>
            <div className="table-cell px-4 py-1">OFA24.01.01.03.000</div>
            <div className="table-cell px-4 py-1">KABEL INPUT OFA</div>
          </div>

          <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
            <div className="table-cell px-4 py-1">1.4</div>
            <div className="table-cell px-4 py-1">OFA24.01.01.04.000</div>
            <div className="table-cell px-4 py-1">BOX</div>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <Image src="/assets/PartBook/OFA/ModulOfa.png" alt="Deskripsi Gambar" width={400} height={300} className="rounded-lg max-w-full h-auto" />
      </div>
    </div>
  )}
</div>

         {/* Kolom Gambar dan Keterangan Ketiga */}
        <div className="bg-white p-4 mb-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">TAB OFA</h3>
          {isClient && (
            <div className="flex items-center">
              <div className="border border-custom24 p-4 rounded-lg flex-grow mr-4">
                <p className="text-gray-700">
                  <strong>2. TAB OFA (OFA24.01.02.00.0000)</strong>
                  <br />
                </p>
              </div>
                <div className="flex-shrink-0">
                  <Image src="/assets/PartBook/OFA/TabOFA.png" alt="Deskripsi Gambar" width={300} height={300} className="rounded-lg max-w-full h-auto" />
                </div>
              </div>
              )}
          </div>

              {/* Kolom Gambar dan Keterangan Keempat */}
          <div className="bg-white p-4 mb-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">ANTENA LTE</h3>
            {isClient && (
              <div className="flex items-center">
              <div className="border border-custom24 p-4 rounded-lg flex-grow mr-4">
                <p className="text-gray-800 mb-2">
                  <strong>3. ANTENA LTE (OFA24.01.03.00.0000)</strong>
                </p>

                  <div className="description-table">
                    <div className="table-row table-header">
                      <div className="table-cell px-4 py-1">No</div>
                      <div className="table-cell px-4 py-1">Serial Number Part</div>
                      <div className="table-cell px-4 py-1">Deskripsi</div>
                    </div>

                    <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                      <div className="table-cell px-4 py-1">3.1</div>
                      <div className="table-cell px-4 py-1">OFA24.01.03.01.000</div>
                      <div className="table-cell px-4 py-1">ANTENA</div>
                    </div>
                    
                    <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                      <div className="table-cell px-4 py-1">3.2</div>
                      <div className="table-cell px-4 py-1">OFA24.01.03.02.000</div>
                      <div className="table-cell px-4 py-1">KABEL ANTENA</div>
                    </div>
                  </div>
                </div>
                  <div className="flex-shrink-0">
                    <Image src="/assets/PartBook/OFA/AntenaLTE.png" alt="Deskripsi Gambar" width={150} height={80} className="rounded-lg max-w-full h-auto" />
                  </div>
                </div>
              )}
            </div>


         {/* Kolom Gambar dan Keterangan Kelima */}
          <div className="bg-white p-4 mb-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">ANTENA GPS</h3>
            {isClient && (
              <div className="flex items-center">
            <div className="border border-custom24 p-4 rounded-lg flex-grow mr-4">
              <p className="text-gray-800 mb-2">
                <strong>4. ANTENA GPS (OFA24.01.04.00.0000)</strong>
              </p>

                <div className="description-table">
                  <div className="table-row table-header">
                    <div className="table-cell px-4 py-1">No</div>
                    <div className="table-cell px-4 py-1">Serial Number Part</div>
                    <div className="table-cell px-4 py-1">Deskripsi</div>
                  </div>

                  <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                    <div className="table-cell px-4 py-1">4.1</div>
                    <div className="table-cell px-4 py-1">OFA24.01.04.01.000</div>
                    <div className="table-cell px-4 py-1">ANTENA</div>
                  </div>

                  <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                    <div className="table-cell px-4 py-1">4.2</div>
                    <div className="table-cell px-4 py-1">OFA24.01.04.02.000</div>
                    <div className="table-cell px-4 py-1">BRAKET ANTENA</div>
                  </div>

                  <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                    <div className="table-cell px-4 py-1">4.3</div>
                    <div className="table-cell px-4 py-1">OFA24.01.04.03.000</div>
                    <div className="table-cell px-4 py-1">CONEKTOR CONVERTER</div>
                  </div>
                </div>
              </div>
                <div className="flex-shrink-0 mr-4 hover:scale-105 hover:translate-x-4 transition">
                  <Image src="/assets/PartBook/OFA/AntenaGPS.png" alt="Deskripsi Gambar" width={180} height={100} className="rounded-lg max-w-full h-auto" />
                </div>
              </div>
            )}
          </div>

          {/* Kolom Gambar dan Keterangan Keenam */}
          <div className="bg-white p-4 mb-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">BRAKET TAB</h3>
            {isClient && (
              <div className="flex items-center">
                <div className="border border-custom24 p-4 rounded-lg flex-grow mr-4">
                  <p className="text-gray-700">
                    <strong>5. BRAKET TAB OFA (OFA24.01.05.00.0000)</strong>
                    <br />
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Image src="/assets/PartBook/OFA/BraketTabOfa.png" alt="Deskripsi Gambar" width={300} height={300} className="rounded-lg max-w-full h-auto" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    ),
  },

    sdfms: {
      title: "PENJELASAN SERIAL NUMBER SDFMS SET",
      content: (
        <div className="relative max-w-full mx-auto space-y-6">
          {/* Kotak untuk Teks Utama */}
          <h2 className="text-2xl font-bold text-center mb-4">SD24.4-2.00.00.0000</h2>
          <div className="space-y-6">
            {/* Tahun Product */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">24</span>
              <div className="flex items-center flex-1 mx-4">
                <div className="h-px flex-1 bg-gray-400"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="text-gray-800 italic text-sm">Tahun Product</span>
            </div>
  
            {/* Versi Product */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg -mt-6">4-2</span>
              <div className="flex items-center flex-1 mx-4 -mt-6">
                <div className="h-px flex-1 bg-gray-400"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="text-gray-800 italic text-sm -mt-6">Versi Product</span>
            </div>
  
            {/* Bagian Product */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg -mt-6">00</span>
              <div className="flex items-center flex-1 mx-4 -mt-6">
                <div className="h-px flex-1 bg-gray-400"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="text-gray-800 italic text-sm -mt-6">Bagian Product</span>
            </div>
  
            {/* Sub Bagian Product */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg -mt-6">00</span>
              <div className="flex items-center flex-1 mx-4 -mt-6">
                <div className="h-px flex-1 bg-gray-400"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="text-gray-800 italic text-sm -mt-6">Sub Bagian Product</span>
            </div>
  
            {/* Nomor Product */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg -mt-6">0000</span>
              <div className="flex items-center flex-1 mx-4 -mt-6">
                <div className="h-px flex-1 bg-gray-400"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="text-gray-800 italic text-sm -mt-6">Nomor Product ke-</span>
            </div>
          </div>
  
          {/* Kotak Utama */}
          <div className="bg-slate-300 shadow-md rounded-lg p-6 border border-gray-300">
       {/* Kotak Pertama */}  
      <div className="bg-white p-4 mb-6 rounded-lg">
    <h3 className="text-xl font-semibold mb-4">SDFMS SET</h3>
    {isClient && (
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Image src="/assets/PartBook/SDFMS/SDFMSSET.png" alt="Deskripsi Gambar" width={400} height={300} className="rounded-lg max-w-full h-auto" />
        </div>
        <div className="border p-4 rounded-lg max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ml-8 w-full">
          <p className="font-semibold text-lg mb-2">SDFMS SET (SD24.4-2.00.00.0000)</p>

            {/* Tabel */}
            <table className="min-w-full table-auto">
              <thead>
                <tr className="text-left font-semibold">
                  <th className="px-6 py-1">No</th>
                  <th className="px-6 py-1">Nama Part</th>
                  <th className="px-6 py-1">Serial Number</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t font-semibold text-custom24 hover:scale-105 hover:text-gray-800">
                  <td className="px-6 py-1">1</td>
                  <td className="px-6 py-1">MODUL SDFMS</td>
                  <td className="px-6 py-1">SD24.4-2.01.00.000</td>
                </tr>
                <tr className="border-t font-semibold text-custom24 hover:scale-105 hover:text-gray-800">
                  <td className="px-6 py-1">2</td>
                  <td className="px-6 py-1">HARNES SENSOR</td>
                  <td className="px-6 py-1">SD24.4-2.02.00.000</td>
                </tr>
                <tr className="border-t font-semibold text-custom24 hover:scale-105 hover:text-gray-800">
                  <td className="px-6 py-1">3</td>
                  <td className="px-6 py-1">ANTENA LTE</td>
                  <td className="px-6 py-1">SD24.4-2.03.00.000</td>
                </tr>
                <tr className="border-t font-semibold text-custom24 hover:scale-105 hover:text-gray-800">
                  <td className="px-6 py-1">4</td>
                  <td className="px-6 py-1">ANTENA GPS</td>
                  <td className="px-6 py-1">SD24.4-2.04.00.000</td>
                </tr>
                <tr className="border-t font-semibold text-custom24 hover:scale-105 hover:text-gray-800">
                  <td className="px-6 py-1">5</td>
                  <td className="px-6 py-1">BRAKET ANTENA</td>
                  <td className="px-6 py-1">SD24.4-2.05.00.000</td>
                </tr>
              </tbody>
            </table>
          </div>
         </div>
         )}
    </div>
  
  
  
  
  {/* Kotak Kedua */}
  <div className="bg-white p-4 mb-6 rounded-lg">
    <h3 className="text-xl font-semibold mb-4">MODUL SDFMS</h3>
    {isClient && (
      <div className="flex items-center">
      <div className="border border-custom24 p-4 rounded-lg flex-grow mr-4">
        <p className="text-gray-800 mb-2">
          <strong>1. MODUL SDFMS (SD24.4-2.01.00.0000)</strong>
        </p>

              {/* Tabel Deskripsi */}
              <div className="description-table">
                <div className="table-row table-header">
                  <div className="table-cell px-4 py-1">No</div>
                  <div className="table-cell px-4 py-1">Serial Number Part</div>
                  <div className="table-cell px-4 py-1">Deskripsi</div>
                </div>

                <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                  <div className="table-cell px-4 py-1">1.1</div>
                  <div className="table-cell px-4 py-1">SD24.4-2.01.01.000</div>
                  <div className="table-cell px-4 py-1">MAIN BOARD PCB</div>
                </div>

                <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                  <div className="table-cell px-4 py-1">1.2</div>
                  <div className="table-cell px-4 py-1">SD24.4-2.01.02.000</div>
                  <div className="table-cell px-4 py-1">KABEL INPUT SDCMS</div>
                </div>

                <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                  <div className="table-cell px-4 py-1">1.3</div>
                  <div className="table-cell px-4 py-1">SD24.4-2.01.03.000</div>
                  <div className="table-cell px-4 py-1">DISPLAY</div>
                </div>

                <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                  <div className="table-cell px-4 py-1">1.4</div>
                  <div className="table-cell px-4 py-1">SD24.4-2.01.04.000</div>
                  <div className="table-cell px-4 py-1">SELENOID & PNEUMATIC DRAT</div>
                </div>

                <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                  <div className="table-cell px-4 py-1">1.5</div>
                  <div className="table-cell px-4 py-1">SD24.4-2.01.05.000</div>
                  <div className="table-cell px-4 py-1">HOSE & SAMBUNGAN</div>
                </div>

                <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                  <div className="table-cell px-4 py-1">1.6</div>
                  <div className="table-cell px-4 py-1">SD24.4-2.01.06.000</div>
                  <div className="table-cell px-4 py-1">MODUL GPS</div>
                </div>

                <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                  <div className="table-cell px-4 py-1">1.7</div>
                  <div className="table-cell px-4 py-1">SD24.4-2.01.07.000</div>
                  <div className="table-cell px-4 py-1">BOX</div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src="/assets/PartBook/SDFMS/ModulSDFMS.png" alt="Deskripsi Gambar" width={400} height={300} className="rounded-lg max-w-full h-auto" />
            </div>
          </div>
        )}
      </div>
  
           {/* Kolom Gambar dan Keterangan Ketiga */}
          <div className="bg-white p-4 mb-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">HARNES SENSOR</h3>
            {isClient && (
              <div className="flex items-center">
              <div className="border border-custom24 p-4 rounded-lg flex-grow mr-4">
                <p className="font-semibold text-lg mb-2">2. HARNES SENSOR (SD24.4-2.02.00.0000)</p>

                  {/* Tabel Deskripsi */}
                  <div className="description-table">

                    <div className="table-row table-header">
                      <div className="table-cell px-4 py-1">No</div>
                      <div className="table-cell px-4 py-1">Serial Number Part</div>
                      <div className="table-cell px-4 py-1">Deskripsi</div>
                    </div>

                    <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                      <div className="table-cell px-4 py-1">2.1</div>
                      <div className="table-cell px-4 py-1">SD24.4-2.02.01.000</div>
                      <div className="table-cell px-4 py-1">KABEL 10 METER</div>
                    </div>

                    <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                      <div className="table-cell px-4 py-1">2.2</div>
                      <div className="table-cell px-4 py-1">SD24.4-2.02.02.000</div>
                      <div className="table-cell px-4 py-1">DEUTCH CONECTOR</div>
                    </div>

                    <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                      <div className="table-cell px-4 py-1">2.3</div>
                      <div className="table-cell px-4 py-1">SD24.4-2.02.03.000</div>
                      <div className="table-cell px-4 py-1">SENSOR GYRO RS485</div>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Image src="/assets/PartBook/SDFMS/HarnesSensor1.png" alt="Deskripsi Gambar" width={100} height={100} className="rounded-lg max-w-full h-auto" />
                </div>
                <div className="flex-shrink-0">
                  <Image src="/assets/PartBook/SDFMS/HarnesSensor2.png" alt="Deskripsi Gambar" width={100} height={100} className="rounded-lg max-w-full h-auto" />
                </div>
                <div className="flex-shrink-0">
                  <Image src="/assets/PartBook/SDFMS/HarnesSensor3.png" alt="Deskripsi Gambar" width={100} height={100} className="rounded-lg max-w-full h-auto" />
                </div>
              </div>
            )}
          </div>
          
  
                {/* Kolom Gambar dan Keterangan Keempat */}
            <div className="bg-white p-4 mb-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">ANTENA LTE</h3>
              {isClient && (
                <div className="flex items-center">
                <div className="border border-custom24 p-4 rounded-lg flex-grow mr-4">
                  <p className="text-gray-700">
                    <strong>3. ANTENA LTE (SD24.4-2.03.00.0000)</strong>
                    <br />
                  </p>
                </div>
                  <div className="flex-shrink-0">
                    <Image src="/assets/PartBook/OFA/AntenaLTE.png" alt="Deskripsi Gambar" width={150} height={80} className="rounded-lg max-w-full h-auto" />
                  </div>
                </div>
              )}
            </div>
  
  
            {/* Kolom Gambar dan Keterangan Keenam */}
            <div className="bg-white p-4 mb-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">ANTENA GPS</h3>
              {isClient && (
                <div className="flex items-center">
                <div className="border border-custom24 p-4 rounded-lg flex-grow mr-4">
                  <p className="text-gray-700">
                    <strong>4. ANTENA GPS (SD24.4-2.04.00.0000)</strong>
                    <br />
                  </p>
                </div>
                  <div className="flex-shrink-0">
                    <Image src="/assets/PartBook/SDFMS/AntenaGPS.png" alt="Deskripsi Gambar" width={150} height={100} className="rounded-lg max-w-full h-auto" />
                  </div>
                </div>
              )}
            </div>

              
            {/* Kolom Gambar dan Keterangan Ketujuh */}
            <div className="bg-white p-4 mb-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">BRAKET ANTENA</h3>
              {isClient && (
                <div className="flex items-center">
                <div className="border border-custom24 p-4 rounded-lg flex-grow mr-4">
                  <p className="text-gray-700">
                    <strong>5. BRAKET ANTENA (SD24.4-2.05.00.0000)</strong>
                    <br />
                  </p>
                </div>
                  <div className="flex-shrink-0">
                    <Image src="/assets/PartBook/SDFMS/BraketAntena.png" alt="Deskripsi Gambar" width={220} height={200} className="rounded-lg max-w-full h-auto" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },


    'mantul-grader': {
      title: "PENJELASAN SERIAL NUMBER MANTUL GRADER SET",
      content: (
        <div className="relative max-w-full mx-auto space-y-6">
          {/* Kotak untuk Teks Utama */}
          <h2 className="text-2xl font-bold text-center mb-4">GD24.2.00.00.0000</h2>
          <div className="space-y-6">
            {/* Tahun Product */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">24</span>
              <div className="flex items-center flex-1 mx-4">
                <div className="h-px flex-1 bg-gray-400"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="text-gray-800 italic text-sm">Tahun Product</span>
            </div>
  
            {/* Versi Product */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg -mt-6">2</span>
              <div className="flex items-center flex-1 mx-4 -mt-6">
                <div className="h-px flex-1 bg-gray-400"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="text-gray-800 italic text-sm -mt-6">Versi Product</span>
            </div>
  
            {/* Bagian Product */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg -mt-6">00</span>
              <div className="flex items-center flex-1 mx-4 -mt-6">
                <div className="h-px flex-1 bg-gray-400"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="text-gray-800 italic text-sm -mt-6">Bagian Product</span>
            </div>
  
            {/* Sub Bagian Product */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg -mt-6">00</span>
              <div className="flex items-center flex-1 mx-4 -mt-6">
                <div className="h-px flex-1 bg-gray-400"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="text-gray-800 italic text-sm -mt-6">Sub Bagian Product</span>
            </div>
  
            {/* Nomor Product */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg -mt-6">0000</span>
              <div className="flex items-center flex-1 mx-4 -mt-6">
                <div className="h-px flex-1 bg-gray-400"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="text-gray-800 italic text-sm -mt-6">Nomor Product ke-</span>
            </div>
          </div>
  
          {/* Kotak Utama */}
          <div className="bg-slate-300 shadow-md rounded-lg p-6 border border-gray-300">
       {/* Kotak Pertama */}  
          <div className="bg-white p-4 mb-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">MANTUL GRADER SET</h3>
        {isClient && (
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image src="/assets/PartBook/GRADER/MantulGraderSET.png" alt="Deskripsi Gambar" width={400} height={300} className="rounded-lg max-w-full h-auto" />
            </div>
        {/* Kotak Deskripsi */}
          <div className="border p-4 rounded-lg max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ml-8 w-full">
            <p className="font-semibold text-lg mb-2">MANTUL GRADER SET (GD24.2.00.00.0000)</p>

                  {/* Tabel */}
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="text-left font-semibold">
                        <th className="px-6 py-1">No</th>
                        <th className="px-6 py-1">Nama Part</th>
                        <th className="px-6 py-1">Serial Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t font-semibold text-custom24 hover:scale-105 hover:text-gray-800">
                        <td className="px-6 py-1">1</td>
                        <td className="px-6 py-1">MODUL GRADER</td>
                        <td className="px-6 py-1">GD24.2.01.00.000</td>
                      </tr>
                      <tr className="border-t font-semibold text-custom24 hover:scale-105 hover:text-gray-800">
                        <td className="px-6 py-1">2</td>
                        <td className="px-6 py-1">ANTENA LTE</td>
                        <td className="px-6 py-1">GD24.2.02.00.000</td>
                      </tr>
                      <tr className="border-t font-semibold text-custom24 hover:scale-105 hover:text-gray-800">
                        <td className="px-6 py-1">3</td>
                        <td className="px-6 py-1">ANTENA GPS</td>
                        <td className="px-6 py-1">GD24.2.03.00.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
               </div>
              )}
          </div>
  
  
  
  
        {/* Kotak Kedua */}
        <div className="bg-white p-4 mb-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">MODUL GRADER</h3>
          {isClient && (
            <div className="flex items-center">
      <div className="border border-custom24 p-4 rounded-lg flex-grow mr-4">
        <p className="font-semibold text-lg mb-2">1. MODUL GRADER (GD24.2.01.00.0000)</p>

            {/* Tabel Deskripsi */}
            <div className="description-table">

              <div className="table-row table-header">
                <div className="table-cell px-4 py-1">No</div>
                <div className="table-cell px-4 py-1">Serial Number Part</div>
                <div className="table-cell px-4 py-1">Deskripsi</div>
              </div>

              <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                <div className="table-cell px-4 py-1">1.1</div>
                <div className="table-cell px-4 py-1">GD24.2.01.01.0000</div>
                <div className="table-cell px-4 py-1">PCB MAIN BOARD</div>
              </div>

              <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                <div className="table-cell px-4 py-1">1.2</div>
                <div className="table-cell px-4 py-1">GD24.2.01.02.0000</div>
                <div className="table-cell px-4 py-1">KABEL INPUT</div>
              </div>

              <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                <div className="table-cell px-4 py-1">1.3</div>
                <div className="table-cell px-4 py-1">GD24.2.01.03.0000</div>
                <div className="table-cell px-4 py-1">BOX</div>
              </div>
            </div>
          </div>
            <div className="flex-shrink-0">
              <Image src="/assets/PartBook/GRADER/ModulGRADER.png" alt="Deskripsi Gambar" width={400} height={300} className="rounded-lg max-w-full h-auto" />
          </div>
        </div>
        )}
    </div>
  
  
  
  
           {/* Kolom Gambar dan Keterangan Ketiga */}
          <div className="bg-white p-4 mb-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">ANTENA LTE</h3>
            {isClient && (
              <div className="flex items-center">
                 {/* Kotak Deskripsi */}
                  <div className="border border-custom24 p-4 rounded-lg flex-grow mr-4">
                    <p className="text-gray-700">
                      <strong>2. ANTENA LTE (GD24.2.03.00.0000)</strong>
                      <br />
                    </p>
                  </div>
                    <div className="flex-shrink-0">
                     <Image src="/assets/PartBook/GRADER/AntenaLTE.png" alt="Deskripsi Gambar" width={150} height={80} className="rounded-lg max-w-full h-auto" />
                  </div>
                </div>
                )}
            </div>
  
                {/* Kolom Gambar dan Keterangan Keempat */}
            <div className="bg-white p-4 mb-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">ANTENA GPS</h3>
              {isClient && (
                <div className="flex items-center">
                  {/* Kotak Deskripsi */}
                <div className="border border-custom24 p-4 rounded-lg flex-grow mr-4">
                  <p className="text-gray-700">
                    <strong>3. ANTENA GPS (GD24.2.04.00.0000)</strong>
                    <br />
                  </p>
                </div>
                  <div className="flex-shrink-0">
                    <Image src="/assets/PartBook/GRADER/AntenaGPS.png" alt="Deskripsi Gambar" width={200} height={100} className="rounded-lg max-w-full h-auto" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },



    
    safelight: {
      title: "PENJELASAN SERIAL NUMBER SAFELIGHT SET",
      content:  (
        <div className="relative max-w-full mx-auto space-y-6">
          {/* Kotak untuk Teks Utama */}
          <h2 className="text-2xl font-bold text-center mb-4">TL24.1.00.00.0000</h2>
          <div className="space-y-6">
            {/* Tahun Product */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">24</span>
              <div className="flex items-center flex-1 mx-4">
                <div className="h-px flex-1 bg-gray-400"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="text-gray-800 italic text-sm">Tahun Product</span>
            </div>
  
            {/* Versi Product */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg -mt-6">1</span>
              <div className="flex items-center flex-1 mx-4 -mt-6">
                <div className="h-px flex-1 bg-gray-400"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="text-gray-800 italic text-sm -mt-6">Versi Product</span>
            </div>
  
            {/* Bagian Product */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg -mt-6">00</span>
              <div className="flex items-center flex-1 mx-4 -mt-6">
                <div className="h-px flex-1 bg-gray-400"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="text-gray-800 italic text-sm -mt-6">Bagian Product</span>
            </div>
  
            {/* Sub Bagian Product */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg -mt-6">00</span>
              <div className="flex items-center flex-1 mx-4 -mt-6">
                <div className="h-px flex-1 bg-gray-400"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="text-gray-800 italic text-sm -mt-6">Sub Bagian Product</span>
            </div>
  
            {/* Nomor Product */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg -mt-6">0000</span>
              <div className="flex items-center flex-1 mx-4 -mt-6">
                <div className="h-px flex-1 bg-gray-400"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="text-gray-800 italic text-sm -mt-6">Nomor Product ke-</span>
            </div>
          </div>
  
          {/* Kotak Utama */}
          <div className="bg-slate-300 shadow-md rounded-lg p-6 border border-gray-300">
           {/* Kotak Pertama */}  
            <div className="bg-white p-4 mb-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">SAFELIGHT SET</h3>
          {isClient && (
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image src="/assets/PartBook/SAFELIGHT/SafelightSET.png" alt="Deskripsi Gambar" width={400} height={300} className="rounded-lg max-w-full h-auto" />
              </div>
       {/* Kotak Deskripsi */}
        <div className="border p-4 rounded-lg max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ml-8 w-full">
          <p className="font-semibold text-lg mb-2">SAFELIGHT SET (TL24.1.00.00.0000)</p>

            <table className="min-w-full table-auto">
              <thead>
                <tr className="text-left font-semibold">
                  <th className="px-6 py-1">No</th>
                  <th className="px-6 py-1">Nama Part</th>
                  <th className="px-6 py-1">Serial Number</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t font-semibold text-custom24 hover:scale-105 hover:text-gray-800">
                  <td className="px-6 py-1">1</td>
                  <td className="px-6 py-1">MODUL SAFELIGHT</td>
                  <td className="px-6 py-1">TL24.1.01.00.0000</td>
                </tr>
                <tr className="border-t font-semibold text-custom24 hover:scale-105 hover:text-gray-800">
                  <td className="px-6 py-1">2</td>
                  <td className="px-6 py-1">ANTENA LTE</td>
                  <td className="px-6 py-1">TL24.1.02.00.0000</td>
                </tr>
                <tr className="border-t font-semibold text-custom24 hover:scale-105 hover:text-gray-800">
                  <td className="px-6 py-1">3</td>
                  <td className="px-6 py-1">ANTENA GPS</td>
                  <td className="px-6 py-1">TL24.1.03.00.0000</td>
                </tr>
              </tbody>
            </table>
          </div>
       </div>
       )}
    </div>
  
  
  
  
  {/* Kotak Kedua */}
  <div className="bg-white p-4 mb-6 rounded-lg">
    <h3 className="text-xl font-semibold mb-4">MODUL TOWERLAMP</h3>
    {isClient && (
      <div className="flex items-center">
        <div className="border border-custom24 p-4 rounded-lg flex-grow mr-4">
          <p className="text-gray-800 mb-2">
            <strong>1. MODUL TOWERLAMP (TL24.1.01.00.0000)</strong>
          </p>

              {/* Tabel Deskripsi */}
              <div className="description-table">

                <div className="table-row table-header">
                  <div className="table-cell px-4 py-1">No</div>
                  <div className="table-cell px-4 py-1">Serial Number Part</div>
                  <div className="table-cell px-4 py-1">Deskripsi</div>
                </div>

                <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                  <div className="table-cell px-4 py-1">1.1</div>
                  <div className="table-cell px-4 py-1">TL24.2.01.01.0000</div>
                  <div className="table-cell px-4 py-1">PCB MAIN BOARD</div>
                </div>

                <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                  <div className="table-cell px-4 py-1">1.2</div>
                  <div className="table-cell px-4 py-1">TL24.2.01.01.0000</div>
                  <div className="table-cell px-4 py-1">KABEL INPUT</div>
                </div>

                <div className="table-row font-semibold text-gray-800 hover:scale-105 hover:text-custom24">
                  <div className="table-cell px-4 py-1">1.3</div>
                  <div className="table-cell px-4 py-1">TL24.2.01.01.0000</div>
                  <div className="table-cell px-4 py-1">BOX</div>
                </div>
              </div>
            </div>
              <div className="flex-shrink-0">
               <Image src="/assets/PartBook/SAFELIGHT/ModulTowerLamp.png" alt="Deskripsi Gambar" width={400} height={300} className="rounded-lg max-w-full h-auto" />
            </div>
          </div>
          )}
       </div>
  
  
  
  
           {/* Kolom Gambar dan Keterangan Ketiga */}
          <div className="bg-white p-4 mb-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">ANTENA LTE</h3>
            {isClient && (
              <div className="flex items-center">
                 {/* Kotak Deskripsi */}
                  <div className="border border-custom24 p-4 rounded-lg flex-grow mr-4">
                    <p className="text-gray-800">
                      <strong>2. ANTENA LTE (TL24.2.03.00.0000)</strong>
                      <br />
                    </p>
                  </div>
                    <div className="flex-shrink-0">
                      <Image src="/assets/PartBook/SAFELIGHT/AntenaLTE.png" alt="Deskripsi Gambar" width={150} height={80} className="rounded-lg max-w-full h-auto" />
                    </div>
                  </div>
                  )}
              </div>
  
                {/* Kolom Gambar dan Keterangan Keempat */}
            <div className="bg-white p-4 mb-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">ANTENA GPS</h3>
              {isClient && (
                <div className="flex items-center">
                  {/* Kotak Deskripsi */}
                <div className="border border-custom24 p-4 rounded-lg flex-grow mr-4">
                  <p className="text-gray-700">
                    <strong>3. ANTENA GPS (TL24.2.04.00.0000)</strong>
                    <br />
                  </p>
                </div>
                  <div className="flex-shrink-0">
                    <Image src="/assets/PartBook/SAFELIGHT/AntenaGPS.png" alt="Deskripsi Gambar" width={200} height={100} className="rounded-lg max-w-full h-auto" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    }
  };

  if (loading) {
    return <div className="loader"></div>;
}

  

  return (
    <div className="flex bg-gray-200 min-h-screen overflow-hidden">
      <div className="flex-1 p-4 lg:p-0">
        <div className="p-6">
          <h1 className="text-xl font-semibold mb-4">DEVICE PART BOOK</h1>
          <TabPartBook tabContent={tabContent} />
        </div>
      </div>
    </div>
  );
};

export default DevicePartBookPage;
