import { useState } from 'react';

const TabPartBook = ({ tabContent }) => {
  const [activeTab, setActiveTab] = useState('ofa');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-1 max-w-1xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex border-b-4 border-gray-300 mb-4">
        {['ofa', 'sdfms', 'mantul-grader', 'safelight'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-all duration-300 ease-in-out ${
              activeTab === tab
                ? 'bg-custom24 text-white shadow-lg border-b-4 border-custom3'
                : 'text-gray-800 hover:text-custom24 hover:border-gray-600'
            }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab.replace('-', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {/* Check if tabContent is defined before accessing its keys */}
        {tabContent && Object.keys(tabContent).map((tab) =>
          activeTab === tab ? (
            <div key={tab} className="tab-pane">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">{tabContent[tab].title}</h3>
              <div className="text-gray-800">{tabContent[tab].content}</div> {/* Ensure this is a valid React element */}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default TabPartBook;