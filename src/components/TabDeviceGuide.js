import { useState } from 'react';

const TabDeviceGuide = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(tabs)[0]);

  return (
    <div className="p-4 bg-slate-50 shadow-md rounded-md">
      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b-2 border-gray-200 mb-4">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium text-sm transition-all duration-300 ease-in-out ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-700 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.replace('-', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Konten Tab */}
        <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {tabs[activeTab].title}
            </h3>
          <div className="text-gray-600 mt-2">{tabs[activeTab].content}</div>
      </div>
    </div>
  );
};

export default TabDeviceGuide;
