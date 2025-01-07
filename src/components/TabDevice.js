"use client";

const TabDevice = ({ activeTab, setActiveTab }) => {
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex border-b mt-4">
      <button
        className={`py-2 px-4 ${
          activeTab === "production" ? "border-b-2 border-blue-500" : "text-gray-800"
        }`}
        onClick={() => handleTabChange("production")}
      >
        Production
      </button>
      <button
        className={`py-2 px-4 ${
          activeTab === "installation" ? "border-b-2 border-blue-500" : "text-gray-800"
        }`}
        onClick={() => handleTabChange("installation")}
      >
        Installation
      </button>
      <button
        className={`py-2 px-4 ${
          activeTab === "maintenance" ? "border-b-2 border-blue-500" : "text-gray-800"
        }`}
        onClick={() => handleTabChange("maintenance")}
      >
        Maintenance
      </button>
      <button
        className={`py-2 px-4 ${
          activeTab === "history" ? "border-b-2 border-blue-500" : "text-gray-800"
        }`}
        onClick={() => handleTabChange("history")}
      >
        History
      </button>
    </div>
  );
};

export default TabDevice;