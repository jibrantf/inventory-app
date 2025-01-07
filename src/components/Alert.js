import React, { useEffect, useState } from "react";

const Alert = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const alertColors = {
    success: "bg-gradient-to-r from-green-400 to-green-600 text-white",
    error: "bg-gradient-to-r from-red-400 to-red-600 text-white",
    warning: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black",
  };

  const alertIcons = {
    success: "✔️",
    error: "❌",
    warning: "⚠️",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 300);
    }, 5000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-5 right-5 w-96 p-4 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform ${
        isExiting ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
      } ${alertColors[type] || "bg-gray-500 text-white"}`}
      style={{ animation: "fadeIn 0.5s" }}
    >
      <div className="flex items-center">
        <span className="text-2xl mr-2">{alertIcons[type]}</span>
        <span className="flex-1">{message}</span>
        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(() => {
              setIsVisible(false);
              onClose();
            }, 300);
          }}
          className="ml-4 text-xl font-semibold focus:outline-none hover:text-gray-300 transition-colors duration-200"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;
