import React, { useState, useEffect } from 'react';
import fetchMostRecentReadingTimestamp from '../../services/getMostRecentReadingTime';
import StatusIndicator from './StatusIndicator';

const DeviceDetails = ({ macAddress }) => {
  const [deviceLastSync, setDeviceLastSync] = useState(null);
  const [isDeviceOnline, setIsDeviceOnline] = useState(false);

  useEffect(() => {
    if (macAddress) {
      fetchMostRecentReadingTimestamp(macAddress)
        .then((timestamp) => {
          setDeviceLastSync(timestamp);
          // Convert timestamp to Date object
          const lastSyncDate = new Date(timestamp);
          const currentTime = new Date();
          const threeMinutesAgo = new Date(currentTime.getTime() - 3 * 60000);
          
          // Check if the last sync was within the last 3 minutes
          setIsDeviceOnline(lastSyncDate > threeMinutesAgo);
        })
        .catch((error) => {
          console.error('Error fetching most recent reading timestamp:', error);
          // Handle the error accordingly
        });
    }
  }, [macAddress]);

  // Define text and color based on device status
  const statusText = isDeviceOnline ? 'Online' : 'Offline';
  const statusColor = isDeviceOnline ? 'text-green-500' : 'text-red-500';

  return (
    <>
      <div className="flex flex-row justify-start w-full pb-10">
        <div className="flex flex-col justify-start w-1/2">
          <h1 className="text-4xl font-bold mb-6">Your Energy Monitor</h1>
        </div>
        <div className="flex flex-col justify-end w-1/2">
          <p className="text-right mb-2">Your Device: {macAddress}</p>
          <p className={`text-right ${statusColor}`}>Device Status: {statusText}</p>
          <p className="text-right">Last Sync: {deviceLastSync ? new Date(deviceLastSync).toLocaleString() : 'No data available'}</p>
        </div>
      </div>
      <div className="flex flex-row justify-start w-full">
        <StatusIndicator isOnline={isDeviceOnline} />
      </div>
    </>
  );
};

export default DeviceDetails;
