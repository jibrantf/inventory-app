"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TabDevice from '../../../components/TabDevice';
import TableList from '../../../components/TableList';
import FormDevice from '../../../components/FormDevice';
import FormInstallation from '../../../components/FormInstallation';
import TableInstallation from '../../../components/TableInstallation';
import TableMaintenance from '../../../components/TableMaintenance';
import TableHistory from '../../../components/TableHistory';
import FormMaintenance from '../../../components/FormMaintenance';
import axiosInstance from '../../../../utils/axiosInstance'; // Mengimpor axiosInstance
import Alert from '../../../components/Alert';
import DashboardDevice from '../../../components/DashboardDevice';
import { format, set } from 'date-fns';

const MantulGraderPage = () => {
  const [deviceData, setdeviceData] = useState([]); // Menyimpan data
  const [installationData, setInstallationData] = useState([]); // Menyimpan data Installation
  const [maintenanceData, setMaintenanceData] = useState([]); // Menyimpan data Maintenane
  const [historyData, setHistoryData] = useState([]); // Menyimpan data History
  const [statusCount, setStatusCount] = useState({}); // Menyimpan count berdasarkan status
  const [loading, setLoading] = useState(true); // Status loading
  const [searchQuery, setSearchQuery] = useState(''); // Untuk pencarian
  const [selectedDate, setSelectedDate] = useState(''); // Filter berdasarkan tanggal
  const [filtereddeviceData, setFiltereddeviceData] = useState([]); // Data yang sudah difilter
  const [activeTab, setActiveTab] = useState('production'); // Tab aktif
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
  const [isInstallationModalOpen, setIsInstallationModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Menambahkan state untuk mode edit/tambah
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const router = useRouter(); // Gunakan hook useRouter untuk mendapatkan objek router
  const [serialNumberWithInstallation, setSerialNumberWithInstallation] = useState([]);
  const [serialNumberOptions, setSerialNumberOptions] = useState([]);
  const [serial_number_device, setserial_number_device] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  const [deviceStatus, setDeviceStatus] = useState([]);
  const [recentInstallations, setRecentInstallations] = useState([]);
  const [recentMaintenance, setRecentMaintenance] = useState([]);
  const [deviceByType, setDeviceByType] = useState([]);
  const [monthlyDeviceStats, setMonthlyDeviceStats] = useState([]);
  const [maintenanceCategories, setMaintenanceCategories] = useState([]);



  const [installationSearchQuery, setInstallationSearchQuery] = useState('');
  const [installationSelectedDate, setInstallationSelectedDate] = useState('');
  const [filteredInstallationData, setFilteredInstallationData] = useState([]);
  const [installationStartDate, setInstallationStartDate] = useState('');
  const [installationEndDate, setInstallationEndDate] = useState('');
  
  const [maintenanceSearchQuery, setMaintenanceSearchQuery] = useState('');
  const [maintenanceSelectedDate, setMaintenanceSelectedDate] = useState('');
  const [filteredmaintenanceData, setFilteredMaintenanceData] = useState([]);
  const [maintenanceStartDate, setMaintenanceStartDate] = useState('');
  const [maintenanceEndDate, setMaintenanceEndDate] = useState('');


  const [filteredHistoryData, setFilteredHistoryData] = useState([]);
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [historySelectedDate, setHistorySelectedDate] = useState('');
  const [historyStartDate, setHistoryStartDate] = useState('');
  const [historyEndDate, setHistoryEndDate] = useState('');

  const [newdeviceData, setNewdeviceData] = useState({
    id_device: null, // ID data, null berarti form tambah
    serial_number_device: '',
    type: 'MANTULGRADER',
    versi_modul: '',
    versi_firmware: '',
    tanggal_produksi: new Date().toISOString().split('T')[0],
  });


  const [newInstallationData, setNewInstallationData] = useState({
    id_device: "",
    tanggal_installasi: "",
    warranty: "",
    lokasi: "",
    mode_unit: "",
    code_unit: "",
    status: "",
  });


  const [newMaintenanceData, setNewMaintenanceData] = useState({
    id_device: "",
    type: "MANTULGRADER",
    kategori_maintenance: "",
    history: "",
  });

  

  const fetchDevicesStatusCount = async () => {
    setLoading(true);
    try {
        const response = await axiosInstance.get('http://localhost:3000/api/device/dashboard-device/MANTULGRADER');
        console.log("Data Device Status:", response.data.data);
        if (response.data.success) {
            const deviceStatus = response.data.data.deviceStatus.map((item) => ({
                status: item.status,
                total: item.total
            }));

            setDeviceStatus(deviceStatus);

            setRecentInstallations(
                response.data.data.recentInstallations.map((item) => ({
                    type: "Installation",
                    date: format(new Date(item.created_at), 'dd MMM yyyy HH:mm:ss'),
                    location: item.lokasi,
                    serialNumber: item.serial_number_device,
                }))
            );

            setRecentMaintenance(
                response.data.data.recentMaintenance.map((item) => ({
                    type: "Maintenance",
                    date: format(new Date(item.created_at), 'dd MMM yyyy HH:mm:ss'),
                    history: item.history,
                    serialNumber: item.serial_number_device,
                }))
            );

            setMaintenanceCategories(
                response.data.data.maintenanceCategories.map((item) => ({
                    category: item.kategori,
                    total: item.total,
                }))
            );

            setDeviceByType(
                response.data.data.devicesByType.map((item) => ({
                    type: item.type,
                    totalDevices: item.total_devices,
                }))
            );

            setMonthlyDeviceStats(
                response.data.data.monthlyDeviceStats?.map((item) => ({
                    month: item.bulan,
                    installed: item.terpasang,
                    stock: item.stok,
                    repair: item.repair || 0, 
                })) || []
            );

        } else {
            console.error("Gagal mengambil data dari API.");
        }
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data:", error);
    } finally {
        setLoading(false);
    }
};


  // Mengambil data produksi MANTULGRADER 
  const fetchdeviceData = async () => {
    setLoading(true);
    try {
        const response = await axiosInstance.get('http://localhost:3000/api/device/device/type/MANTULGRADER');
        console.log("Data MANTULGRADER:", response.data.data);
        if (response.data.success) {

            const devicesWithStatus = response.data.data.map(device => ({
                ...device,
                status: device.status || 'stok', 
            }));


            setdeviceData(devicesWithStatus);
            setFiltereddeviceData(devicesWithStatus);
        }
    } catch (error) {
        console.error("Gagal mengambil data MANTULGRADER:", error);
        alert("Terjadi kesalahan saat mengambil data MANTULGRADER.");
        router.push('/login');
    } finally {
        setLoading(false);
    }
};

// Menambahkan Data Produksi MANTULGRADER
  const handleAddDevice = async (event) => {
    event.preventDefault();
    if (!newdeviceData.serial_number_device ||
        !newdeviceData.type ||
        !newdeviceData.versi_modul ||
        !newdeviceData.versi_firmware ||
        !newdeviceData.tanggal_produksi) {
          setAlert({ message: "Harap lengkapi semua kolom data.", type: "error", visible: true });
          setTimeout(() => {
            setAlert({ ...alert, visible: false });
          }, 2000);
      return;
    }

    const formattedDate = new Date(newdeviceData.tanggal_produksi).toISOString().split("T")[0];
  
    const updatedDeviceData = {
      ...newdeviceData,
      tanggal_produksi: formattedDate,
    };

    const isDuplicate = serial_number_device.some(
      (device) => device.serial_number_device === updatedDeviceData.serial_number_device
    );
  
    if (isDuplicate) {
      window.alert("Serial number sudah terdapat data. Silakan gunakan serial number lain.");
      return;
    }
  
    try {
      const response = await axiosInstance.post("http://localhost:3000/api/device/add-device", updatedDeviceData);
  
      if (response.data.success) {
        const newDevice = response.data.data;
        setdeviceData((prevData) => [...prevData, newDevice]);
        setFiltereddeviceData((prevData) => [...prevData, newDevice]);
        await fetchInstallationData();
        await fetchHistoryData();
  
    setserial_number_device((prevSerials) => [
      ...prevSerials,
      { serial_number_device: newDevice.serial_number_device, id_device: newDevice.id_device }, // Pastikan id_device juga disimpan
  ]);

  setNewInstallationData((prevData) => ({
      ...prevData,
      id_device: newDevice.id_device, 
  }));
  
        setNewdeviceData({
          serial_number_device: "",
          type: "MANTULGRADER",
          versi_modul: "",
          versi_firmware: "",
          tanggal_produksi: "",
          status: "",
        });
  
        setAlert({ message: "Data berhasil ditambahkan.", type: "success", visible: true });
        closeDeviceModal();
        await fetchDevicesStatusCount();

      } else {
        alert("Gagal menambahkan data.");
        setAlert({ message: "Gagal menambahkan data.", type: "error", visible: true });
      }
    } catch (error) {
      console.error("Error menambahkan data:", error);
      setAlert({ message: response.data.message || "Gagal menambahkan data.", type: "error", visible: true });
    }
  
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 2000);
  };


useEffect(() => {
  if (deviceData.length > 0) {
    fetchInstallationData(); 
  }
}, []);
  
// Update Data Produksi MANTULGRADER
const handleUpdateDevice = async (e) => {
  e.preventDefault();
    const parsedDate = new Date(newdeviceData.tanggal_produksi);
    if (isNaN(parsedDate.getTime())) {
        alert("Tanggal produksi tidak valid!");
        return;
    }

    const formattedDate = parsedDate.toISOString().split("T")[0];

    const updatedDeviceData = {
        ...newdeviceData,
        tanggal_produksi: formattedDate,
    };

    if (
        !updatedDeviceData.serial_number_device ||
        !updatedDeviceData.type ||
        !updatedDeviceData.versi_modul ||
        !updatedDeviceData.versi_firmware ||
        !updatedDeviceData.tanggal_produksi
    ) {
        alert("Harap lengkapi semua kolom data!");
        return;
    }

    try {
        const response = await axiosInstance.put(
            `http://localhost:3000/api/device/update-device/${newdeviceData.id_device}`,
            updatedDeviceData
        );

        if (response.data.success) {
            console.log("Respons API Update Device:", response.data.data);

            const updatedDeviceDataList = deviceData.map((item) =>
                item.id_device === newdeviceData.id_device
                    ? { ...item, ...response.data.data }
                    : item
            );

            setdeviceData(updatedDeviceDataList);
            setFiltereddeviceData(updatedDeviceDataList);

            setNewdeviceData({
                serial_number_device: response.data.data.serial_number_device || "",
                type: response.data.data.type || "MANTULGRADER",
                versi_modul: response.data.data.versi_modul || "",
                versi_firmware: response.data.data.versi_firmware || "",
                tanggal_produksi: response.data.data.tanggal_produksi || "",
                status: response.data.data.status || "",
            });

           setAlert({ message: "Data berhasil diperbarui.", type: "success", visible: true });
            closeDeviceModal();
            await fetchHistoryData();
            await fetchInstallationData();
            await fetchMaintenanceData();

        } else {
            alert(response.data.message || "Gagal memperbarui data.");
            setAlert({ message: response.data.message || "Gagal memperbarui data.", type: "error", visible: true });
        }
    } catch (error) {
        console.error("Error memperbarui data:", error);

        if (error.response?.data?.message) {
            alert(`Error: ${error.response.data.message}`);
        } else {
            alert("Terjadi kesalahan saat memperbarui data.");
        }
    }
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 2000);
};

