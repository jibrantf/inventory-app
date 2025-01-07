"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import TabDeviceGuide from "../../components/TabDeviceGuide";
import Alert from '../../components/Alert';
import { MdDelete, MdOutlineOpenInNew } from "react-icons/md";
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';


const DeviceGuidePage = () => {
  const [ofaFiles, setOfaFiles] = useState([]);
  const [showUploadOfaModal, setShowUploadOfaModal] = useState(false);
  const [showFileOfaModal, setShowFileOfaModal] = useState(false);
  const [fileOfaToView, setFileOfaToView] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileToView, setFileToView] = useState("");
  const [showFileModal, setShowFileModal] = useState(false);
  const router = useRouter();
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });

  const [ofaFilesPerPage, setOfaFilesPerPage] = useState(10);
  const [ofaCurrentPage, setOfaCurrentPage] = useState(1);
  const ofaPages = Math.ceil(ofaFiles.length / ofaFilesPerPage);
  const ofaPagination = Array.from({ length: ofaPages }, (_, index) => index + 1);

  const ofaFilesToDisplay = ofaFiles.slice((ofaCurrentPage - 1) * ofaFilesPerPage, ofaCurrentPage * ofaFilesPerPage);

  const [fileOfaData, setFileOfaData] = useState({
    file_name: "",
    title: "",
    type: "OFA",
    file: null,
  });

  const [sdfmsFiles, setSdfmsFiles] = useState([]);
  const [showUploadSdfmsModal, setShowUploadSdfmsModal] = useState(false);
  const [showFileSdfmsModal, setShowFileSdfmsModal] = useState(false);
  const [fileSdfmsToView, setFileSdfmsToView] = useState("");

  const [sdfmsFilesPerPage, setSdfmsFilesPerPage] = useState(10);
const [sdfmsCurrentPage, setSdfmsCurrentPage] = useState(1);
const sdfmsPages = Math.ceil(sdfmsFiles.length / sdfmsFilesPerPage);
const sdfmsPagination = Array.from({ length: sdfmsPages }, (_, index) => index + 1);

const sdfmsFilesToDisplay = sdfmsFiles.slice((sdfmsCurrentPage - 1) * sdfmsFilesPerPage, sdfmsCurrentPage * sdfmsFilesPerPage);

  const [fileSdfmsData, setFileSdfmsData] = useState({
    file_name: "",
    title: "",
    type: "SDFMS",
    file: null,
  });

  const [graderFiles, setGraderFiles] = useState([]);
  const [showUploadGraderModal, setShowUploadGraderModal] = useState(false);
  const [showFileGraderModal, setShowFileGraderModal] = useState(false);
  const [fileGraderToView, setFileGraderToView] = useState("");
  const [graderFilesPerPage, setGraderFilesPerPage] = useState(10);
const [graderCurrentPage, setGraderCurrentPage] = useState(1);
const graderPages = Math.ceil(graderFiles.length / graderFilesPerPage);
const graderPagination = Array.from({ length: graderPages }, (_, index) => index + 1);
const graderFilesToDisplay = graderFiles.slice((graderCurrentPage - 1) * graderFilesPerPage, graderCurrentPage * graderFilesPerPage);

  const [fileGraderData, setFileGraderData] = useState({
    file_name: "",
    title: "",
    type: "MANTUL-GRADER",
    file: null,
  });
 
  const [safelightFiles, setSafelightFiles] = useState([]);
  const [showUploadSafelightModal, setShowUploadSafelightModal] = useState(false);
  const [showFileSafelightModal, setShowFileSafelightModal] = useState(false);
  const [fileSafelightToView, setFileSafelightToView] = useState("");

  const [safelightFilesPerPage, setSafelightFilesPerPage] = useState(10);
const [safelightCurrentPage, setSafelightCurrentPage] = useState(1);
const safelightPages = Math.ceil(safelightFiles.length / safelightFilesPerPage);
const safelightPagination = Array.from({ length: safelightPages }, (_, index) => index + 1);

