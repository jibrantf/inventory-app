import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MdArrowDropDown } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesPacking, faLayerGroup, faUserLock, faPaste, faHouse, faBox, faBookOpenReader, faSatelliteDish, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const pathname = usePathname();
  const [isDeviceProduksiOpen, setIsDeviceProduksiOpen] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [loading, setLoading] = useState(true);


  const handleDeviceProduksiClick = () => {
    setIsDeviceProduksiOpen((prev) => !prev);
  };

  useEffect(() => {
    if (pathname.startsWith('/device-produksi')) {
      setIsDeviceProduksiOpen(true); 
    } else {
      setIsDeviceProduksiOpen(false);
    }
  }, [pathname]);
  

  const deviceProduksiSubmenu = [
    { name: 'ofa', priority: 1 },
    { name: 'sdfms', priority: 2 },
    { name: 'mantul-grader', priority: 3 },
    { name: 'safelight', priority: 4 }
  ];

  const sortedSubmenu = deviceProduksiSubmenu.sort((a, b) => a.priority - b.priority);

  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setIsSuperuser(decodedToken.role === 'superuser');
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-64 bg-custom22 text-gray-800 font-medium h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
      <h2 className="text-lg font-semibold border-b border-gray-600 pb-2">
  <span className="text-orange-600">Menu </span>
  <span className="text-blue-600">Dashboard</span>
  </h2>

        {/* Dashboard */}
        <ul className="space-y-1 -pl-2">
        <li>
            <Link href="/dashboard" className={`flex items-center px-4 py-2 rounded ${pathname === '/dashboard' ? 'bg-customhv text-custom24' : 'hover:bg-customhv'}`}>
              <FontAwesomeIcon icon={faHouse} className="mr-2" /> {/* Ganti dengan ikon baru */}
              <span className="text-sm">Dashboard</span>
            </Link>
          </li>
        </ul>

        {/* Master */}
        <div>
          <h3 className="text-gray-400 uppercase text-xs">Master</h3>
          <ul className="space-y-1 -pl-2">
          <li>
              <Link href="/kategori" className={`flex items-center px-4 py-2 rounded ${pathname === '/kategori' ? 'bg-customhv text-custom24' : 'hover:bg-customhv'}`}>
                <FontAwesomeIcon icon={faLayerGroup} className="mr-2" /> {/* Ganti dengan ikon baru */}
                <span className="text-sm">Kategori</span>
              </Link>
            </li>
            <li>
              <Link href="/stok" className={`flex items-center px-4 py-2 rounded ${pathname === '/stok' ? 'bg-customhv text-custom24' : 'hover:bg-customhv'}`}>
                <FontAwesomeIcon icon={faBox} className="mr-2" /> {/* Ganti dengan ikon baru */}
                <span className="text-sm">Stok Barang</span>
              </Link>
            </li>
            <li>
          <button
            onClick={handleDeviceProduksiClick}
            aria-expanded={isDeviceProduksiOpen}
            aria-controls="device-produksi-submenu"
            className={`flex items-center px-4 py-2 rounded w-full ${pathname.startsWith('/device-produksi') ? 'bg-customhv text-custom24' : 'hover:bg-customhv'}`}>
            <FontAwesomeIcon icon={faSatelliteDish} className="mr-2" /> {/* Ganti dengan ikon baru */}
            <span className="text-sm">Device Produksi</span>
            <MdArrowDropDown style={{ width: '20px', height: '20px' }} className={`ml-auto transition-transform ${isDeviceProduksiOpen ? 'rotate-180' : ''}`} />
          </button>
          {isDeviceProduksiOpen && (
            <ul id="device-produksi-submenu" className="space-y-1 pl-8 mt-1 transition-all duration-300 ease-in-out ml-4">
              {sortedSubmenu.map(({ name }) => (
                <li key={name}>
                  <Link
                    href={`/device-produksi/${name}`}
                    className={`flex items-center px-4 py-2 rounded ${pathname.startsWith(`/device-produksi/${name}`) ? 'bg-customhv text-custom24' : 'hover:bg-customhv'}`}>
                    <span className="text-sm capitalize">{name.replace('-', ' ')}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>
          <Link href="/device-guide" className={`flex items-center px-4 py-2 rounded ${pathname === '/device-guide' ? 'bg-customhv text-custom24' : 'hover:bg-customhv'}`}>
            <FontAwesomeIcon icon={faFolderOpen} className="mr-1" /> {/* Ganti dengan ikon baru */}
            <span className="ml-1 text-sm">Device Guide</span>
          </Link>
        </li>
            <li>
              <Link href="/device-part-book" className={`flex items-center px-4 py-2 rounded ${pathname === '/device-part-book' ? 'bg-customhv text-custom24' : 'hover:bg-customhv'}`}>
                <FontAwesomeIcon icon={faBookOpenReader} className="mr-2" /> {/* Ganti dengan ikon baru */}
                <span className="text-sm">Device Part Book</span>
              </Link>
            </li>
          </ul>
        </div>

         {/*Transaksi */}
         <div>
          <h3 className="text-gray-400 uppercase text-xs mb-2">Transaksi</h3>
          <ul className="space-y-1 -pl-2">
            <li>
              <Link
                href="/barang-masuk"
                className={`flex items-center px-4 py-2 rounded ${pathname === '/barang-masuk' ? 'bg-customhv text-custom24' : 'hover:bg-customhv'}`}>
                <FontAwesomeIcon icon={faBoxesPacking} className="mr-2" />
                <span className="text-sm">Barang Masuk</span>
              </Link>
            </li>
            <li>
              <Link
                href="/barang-keluar"
                className={`flex items-center px-4 py-2 rounded ${pathname === '/barang-keluar' ? 'bg-customhv text-custom24' : 'hover:bg-customhv'}`}>
                <FontAwesomeIcon icon={faBoxesPacking} className="mr-2" />
                <span className="text-sm">Barang Keluar</span>
              </Link>
            </li>
            <li>
              <Link
                href="/barang-rusak"
                className={`flex items-center px-4 py-2 rounded ${pathname === '/barang-rusak' ? 'bg-customhv text-custom24' : 'hover:bg-customhv'}`}>
                <FontAwesomeIcon icon={faBoxesPacking} className="mr-2" />
                <span className="text-sm">Barang Rusak</span>
              </Link>
 </li>
          </ul>
        </div>

        {/* Lainnya */}
        <div>
          <h3 className="text-gray-400 uppercase text-xs mb-2">Lainnya</h3>
          <ul className="space-y-1 -pl-2">
          <li>
              <Link href="/laporan" className={`flex items-center px-5 py-2 rounded ${pathname === '/laporan' ? 'bg-customhv text-custom24' : 'hover:bg-customhv'}`}>
                <FontAwesomeIcon icon={faPaste} className="mr-2" /> {/* Ganti dengan ikon baru */}
                <span className="text-sm">Laporan</span>
              </Link>
            </li>
            {isSuperuser && (
            <li>
            <Link href="/manajemen-pengguna" className={`flex items-center px-4 py-2 rounded ${pathname === '/manajemen-pengguna' ? 'bg-customhv text-custom24' : 'hover:bg-customhv'}`}>
              <FontAwesomeIcon icon={faUserLock} className="mr-2" /> {/* Ganti dengan ikon baru */}
              <span className="text-sm whitespace-nowrap">Manajemen Pengguna</span>
            </Link>
          </li>
        )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