// Delete Produksi MANTULGRADER
  const handleDeleteDevice = async (id_device) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus?`)) {
      return;
    }
  
    try {
      const response = await axiosInstance.delete(`http://localhost:3000/api/device/delete-device/${id_device}`);
      if (response.data.success) {
  
        const updatedDeviceData = deviceData.filter((device) => device.id_device !== id_device);
        setdeviceData(updatedDeviceData);
        setFiltereddeviceData(updatedDeviceData);
        setAlert({ message: "Device berhasil dihapus.", type: "success", visible: true });
        await fetchHistoryData();
        await fetchInstallationData();
        await fetchMaintenanceData();
        await fetchDevicesStatusCount();
        
      } else {
        alert(`Gagal menghapus device: ${response.data.message}`);
        setAlert({ message: `Gagal menghapus device: ${response.data.message}`, type: "error", visible: true });
      }
    } catch (error) {
      console.error("Gagal menghapus device:", error);
      alert("Terjadi kesalahan saat menghapus device.");
    }
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 2000);
  };
  
  const openDeviceModal = (id_device = null) => {
    if (id_device) {
      const selectedItem = deviceData.find((item) => item.id_device === id_device);
      if (selectedItem) {
        setNewdeviceData({
          id_device: selectedItem.id_device,
          serial_number_device: selectedItem.serial_number_device,
          type: selectedItem.type,
          versi_modul: selectedItem.versi_modul,
          versi_firmware: selectedItem.versi_firmware,
          tanggal_produksi: selectedItem.tanggal_produksi,
        });
      }
    } else {
      setNewdeviceData({
        serial_number_device: '',
        type: 'MANTULGRADER',
        versi_modul: '',
        versi_firmware: '',
        tanggal_produksi: ''
      });
    }
    setIsDeviceModalOpen(true);
  };

  const closeDeviceModal = () => setIsDeviceModalOpen(false);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

 
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const filterData = () => {
    const filteredData = deviceData.filter((item) => {
      const matchesSearch =
        item.serial_number_device?.toString().toLowerCase().startsWith(searchQuery.toLowerCase()) || 
        !searchQuery;
  
      const productionDate = new Date(item.tanggal_produksi);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
  
      const matchesDate = (!start || productionDate >= start) && (!end || productionDate <= end);
  
      return matchesSearch && matchesDate;
    });
  
    setFiltereddeviceData(filteredData);
  };

