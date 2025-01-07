import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DashboardBox = ({ className }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`flex flex-col bg-white border border-gray-300 shadow-md rounded-lg p-6 w-1/2 h-64 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="text-gray-600 flex flex-col">
        </div>
        <div className="ml-4">
          <Calendar
            onChange={setDate}
            value={date}
            className="calendar-small"
            style={{ width: '120px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardBox;
