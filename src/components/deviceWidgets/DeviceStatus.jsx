import React from 'react';

const DeviceStatus = ({ lastSync }) => {
  // If lastSync is a Firestore Timestamp object, convert it to a JavaScript Date object
  // If lastSync is already a Date object or undefined, this will be bypassed
  const lastSyncTime = lastSync?.toDate ? lastSync.toDate() : lastSync;

  // Check if the device is considered online
  const isOnline = lastSyncTime && (new Date() - lastSyncTime) < 3 * 60 * 1000; // 3 minutes

  return (
    <div className="flex items-center">
      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}>
        <span className="material-icons">{isOnline ? 'check' : 'close'}</span> {/* Choose icons accordingly */}
      </div>
      <p className={`ml-2 ${isOnline ? 'text-green-500' : 'text-red-500'}`}>{isOnline ? 'ONLINE' : 'OFFLINE'}</p>
    </div>
  );
};

export default DeviceStatus;