useEffect(() => {
  filterData();
}, [searchQuery, startDate, endDate, deviceData]);

    const handleReset = () => {
      setStartDate('');
      setEndDate('');
      setSearchQuery('');
      setFiltereddeviceData(deviceData); 
    };

    
    const handleFilter = () => {
      filterData();
      setIsFiltered(true);
    };
    


  //MENGAMBIL DATA INSTALLATION
  const fetchInstallationData = async () => {
    setLoading(true); 
    try {
        const response = await axiosInstance.get('http://localhost:3000/api/installation/type/MANTULGRADER');
        console.log(response.data); 

        if (response.data.success) {

            const updatedInstallationData = response.data.data.map(item => ({
                ...item,
                keterangan: item.keterangan || '',
            }));

            setInstallationData(updatedInstallationData); 
            setFilteredInstallationData(updatedInstallationData); 

        } else {

            console.error("Data tidak ditemukan:", response.data.message);
            setAlert({ message: response.data.message, type: "error", visible: true });
        }
    } catch (error) {
  
        console.error("Gagal mengambil data Installation:", error);
        setAlert({ message: "Terjadi kesalahan saat mengambil data installation.", type: "error", visible: true });
        router.push('/login'); 
    } finally {
        setLoading(false);
    }
};
  useEffect(() => {
    fetchdeviceData();
    fetchInstallationData();
    
    // Mengambil data serial number UNTUK FORM ADD INSTALLATION
    axiosInstance.get('http://localhost:3000/api/installation/device/serial_number_device/MANTULGRADER')
      .then(response => {
        console.log('Response Serial Number Device:', response.data);
        if (Array.isArray(response.data.data)) {
          setserial_number_device(response.data.data);
        } else {
          console.error('Data tidak berupa array:', response.data);
        }
      })
      .catch(error => console.error('Error fetching serial numbers:', error));
    
  }, []);

    useEffect(() => {
      if (deviceData.length > 0) {
        fetchInstallationData();
      }
    }, []);