const safelightFilesToDisplay = safelightFiles.slice((safelightCurrentPage - 1) * safelightFilesPerPage, safelightCurrentPage * safelightFilesPerPage);

  const [fileSafelightData, setFileSafelightData] = useState({
    file_name: "",
    title: "",
    type: "SAFELIGHT",
    file: null,
  }); 


  const closeAllModals = () => {
    setShowUploadOfaModal(false);
    setShowUploadSdfmsModal(false);
    setShowUploadGraderModal(false);
    setShowUploadSafelightModal(false);
    setShowFileModal(false);
  };


const formatDate = (date) => {
  return format(new Date(date), 'yyyy-MM-dd'); 
};


const fetchOfaFiles = async () => {
  try {
    const response = await axiosInstance.get("http://localhost:3000/api/document/file-type/OFA");
    if (response.data.success) {
      setOfaFiles(response.data.data);
      console.log("Fetched Files:", response.data.data);
    } else {
      console.error("Failed to fetch data:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching OFA files:", error);
    router.push("/login");
  }
};
  

const fetchSdfmsFiles = async () => {
  try {
    const response = await axiosInstance.get("http://localhost:3000/api/document/file-type/SDFMS");
    if (response.data.success) {
      setSdfmsFiles(response.data.data);
      console.log("Fetched Files:", response.data.data); 
    } else {
      console.error("Failed to fetch data:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching SDFMS files:", error);
    router.push("/login");
  }
};


const fetchGraderFiles = async () => {
  try {
    const response = await axiosInstance.get("http://localhost:3000/api/document/file-type/MANTUL-GRADER");
    if (response.data.success) {
      setGraderFiles(response.data.data);
      console.log("Fetched Files:", response.data.data);
    } else {
      console.error("Failed to fetch data:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching MANTUL-GRADER files:", error);
    router.push("/login");
  }
};

const fetchSafelightFiles = async () => {
  try {
    const response = await axiosInstance.get("http://localhost:3000/api/document/file-type/SAFELIGHT");
    if (response.data.success) {
      setSafelightFiles(response.data.data);
      console.log("Fetched Files:", response.data.data);
    } else {
      console.error("Failed to fetch data:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching SAFELIGHT files:", error);
    router.push("/login");
  }
};


const fetchFileById = async (idFile) => {
  try {
    const response = await axiosInstance.get(`http://localhost:3000/api/document/file/${idFile}`);
    if (response.data.success) {
      const fileData = response.data.data;
      const fileUrl = `http://localhost:3000/${fileData.file_path}`;
      setFileToView(fileUrl);
      setShowFileModal(true); 
    } else {
      console.error("Gagal mengambil file:", response.data.message);
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil file berdasarkan ID:", error);
  }
};

  const handleInputOfaChange = (e) => {
    const { name, value } = e.target;
    setFileOfaData({ ...fileOfaData, [name]: value });
  };

  const handleFileOfaChange = (e) => {
    setFileOfaData({ ...fileOfaData, file: e.target.files[0] });
  };

  const handleUploadFileOfa = async (event) => {
    event.preventDefault(); 
    const formData = new FormData();
    formData.append("file_name", fileOfaData.file_name);
    formData.append("title", fileOfaData.title);
    formData.append("type", fileOfaData.type);
    formData.append("file", fileOfaData.file);
  
    try {
      setLoading(true);
      const response = await axiosInstance.post("http://localhost:3000/api/document/add-file/OFA", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.data.success) {
        setOfaFiles((prevFiles) => [...prevFiles, response.data.data]);
        setShowUploadOfaModal(false);
        setFileOfaData({
          file_name: "",
          title: "",
          type: "OFA",
          file: null,
        });

        setAlert({ message: "Fiel berhasil diupload.", type: "success", visible: true });
  
        fetchOfaFiles();
      } else {
        console.error("Failed to upload file:", response.data.message);
        setAlert({ message: "Gagal mengupload file. Coba lagi.", type: "error", visible: true });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
  }, 2000);
  };

  const handleInputSdfmsChange = (e) => {
    const { name, value } = e.target;
    setFileSdfmsData({ ...fileSdfmsData, [name]: value });
  };

  const handleFileSdfmsChange = (e) => {
    setFileSdfmsData({ ...fileSdfmsData, file: e.target.files[0] });
  };

  const handleUploadFileSdfms = async (event) => {
    event.preventDefault(); 
    const formData = new FormData();
    formData.append("file_name", fileSdfmsData.file_name);
    formData.append("title", fileSdfmsData.title);
    formData.append("type", fileSdfmsData.type);
    formData.append("file", fileSdfmsData.file);
  
    try {
      setLoading(true);
      const response = await axiosInstance.post("http://localhost:3000/api/document/add-file/SDFMS", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.data.success) {
        setSdfmsFiles((prevFiles) => [...prevFiles, response.data.data]);
        setShowUploadSdfmsModal(false);
        setFileSdfmsData({
          file_name: "",
          title: "",
          type: "SDFMS",
          file: null,
        });

        setAlert({ message: "Fiel berhasil diupload.", type: "success", visible: true });
  
        fetchSdfmsFiles();
      } else {
        console.error("Failed to upload file:", response.data.message);
        setAlert({ message: "Gagal mengupload file. Coba lagi.", type: "error", visible: true });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
  }, 2000);
  };

  const handleInputGraderChange = (e) => {
    const { name, value } = e.target;
    setFileGraderData({ ...fileGraderData, [name]: value });
  };

  const handleFileGraderChange = (e) => {
    setFileGraderData({ ...fileGraderData, file: e.target.files[0] });
  };

  const handleUploadFileGrader = async (event) => {
    event.preventDefault(); 
    const formData = new FormData();
    formData.append("file_name", fileGraderData.file_name);
    formData.append("title", fileGraderData.title);
    formData.append("type", fileGraderData.type);
    formData.append("file", fileGraderData.file);
  
    try {
      setLoading(true);
      const response = await axiosInstance.post("http://localhost:3000/api/document/add-file/MANTUL-GRADER", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.data.success) {
        setGraderFiles((prevFiles) => [...prevFiles, response.data.data]);
        setShowUploadGraderModal(false);
        setFileGraderData({
          file_name: "",
          title: "",
          type: "MANTUL-GRADER",
          file: null,
        });

        setAlert({ message: "Fiel berhasil diupload.", type: "success", visible: true });
  
        fetchGraderFiles();
      } else {
        console.error("Failed to upload file:", response.data.message);
        setAlert({ message: "Gagal mengupload file. Coba lagi.", type: "error", visible: true });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
  }, 2000);
  };

  const handleInputSafelightChange = (e) => {
    const { name, value } = e.target;
    setFileSafelightData({ ...fileSafelightData, [name]: value });
  };

  const handleFileSafelightChange = (e) => {
    setFileSafelightData({ ...fileSafelightData, file: e.target.files[0] });
  };

  const handleUploadFileSafelight = async (event) => {
    event.preventDefault(); 
    const formData = new FormData();
    formData.append("file_name", fileSafelightData.file_name);
    formData.append("title", fileSafelightData.title);
    formData.append("type", fileSafelightData.type);
    formData.append("file", fileSafelightData.file);
  
    try {
      setLoading(true);
      const response = await axiosInstance.post("http://localhost:3000/api/document/add-file/SAFELIGHT", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.data.success) {
        setSafelightFiles((prevFiles) => [...prevFiles, response.data.data]);
        setShowUploadSafelightModal(false);
        setFileSafelightData({
          file_name: "",
          title: "",
          type: "SAFELIGHT",
          file: null,
        });

        setAlert({ message: "Fiel berhasil diupload.", type: "success", visible: true });
  
        fetchSafelightFiles();
      } else {
        console.error("Failed to upload file:", response.data.message);
        setAlert({ message: "Gagal mengupload file. Coba lagi.", type: "error", visible: true });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
  }, 2000);
  };
  
  useEffect(() => {
    fetchOfaFiles();
    fetchSdfmsFiles();
    fetchGraderFiles(); 
    fetchSafelightFiles(); 
  }, []);
  


  // Fungsi untuk menghapus file
  const handleDeleteFile = async (idFile) => {
    try {
      const response = await axiosInstance.delete(`http://localhost:3000/api/document/delete-file/${idFile}`);
      if (response.data.success) {
        setOfaFiles((prevFiles) => prevFiles.filter((file) => file.id_file !== idFile));
        setSdfmsFiles((prevFiles) => prevFiles.filter((file) => file.id_file !== idFile));
        setGraderFiles((prevFiles) => prevFiles.filter((file) => file.id_file !== idFile));
        setSafelightFiles((prevFiles) => prevFiles.filter((file) => file.id_file !== idFile));

        setAlert({ message: "File berhasil dihapus.", type: "success", visible: true });
      } else {
        console.error("Failed to delete file:", response.data.message);
        setAlert({ message: "Gagal menghapus file. Coba lagi.", type: "error", visible: true });
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
  }, 2000);
  };


  const tabsContent = {
    OFA: {
      title: "GUIDE OFA SET",
      content: (
        <div>
          <div className="flex justify-between items-center mb-2">
          <div className="flex-grow"></div>
            <button
              onClick={() => setShowUploadOfaModal((prev) => !prev)}
              className="bg-blue-500 text-white text-sm py-1 px-2 -mt-4 rounded hover:bg-blue-600"
            >
              {showUploadOfaModal ? "Close Upload Form" : "Upload File"}
            </button>
          </div>

              {/* Modal Unggah File */}
              {showUploadOfaModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl transform translate-x-0 sm:translate-x-0 lg:translate-x-60 -mt-10">
                <form autoComplete="off">
                    <h2 className="text-lg font-semibold mb-4">Upload File</h2>

                    <div className="mb-4">
                      <label htmlFor="file_name" className="block text-gray-700 mb-2">File Name</label>
                      <input
                        type="text"
                        id="file_name"
                        name="file_name"
                        value={fileOfaData.file_name}
                        onChange={handleInputOfaChange}
                        placeholder="File Name"
                        className="border rounded p-2 w-full text-gray-800"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={fileOfaData.title}
                        onChange={handleInputOfaChange}
                        placeholder="Title"
                        className="border rounded p-2 w-full text-gray-800"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="type" className="block text-gray-700 mb-2">Type</label>
                      <input
                        type="text"
                        id="type"
                        name="type"
                        value={fileOfaData.type}
                        onChange={handleInputOfaChange}
                        placeholder="Type"
                        className="border rounded p-2 w-full text-gray-700"
                        disabled
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="file" className="block text-gray-700 mb-2">Upload File</label>
                      <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileOfaChange}
                        className="border rounded p-2 w-full text-gray-800"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowUploadOfaModal(false)}
                        className="bg-gray-500 text-white text-sm py-1 px-2 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUploadFileOfa}
                        className="bg-blue-500 text-white text-sm py-1 px-2 rounded hover:bg-blue-600"
                      >
                        Upload
                      </button>
                    </div>
                    </form>
                  </div>
                </div>
              )}
                {/* Tabel File */}
                <table className="w-full border-collapse rounded-lg shadow">
                <thead>
                  <tr className="bg-slate-500">
                    <th className="px-4 py-2 text-gray-100 text-center font-medium w-20">File Name</th>
                    <th className="px-4 py-2 text-gray-100 text-center font-medium w-40">Title</th>
                    <th className="px-4 py-2 text-gray-100 text-center font-medium w-20">Uploaded At</th>
                    <th className="px-4 py-2 text-gray-100 text-center font-medium w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ofaFilesToDisplay.map((file) => (
                    <tr key={file.id_file} className="bg-slate-200 hover:bg-slate-300">
                      <td className="border px-4 py-2 text-center text-sm text-gray-900 w-20">{file.file_name}</td>
                      <td className="border px-4 py-2 text-center text-sm text-gray-900 w-40">{file.title}</td>
                      <td className="border px-4 py-2 text-center text-sm text-gray-900 w-20">
                        {file.uploaded_at ? formatDate(file.uploaded_at) : 'Tanggal Tidak Tersedia'}
                      </td>
                      <td className="border px-4 py-2 text-center text-sm text-gray-900 w-20">
                        <div className="flex justify-center items-center gap-2 ml-2">
                          <button onClick={() => fetchFileById(file.id_file)} 
                            className="text-gray-800 hover:text-blue-600">
                            <MdOutlineOpenInNew size={22} />
                          </button>
                          <button onClick={() => handleDeleteFile(file.id_file)} 
                          className="text-gray-800 hover:text-orange-600">
                            <MdDelete size={25} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                              <nav className="flex justify-start mt-4 space-x-2">
                <button
                  onClick={() => setOfaCurrentPage(ofaCurrentPage - 1)}
                  disabled={ofaCurrentPage === 1}
                  className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Previous
                </button>
                {ofaPagination.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setOfaCurrentPage(pageNumber)}
                    className={`px-2 py-1 text-sm ${ofaCurrentPage === pageNumber ? 'bg-gray-300' : 'bg-gray-200'} text-gray-700 rounded hover:bg-gray-300`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  onClick={() => setOfaCurrentPage(ofaCurrentPage + 1)}
                  disabled={ofaCurrentPage === ofaPages}
                  className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Next
                </button>
              </nav>
           </div>
          ),
    },


    SDFMS: {
      title: "GUIDE SDFMS SET",
      content: (
        <div>
          <div className="flex justify-between items-center mb-2">
          <div className="flex-grow"></div>
            <button
              onClick={() => setShowUploadSdfmsModal((prev) => !prev)}
              className="bg-blue-500 text-white text-sm py-1 px-2 -mt-4 rounded hover:bg-blue-600"
            >
              {showUploadSdfmsModal ? "Close Upload Form" : "Upload File"}
            </button>
          </div>
        
                 {/* Modal Unggah File */}
                  {showUploadSdfmsModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl transform translate-x-0 sm:translate-x-0 lg:translate-x-60 -mt-10">
                    <form autoComplete="off">
                        <h2 className="text-lg font-semibold mb-4">Upload File</h2>

                        <div className="mb-4">
                          <label htmlFor="file_name" className="block text-gray-700 mb-2">File Name</label>
                          <input
                            type="text"
                            id="file_name"
                            name="file_name"
                            value={fileSdfmsData.file_name}
                            onChange={handleInputSdfmsChange}
                            placeholder="File Name"
                            className="border rounded p-2 w-full text-gray-800"
                          />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            value={fileSdfmsData.title}
                            onChange={handleInputSdfmsChange}
                            placeholder="Title"
                            className="border rounded p-2 w-full text-gray-800"
                          />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="type" className="block text-gray-700 mb-2">Type</label>
                          <input
                            type="text"
                            id="type"
                            name="type"
                            value={fileSdfmsData.type}
                            onChange={handleInputSdfmsChange}
                            placeholder="Type"
                            className="border rounded p-2 w-full text-gray-700"
                            disabled
                          />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="file" className="block text-gray-700 mb-2">Upload File</label>
                          <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={handleFileSdfmsChange}
                            className="border rounded p-2 w-full text-gray-800"
                          />
                        </div>

                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setShowUploadSdfmsModal(false)}
                            className="bg-gray-500 text-white text-sm py-1 px-2 rounded hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleUploadFileSdfms}
                            className="bg-blue-500 text-white text-sm py-1 px-2 rounded hover:bg-blue-600"
                          >
                            Upload
                          </button>
                        </div>
                        </form>
                      </div>
                    </div>
                  )}

               {/* Tabel File */}
                <table className="w-full border-collapse rounded-lg shadow">
                  <thead>
                    <tr className="bg-slate-500">
                      <th className="px-4 py-2 text-gray-100 text-center font-medium w-20">File Name</th>
                      <th className="px-4 py-2 text-gray-100 text-center font-medium w-40">Title</th>
                      <th className="px-4 py-2 text-gray-100 text-center font-medium w-20">Uploaded At</th>
                      <th className="px-4 py-2 text-gray-100 text-center font-medium w-20">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sdfmsFilesToDisplay.map((file) => (
                      <tr key={file.id_file} className="bg-slate-200 hover:bg-slate-300">
                        <td className="border px-4 py-2 text-center text-sm text-gray-900 w-20">{file.file_name}</td>
                        <td className="border px-4 py-2 text-center text-sm text-gray-900 w-40">{file.title}</td>
                        <td className="border px-4 py-2 text-center text-sm text-gray-900 w-20">
                          {file.uploaded_at ? formatDate(file.uploaded_at) : 'Tanggal Tidak Tersedia'}
                        </td>
                        <td className="border px-4 py-2 text-center text-sm text-gray-900 w-20">
                          <div className="flex justify-center items-center gap-2 ml-2">
                            <button onClick={() => fetchFileById(file.id_file)} className="text-gray-800 hover:text-blue-600">
                              <MdOutlineOpenInNew size={22} />
                            </button>
                            <button onClick={() => handleDeleteFile(file.id_file)} className="text-gray-800 hover:text-orange-600">
                              <MdDelete size={25} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <nav className="flex justify-start mt-4 space-x-2">
                  <button
                    onClick={() => setSdfmsCurrentPage(sdfmsCurrentPage - 1)}
                    disabled={sdfmsCurrentPage === 1}
                    className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Previous
                  </button>
                  {sdfmsPagination.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => setSdfmsCurrentPage(pageNumber)}
                      className={`px-2 py-1 text-sm ${sdfmsCurrentPage === pageNumber ? 'bg-gray-300' : 'bg-gray-200'} text-gray-700 rounded hover:bg-gray-300`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    onClick={() => setSdfmsCurrentPage(sdfmsCurrentPage + 1)}
                    disabled={sdfmsCurrentPage === sdfmsPages}
                    className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Next
                  </button>
                </nav>
              </div>
            ),
    },



    "MANTUL-GRADER": {
      title: "GUIDE MANTUL GRADER SET",
      content: (
        <div>
          <div className="flex justify-between items-center mb-2">
          <div className="flex-grow"></div>
            <button
              onClick={() => setShowUploadGraderModal((prev) => !prev)}
              className="bg-blue-500 text-white text-sm py-1 px-2 -mt-4 rounded hover:bg-blue-600"
            >
              {showUploadGraderModal ? "Close Upload Form" : "Upload File"}
            </button>
          </div>

                {/* Modal Unggah File */}
                {showUploadGraderModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl transform translate-x-0 sm:translate-x-0 lg:translate-x-60 -mt-10">
                      
                  <form autoComplete="off">
                      <h2 className="text-lg font-semibold mb-4">Upload File</h2>

                      <div className="mb-4">
                        <label htmlFor="file_name" className="block text-gray-700 mb-2">File Name</label>
                        <input
                          type="text"
                          id="file_name"
                          name="file_name"
                          value={fileGraderData.file_name}
                          onChange={handleInputGraderChange}
                          placeholder="File Name"
                          className="border rounded p-2 w-full text-gray-800"
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={fileGraderData.title}
                          onChange={handleInputGraderChange}
                          placeholder="Title"
                          className="border rounded p-2 w-full text-gray-800"
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="type" className="block text-gray-700 mb-2">Type</label>
                        <input
                          type="text"
                          id="type"
                          name="type"
                          value={fileGraderData.type}
                          onChange={handleInputGraderChange}
                          placeholder="Type"
                          className="border rounded p-2 w-full text-gray-700"
                          disabled
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="file" className="block text-gray-700 mb-2">Upload File</label>
                        <input
                          type="file"
                          id="file"
                          name="file"
                          onChange={handleFileGraderChange}
                          className="border rounded p-2 w-full text-gray-800"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setShowUploadGraderModal(false)}
                          className="bg-gray-500 text-white text-sm py-1 px-2 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleUploadFileGrader}
                          className="bg-blue-500 text-white text-sm py-1 px-2 rounded hover:bg-blue-600"
                        >
                          Upload
                        </button>
                      </div>
                      </form>
                    </div>
                  </div>
                )}
                   {/* Tabel File */}          
                  <table className="w-full border-collapse rounded-lg shadow">
                    <thead>
                      <tr className="bg-slate-500">
                        <th className="px-4 py-2 text-gray-100 text-center font-medium w-20">File Name</th>
                        <th className="px-4 py-2 text-gray-100 text-center font-medium w-40">Title</th>
                        <th className="px-4 py-2 text-gray-100 text-center font-medium w-20">Uploaded At</th>
                        <th className="px-4 py-2 text-gray-100 text-center font-medium w-20">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {graderFilesToDisplay.map((file) => (
                        <tr key={file.id_file} className="bg-slate-200 hover:bg-slate-300">
                          <td className="border px-4 py-2 text-center text-sm text-gray-900 w-20">{file.file_name}</td>
                          <td className="border px-4 py-2 text-center text-sm text-gray-900 w-40">{file.title}</td>
                          <td className="border px-4 py-2 text-center text-sm text-gray-900 w-20">
                            {file.uploaded_at ? formatDate(file.uploaded_at) : 'Tanggal Tidak Tersedia'}
                          </td>
                          <td className="border px-4 py-2 text-center text-sm text-gray-900 w-20">
                            <div className="flex justify-center items-center gap-2 ml-2">
                              <button onClick={() => fetchFileById(file.id_file)} className="text-gray-800 hover:text-blue-600">
                                <MdOutlineOpenInNew size={22} />
                              </button>
                              <button onClick={() => handleDeleteFile(file.id_file)} className="text-gray-800 hover:text-orange-600">
                                <MdDelete size={25} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <nav className="flex justify-start mt-4 space-x-2">
                    <button
                      onClick={() => setGraderCurrentPage(graderCurrentPage - 1)}
                      disabled={graderCurrentPage === 1}
                      className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Previous
                    </button>
                    {graderPagination.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => setGraderCurrentPage(pageNumber)}
                        className={`px-2 py-1 text-sm ${graderCurrentPage === pageNumber ? 'bg-gray-300' : 'bg-gray-200'} text-gray-700 rounded hover:bg-gray-300`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                    <button
                      onClick={() => setGraderCurrentPage(graderCurrentPage + 1)}
                      disabled={graderCurrentPage === graderPages}
                      className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Next
                    </button>
                  </nav>
             </div>
            ),
    },



    SAFELIGHT: {
      title: "GUIDE SAFELIGHT SET",
      content: (
        <div>
          <div className="flex justify-between items-center mb-2">
          <div className="flex-grow"></div>
            <button
              onClick={() => setShowUploadSafelightModal((prev) => !prev)}
              className="bg-blue-500 text-white text-sm py-1 px-2 -mt-4 rounded hover:bg-blue-600"
            >
              {showUploadSafelightModal ? "Close Upload Form" : "Upload File"}
            </button>
          </div>

                {/* Modal Unggah File */}
                {showUploadSafelightModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl transform translate-x-0 sm:translate-x-0 lg:translate-x-60 -mt-10">
                  <form autoComplete="off">
                      <h2 className="text-lg font-semibold mb-4">Upload File</h2>

                      <div className="mb-4">
                        <label htmlFor="file_name" className="block text-gray-700 mb-2">File Name</label>
                        <input
                          type="text"
                          id="file_name"
                          name="file_name"
                          value={fileSafelightData.file_name}
                          onChange={handleInputSafelightChange}
                          placeholder="File Name"
                          className="border rounded p-2 w-full text-gray-800"
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={fileSafelightData.title}
                          onChange={handleInputSafelightChange}
                          placeholder="Title"
                          className="border rounded p-2 w-full text-gray-800"
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="type" className="block text-gray-700 mb-2">Type</label>
                        <input
                          type="text"
                          id="type"
                          name="type"
                          value={fileSafelightData.type}
                          onChange={handleInputSafelightChange}
                          placeholder="Type"
                          className="border rounded p-2 w-full text-gray-700"
                          disabled
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="file" className="block text-gray-700 mb-2">Upload File</label>
                        <input
                          type="file"
                          id="file"
                          name="file"
                          onChange={handleFileSafelightChange}
                          className="border rounded p-2 w-full text-gray-800"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setShowUploadSafelightModal(false)}
                          className="bg-gray-500 text-white text-sm py-1 px-2 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleUploadFileSafelight}
                          className="bg-blue-500 text-white text-sm py-1 px-2 rounded hover:bg-blue-600"
                        >
                          Upload
                        </button>
                      </div>
                      </form>
                    </div>
                  </div>
                )}


              {/* Tabel File */}
              <table className="w-full border-collapse rounded-lg shadow">
                <thead>
                  <tr className="bg-slate-500">
                    <th className="px-4 py-2 text-gray-100 text-center font-medium w-20">File Name</th>
                    <th className="px-4 py-2 text-gray-100 text-center font-medium w-40">Title</th>
                    <th className="px-4 py-2 text-gray-100 text-center font-medium w-20">Uploaded At</th>
                    <th className="px-4 py-2 text-gray-100 text-center font-medium w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {safelightFilesToDisplay.map((file) => (
                    <tr key={file.id_file} className="bg-slate-200 hover:bg-slate-300">
                      <td className="border px-4 py-2 text-center text-sm text-gray-900 w-20">{file.file_name}</td>
                      <td className="border px-4 py-2 text-center text-sm text-gray-900 w-40">{file.title}</td>
                      <td className="border px-4 py-2 text-center text-sm text-gray-900 w-20">
                        {file.uploaded_at ? formatDate(file.uploaded_at) : 'Tanggal Tidak Tersedia'}
                      </td>
                      <td className="border px-4 py-2 text-center text-sm text-gray-900 w-20">
                        <div className="flex justify-center items-center gap-2 ml-2">
                          <button onClick={() => fetchFileById(file.id_file)} className="text-gray-800 hover:text-blue-600">
                            <MdOutlineOpenInNew size={22} />
                          </button>
                          <button onClick={() => handleDeleteFile(file.id_file)} className="text-gray-800 hover:text-orange-600">
                            <MdDelete size={25} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <nav className="flex justify-start mt-4 space-x-2">
                <button
                  onClick={() => setSafelightCurrentPage(safelightCurrentPage - 1)}
                  disabled={safelightCurrentPage === 1}
                  className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Previous
                </button>
                {safelightPagination.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setSafelightCurrentPage(pageNumber)}
                    className={`px-2 py-1 text-sm ${safelightCurrentPage === pageNumber ? 'bg-gray-300' : 'bg-gray-200'} text-gray-700 rounded hover:bg-gray-300`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  onClick={() => setSafelightCurrentPage(safelightCurrentPage + 1)}
                  disabled={safelightCurrentPage === safelightPages}
                  className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Next
                </button>
              </nav>
            </div>

          ),
    },
  };

  const closeAlert = () => setAlert({ ...alert, visible: false }); 

  return (
    <div className="flex bg-gray-200 min-h-screen overflow-hidden">
      <div className="flex-1 p-2 lg:p-0">
        <div className="p-6">
          <h1 className="text-xl font-semibold mb-4">DEVICE GUIDE</h1>
          <TabDeviceGuide tabs={tabsContent} />
        </div>
                  {showFileModal && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
              <div className="modal-content bg-white p-6 rounded shadow-lg w-full max-w-4xl h-auto relative flex flex-col">
                <button
                  onClick={closeAllModals}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                >
                  &times;
                </button>
                <div className="flex-grow flex items-center justify-center">
                  <iframe
                    src={fileToView} // Pastikan ini adalah URL file PDF
                    className="w-full h-[80vh] rounded" // Atur tinggi iframe agar responsif
                    title="File Viewer"
                  />
                </div>
              </div>
            </div>
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
  );
};

export default DeviceGuidePage;
