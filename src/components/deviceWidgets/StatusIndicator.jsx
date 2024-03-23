import React from 'react';
import deviceImage from '../../assets/EnergyMonitor.png'; // Adjust the path as necessary
import mobileImage from '../../assets/Mobile.png'; // Adjust the path as necessary

const StatusIndicator = ({ isOnline }) => {
  const statusClasses = isOnline
    ? "text-green-500" // Online status
    : "text-red-500";  // Offline status

  const statusText = isOnline ? 'ONLINE' : 'OFFLINE';
  
  return (
    <div className="flex justify-around items-center w-full">

      <img src={deviceImage} alt="Energy Monitor" className="w-1/6 md:block" />

      <div className={`flex items-center justify-center text-2xl ${statusClasses} w-full `}>
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
          {isOnline ? (
            <path d="M5 13l4 4L19 7" />
          ) : (
            <path d="M6 18L18 6M6 6l12 12" />
          )}
        </svg>
        <span className="ml-2 uppercase font-bold">{statusText}</span>
      </div>

      <img src={mobileImage} alt="Mobile" className="w-1/6 md:block" />

    </div>
  );
};

export default StatusIndicator;