//UNTUK MENGAMBIL DATA SERIAL NUMBER UNTUK FORM UPDATE INSTALLATION
  const fetchSerialNumberData = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:3000/api/installation/device/all-serial_number_device/MANTULGRADER');
      if (response.data.success) {
        setSerialNumberOptions(response.data.data); 
      } else {
        console.error("Gagal mengambil data serial number.");
      }
    } catch (error) {
      console.error("Error fetching serial number:", error);
    }
  };
  useEffect(() => {
    fetchSerialNumberData(); 
  }, []);
  
  // MENAMBAHKAN DATA INSTALLATION
  const handleAddInstallation = async () => {
    try {
      const formattedInstallationData = {
        ...newInstallationData,
        tanggal_installasi: new Date(newInstallationData.tanggal_installasi).toISOString().split('T')[0],
        warranty: new Date(newInstallationData.warranty).toISOString().split('T')[0],
        keterangan: newInstallationData.keterangan || null,
      };
  
      if (
        !formattedInstallationData.id_device ||
        !formattedInstallationData.tanggal_installasi ||
        !formattedInstallationData.warranty ||
        !formattedInstallationData.lokasi ||
        !formattedInstallationData.mode_unit ||
        !formattedInstallationData.code_unit ||
        !formattedInstallationData.status
      ) {
        setAlert({ message: "Harap lengkapi semua kolom data.", type: "warning", visible: true });
        return;
      }
  
      const response = await axiosInstance.post("http://localhost:3000/api/installation/add-installation", formattedInstallationData);
  
      if (response.data.success) {

        setInstallationData((prevData) => [...prevData, response.data.data]);
        setAlert({ message: "Installation berhasil ditambahkan.", type: "success", visible: true });
        setIsInstallationModalOpen(false);

        setDeviceStatus((prevData) => prevData.map(device =>
          device.id_device === response.data.data.id_device
            ? { ...device, status: response.data.data.status } 
            : device
        ));
  
        await fetchSerialNumberWithInstallation();
        await fetchDevicesStatusCount();
        await fetchdeviceData();
        await fetchHistoryData();
        
      } else {
        console.error("Server Error:", response.data.message);
        setAlert({ message: response.data.message, type: "error", visible: true });
      }
    } catch (error) {
      console.error("API Error:", error);
      setAlert({ message: "Terjadi kesalahan pada server.", type: "error", visible: true });
    }
  
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 2000);
  };
  
  
 // UPDATE DATA INSTALLATION 
 const handleUpdateInstallation = async () => {
  const status = newInstallationData.status.toLowerCase();

  const formattedInstallationData = {
      ...newInstallationData,
      tanggal_installasi: status === 'offline' 
          ? null 
          : new Date(newInstallationData.tanggal_installasi).toISOString().split('T')[0],
      warranty: status === 'offline' 
          ? null 
          : new Date(newInstallationData.warranty).toISOString().split('T')[0],
      lokasi: status === 'offline' ? null : newInstallationData.lokasi,
      mode_unit: status === 'offline' ? null : newInstallationData.mode_unit,
      code_unit: status === 'offline' ? null : newInstallationData.code_unit,
      keterangan: newInstallationData.keterangan || '',
  };

  if (
      !formattedInstallationData.id_device ||
      (status !== 'offline' && !formattedInstallationData.tanggal_installasi) ||
      (status !== 'offline' && !formattedInstallationData.warranty) ||
      !formattedInstallationData.status
  ) {
      window.alert("Harap lengkapi semua kolom data!");
      return;
  }

  try {
      const response = await axiosInstance.put(
          `http://localhost:3000/api/installation/update-installation/${formattedInstallationData.id_installation}`,
          formattedInstallationData
      );

      if (response.data.success) {
          fetchInstallationData(); 
          setAlert({ message: "Installation berhasil diperbarui.", type: "success", visible: true });
          setIsInstallationModalOpen(false);

          setDeviceStatus((prevData) =>
              prevData.map((device) =>
                  device.id_device === formattedInstallationData.id_device
                      ? { ...device, status: formattedInstallationData.status }
                      : device
              )
          );

          await fetchHistoryData();
          await fetchDevicesStatusCount();
          await fetchdeviceData();
      } else {
          setAlert({
              message: "Gagal memperbarui Installation: " + (response.data.message || "Terjadi kesalahan."),
              type: "error",
              visible: true,
          });
      }
  } catch (error) {
      console.error("Gagal memperbarui Installation:", error);
      const errorMessage =
          error?.response?.data?.message || "Terjadi kesalahan saat memperbarui Installation.";
      setAlert({ message: errorMessage, type: "error", visible: true });
  }

  setTimeout(() => {
      setAlert({ ...alert, visible: false });
  }, 2000);
};

 
const openInstallationModal = (id_installation = null) => {
  if (id_installation) {
    const selectedItem = installationData.find((item) => item.id_installation === id_installation);
    if (selectedItem) {
      setNewInstallationData({
        id_installation: selectedItem.id_installation,
        id_device: selectedItem.id_device,
        tanggal_installasi: selectedItem.tanggal_installasi,
        warranty: selectedItem.warranty,
        lokasi: selectedItem.lokasi,
        mode_unit: selectedItem.mode_unit,
        code_unit: selectedItem.code_unit,
        status: selectedItem.status,
        keterangan: selectedItem.keterangan || "", 
        serial_number_device: selectedItem.serial_number_device || "", 
      });
    }
    setIsEditMode(true);
  } else {
    if (serial_number_device.length === 0) {
      alert("Tidak ada serial number device yang tersedia. Silakan tambahkan device terlebih dahulu.");
      return;
    }
    setNewInstallationData({
      id_device: "",
      tanggal_installasi: "",
      warranty: "",
      lokasi: "",
      mode_unit: "",
      code_unit: "",
      status: "",
      keterangan: "",
    });
    setIsEditMode(false);
  }
  setIsInstallationModalOpen(true);
};

useEffect(() => {
  if (deviceData.length > 0) {
    fetchInstallationData();
    fetchSerialNumberData(); 
  }
}, []);
   
  const closeInstallationModal = () => setIsInstallationModalOpen(false);

  const handleInstallationSearchChange = (e) => {
    setInstallationSearchQuery(e.target.value);
  };
  
  const handleInstallationDateChange = (e) => {
    setInstallationSelectedDate(e.target.value);
  };

const filterInstallationData = () => {
  const filteredData = installationData.filter((item) => {
      const matchesSearch =
          item.serial_number_device?.toString().toLowerCase().startsWith(installationSearchQuery.toLowerCase()) || !installationSearchQuery;

      const installationDate = new Date(item.tanggal_installasi);
      const startDate = installationStartDate ? new Date(installationStartDate) : null;
      const endDate = installationEndDate ? new Date(installationEndDate) : null;

      const matchesDate = (!startDate || installationDate >= startDate) &&
                          (!endDate || installationDate <= endDate);

      return matchesSearch && matchesDate;
  });

  setFilteredInstallationData(filteredData);
};

  
useEffect(() => {
  filterInstallationData();
}, [installationStartDate, installationEndDate, installationSearchQuery, installationData]);

  
const handleInstallationFilter = () => {
  filterInstallationData(); 
  setIsFiltered(true); 
};

const handleInstallationReset = () => {
    setInstallationSearchQuery('');
    setInstallationStartDate('');
    setInstallationEndDate('');
    setFilteredInstallationData(installationData);
};


  const fetchSerialNumberWithInstallation = async () => {
    setLoading(true);
    try {
        const response = await axiosInstance.get('http://localhost:3000/api/maintenance/serial_number_with_installation/MANTULGRADER');
        console.log('Data:', response.data); 
        if (response.data.success) {
            console.log('Data yang diterima:', response.data.data); 
            setSerialNumberWithInstallation(response.data.data);
        }
    } catch (error) {
        console.error('Error fetching serial numbers with installation:', error);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
  fetchSerialNumberWithInstallation(); 
}, []);


  // Mengambil data Maintenance dari API
  const fetchMaintenanceData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('http://localhost:3000/api/maintenance/maintenance/type/MANTULGRADER');
      if (response.data.success) {
        const filteredData = response.data.data.map(item => ({
          serial_number_device: item.serial_number_device,
          history: item.history,
          type: item.type,
          kategori_maintenance: item.kategori_maintenance,
          created_by: item.created_by, 
          created_at: item.created_at, 
        }));
        setMaintenanceData(filteredData);
        setFilteredMaintenanceData(filteredData);
      }
    } catch (error) {
      console.error("Gagal mengambil data Maintenance:", error);
      setAlert({ message: "Gagal mengambil data Maintenance", type: "error", visible: true });
      router.push('/login');
    } finally {
      setLoading(false);
    }
};


// Menambah Data Maintenance
const handleAddMaintenance = async () => {
  const updatedMaintenanceData = {
      ...newMaintenanceData,
  };

  if (
      !updatedMaintenanceData.id_device ||
      !updatedMaintenanceData.history ||
      !updatedMaintenanceData.type ||
      !updatedMaintenanceData.kategori_maintenance
  ) {
      alert("Harap lengkapi semua kolom data! ");
      return;
  }

  try {
      const response = await axiosInstance.post(
          "http://localhost:3000/api/maintenance/add-maintenance",
          updatedMaintenanceData
      );

      // Log respons untuk debug
      console.log("Respons API:", response);

      if (response.status === 200 && response.data.success) {
          setMaintenanceData((prevData) => [...prevData, response.data.data]);
          setFilteredMaintenanceData((prevData) => [...prevData, response.data.data]);

          setNewMaintenanceData({
              id_device: "",
              type: "MANTULGRADER",
              kategori_maintenance: "",
              history: "",
          });

          setAlert({ message: "Maintenance berhasil ditambahkan.", type: "success", visible: true });
          closeMaintenanceModal();
          await fetchDevicesStatusCount();
          await fetchHistoryData();

      } else {
          alert("Gagal menambahkan Maintenance: " + (response.data.message || "Terjadi kesalahan."));
          setAlert({ message: "Gagal menambahkan Maintenance: " + (response.data.message || "Terjadi kesalahan."), type: "error", visible: true });
      }
  } catch (error) {
      console.error("Gagal menambahkan Maintenance:", error);
      const errorMessage = error?.response?.data?.message || "Terjadi kesalahan saat menambahkan Maintenance.";
      alert(errorMessage);
      setAlert({ message: errorMessage, type: "error", visible: true });
  }

  setTimeout(() => {
      setAlert({ ...alert, visible: false });
  }, 2000);
};

  const openMaintenanceModal = (id_device = null, mode = "add") => {
    if (mode === "edit" && id_device) {
      const selectedItem = maintenanceData.find((item) => item.id_device === id_device);
      if (selectedItem) {
        setNewMaintenanceData({
          id_device: selectedItem.id_device,
          type: selectedItem.type,
          kategori_maintenance: selectedItem.kategori_maintenance,
          history: selectedItem.history,
        });
        setIsEditMode(true);
      }
    } else {

      setNewMaintenanceData({
        id_device: "",
        type: "MANTULGRADER",
        kategori_maintenance: "",
        history: "",
      });
      setIsEditMode(false); 
    }
    setIsMaintenanceModalOpen(true);
  };

  const closeMaintenanceModal = () => setIsMaintenanceModalOpen(false);

  const handleMaintenanceSearchChange = (e) => {
    setMaintenanceSearchQuery(e.target.value);
  };

  const handleMaintenanceDateChange = (e) => {
    setMaintenanceSelectedDate(e.target.value);
  };

  const filterMaintenanceData = () => {
    const filteredData = maintenanceData.filter((item) => {
      const matchesSearch = 
        item.serial_number_device?.toString().toLowerCase().startsWith(maintenanceSearchQuery.toLowerCase()) || !maintenanceSearchQuery;
  
      const maintenanceDate = new Date(item.created_at);
      const startDate = maintenanceStartDate ? new Date(maintenanceStartDate) : null;
      const endDate = maintenanceEndDate ? new Date(maintenanceEndDate) : null;
  
      const matchesDate = (!startDate || maintenanceDate >= startDate) &&
                          (!endDate || maintenanceDate <= endDate);
  
      return matchesSearch && matchesDate;
    });
  
    setFilteredMaintenanceData(filteredData);
  };

  useEffect(() => {
  filterMaintenanceData();
}, [maintenanceSearchQuery, maintenanceStartDate, maintenanceEndDate, maintenanceData]);

  
  const handlemaintenanceFilter = () => {
    filterMaintenanceData(); 
  };

  const handleMaintenanceReset = () => {
    setMaintenanceSearchQuery('');
    setMaintenanceStartDate('');
    setMaintenanceEndDate('');
    setFilteredMaintenanceData(maintenanceData); 
  };
  

        // Mengambil Data History (ALLDataDevice)
    const fetchHistoryData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('http://localhost:3000/api/device/device-all-data/MANTULGRADER');
        console.log("Data History:", response.data.data);
    
        if (response.data.success) {
          const historyTableData = response.data.data.flatMap((item) => {
            const maintenanceData = item.maintenance || [];
            const installationData = item.installation || [];
    
            return installationData.map((installation, installationIndex) => {
              const maintenance = maintenanceData[installationIndex] || {};
    
              return {
                id: `${item.id_device}-${installationIndex}`,
                id_device: item.id_device,
                serial_number_device: item.serial_number_device,
                type: item.type,
                versi_modul: item.versi_modul,
                versi_firmware: item.versi_firmware,
                tanggal_produksi: item.tanggal_produksi,
                created_at: maintenance.created_at || item.created_at, 
                created_by: maintenance.created_by?.username || item.created_by?.username || "-",
                tanggal_installasi: installation.tanggal_installasi || "-",
                warranty: installation.warranty || "-",
                lokasi: installation.lokasi || "-",
                mode_unit: installation.mode_unit || "-",
                code_unit: installation.code_unit || "-",
                status: installation.status || "-",
                history: `${maintenance.history || "-"} (${maintenance.kategori_maintenance || "-"})`,
                maintenance_created_at: maintenance.created_at || "-",
                maintenance_created_by: maintenance.created_by?.username || "-",
                kategori_maintenance: maintenance.kategori_maintenance || "-", 
              };
            });
          });
    
          setHistoryData(historyTableData);
          setFilteredHistoryData(historyTableData);
        }
      } catch (error) {
        console.error("Gagal mengambil data Maintenance:", error);
        setAlert({ message: "Gagal mengambil data Maintenance", type: "error", visible: true });
        router.push('/login'); 
      } finally {
        setLoading(false);
      }
    };
        
        const handleHistorySearchChange = (e) => {
          setHistorySearchQuery(e.target.value);
        };

        
    useEffect(() => {
      filterHistoryData();
  }, [historySearchQuery, historyData]);
        
        const handleHistoryDateChange = (e) => {
          setHistorySelectedDate(e.target.value);
        };

        const filterHistoryData = () => {
          const filteredHistoryData = historyData.filter((item) => {
            const matchesSearch =
              item.serial_number_device?.toString().toLowerCase().startsWith(historySearchQuery.toLowerCase()) || !historySearchQuery;
        
            const maintenanceDate = new Date(item.maintenance_created_at);
            const startDate = historyStartDate ? new Date(historyStartDate) : null;
            const endDate = historyEndDate ? new Date(historyEndDate) : null;
        
            const matchesDate = (!startDate || maintenanceDate >= startDate) &&
                                (!endDate || maintenanceDate <= endDate);
        
            return matchesSearch && matchesDate;
          });
        
          setFilteredHistoryData(filteredHistoryData);
        };
    
        useEffect(() => {
          filterHistoryData();
        }, [historySearchQuery, historyStartDate, historyEndDate, historyData]);
    
        
      const handleHistoryReset = () => {
        setHistorySearchQuery('');
        setHistoryStartDate('');
        setHistoryEndDate('');
        setFilteredHistoryData(historyData);
      };
      
      const handlehistoryFilter = () => {
        filterHistoryData();
      };

      const filterMaintenanceCategories = () => {
        const categoriesCount = {};
      
        filteredHistoryData.forEach(item => {
          const category = item.kategori_maintenance;
          if (category && category !== "-") {
            categoriesCount[category] = (categoriesCount[category] || 0) + 1;
          }
        });
      
        const updatedCategories = Object.keys(categoriesCount)
          .map(category => ({
            category,
            total: categoriesCount[category],
          }))
          .filter(category => category.total > 0); 
      
        setMaintenanceCategories(updatedCategories);
      };
      
      useEffect(() => {
        filterMaintenanceCategories();
      }, [filteredHistoryData]);


  useEffect(() => {
    fetchdeviceData();
    fetchInstallationData();
    fetchMaintenanceData();
    fetchHistoryData();
    fetchSerialNumberWithInstallation();
    fetchDevicesStatusCount();
  }, []);
  
  const closeAlert = () => setAlert({ ...alert, visible: false }); 
  

  

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="flex-1 p-4 lg:p-0">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 -mt-2">Device MANTUL-GRADER</h2>


          <TabDevice activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === 'history' && (
            <div>
            <DashboardDevice 
                 deviceStatus={deviceStatus}
                 maintenanceCategories={maintenanceCategories}
                 recentInstallations={recentInstallations}
                 recentMaintenance={recentMaintenance} 
                 deviceByType={deviceByType}
                 monthlyDeviceStats={monthlyDeviceStats}
               />

           <TableHistory
             historyData={filteredHistoryData}
             historyselectedDate={historySelectedDate}
             startDate={startDate}
                endDate={endDate}
                historyStartDate={historyStartDate}
                historyEndDate={historyEndDate}
                setHistoryEndDate={setHistoryEndDate}
                setHistoryStartDate={setHistoryStartDate}
             handleHistoryDateChange={handleHistoryDateChange}
             historysearchQuery={historySearchQuery}
             handleHistorySearchChange={handleHistorySearchChange}
             handleHistoryReset={handleHistoryReset}
             handlehistoryFilter={handlehistoryFilter}
           />
           </div>
       )}

          {activeTab === "production" && (
            <div>
          <DashboardDevice 
               deviceStatus={deviceStatus}
               maintenanceCategories={maintenanceCategories}
               recentInstallations={recentInstallations}
               recentMaintenance={recentMaintenance} 
               deviceByType={deviceByType}
               monthlyDeviceStats={monthlyDeviceStats}
             />

            <TableList
              filtereddeviceData={filtereddeviceData}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              handleReset={handleReset}
              handleFilter={handleFilter}
              handleDelete={handleDeleteDevice}
              openDeviceModal={openDeviceModal}
            />
          </div>
          )}
          {isDeviceModalOpen && (
            <FormDevice
              newDeviceData={newdeviceData}
              setNewDeviceData={setNewdeviceData}
              handleAddDevice={handleAddDevice}
              handleUpdateDevice={handleUpdateDevice}
              closeDeviceModal={closeDeviceModal}
            />
          )}


              {activeTab === 'installation' && (
                <div>
                <DashboardDevice 
                     deviceStatus={deviceStatus}
                     maintenanceCategories={maintenanceCategories}
                     recentInstallations={recentInstallations}
                     recentMaintenance={recentMaintenance} 
                     deviceByType={deviceByType}
                     monthlyDeviceStats={monthlyDeviceStats}
                   />
              <TableInstallation 
                installationData={filteredInstallationData} // Pastikan data ini sudah difilter dan benar
                installationselectedDate={installationSelectedDate}
                startDate={startDate}
                endDate={endDate}
                installationStartDate={installationStartDate}
                installationEndDate={installationEndDate}
                setInstallationEndDate={setInstallationEndDate}
                setInstallationStartDate={setInstallationStartDate}
                handleInstallationDateChange={handleInstallationDateChange}
                installationsearchQuery={installationSearchQuery}
                handleInstallationSearchChange={handleInstallationSearchChange}
                handleInstallationReset={handleInstallationReset}
                openInstallationModal={openInstallationModal}
                handleinstallationFilter={handleInstallationFilter}
              />
              </div>
            )}

            {isInstallationModalOpen && (
              <FormInstallation
                newInstallationData={newInstallationData}
                setNewInstallationData={setNewInstallationData}
                handleAddInstallation={handleAddInstallation}
                handleUpdateInstallation={handleUpdateInstallation}
                closeInstallationModal={closeInstallationModal}
                serialNumberOptions={serial_number_device}  
                isEditMode={isEditMode}
              />
            )}

           
              {activeTab === 'maintenance' && (
                <div>
                <DashboardDevice 
                     deviceStatus={deviceStatus}
                     maintenanceCategories={maintenanceCategories}
                     recentInstallations={recentInstallations}
                     recentMaintenance={recentMaintenance} 
                     deviceByType={deviceByType}
                     monthlyDeviceStats={monthlyDeviceStats}
                   />
            <TableMaintenance
              setFilteredMaintenanceData={setFilteredMaintenanceData}
              maintenanceData={filteredmaintenanceData}
              maintenanceselectedDate={maintenanceSelectedDate}
              startDate={startDate}
              endDate={endDate}
              maintenanceStartDate={maintenanceStartDate}
              maintenanceEndDate={maintenanceEndDate}
              setMaintenanceEndDate={setMaintenanceEndDate}
              setMaintenanceStartDate={setMaintenanceStartDate}
              handleMaintenanceDateChange={handleMaintenanceDateChange}
              maintenancesearchQuery={maintenanceSearchQuery}
              handleMaintenanceSearchChange={handleMaintenanceSearchChange}
              handleMaintenanceReset={handleMaintenanceReset}
              handlemaintenanceFilter={handlemaintenanceFilter}
              openMaintenanceModal={openMaintenanceModal}
            />
            </div>
          )}

            {isMaintenanceModalOpen && (
            <FormMaintenance
              newMaintenanceData={newMaintenanceData}
              setNewMaintenanceData={setNewMaintenanceData}
              handleAddMaintenance={handleAddMaintenance}
              closeMaintenanceModal={closeMaintenanceModal}
              serialNumberWithInstallation={serialNumberWithInstallation}
            />
          )}

          {alert.visible && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={closeAlert}
          />
        )}
          </div>
      </div>
    </div>
  );
};

export default MantulGraderPage;
