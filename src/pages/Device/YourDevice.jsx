import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import DeviceDetails from '../../components/deviceWidgets/DeviceDetails';
import StatusIndicator from '../../components/deviceWidgets/StatusIndicator';
import ConnectedUsers from '../../components/deviceWidgets/ConnectedUsers';
import fetchPairedDeviceMacAddress from '../../services/getUserDevice';
import fetchMostRecentReadingTimestamp from '../../services/getMostRecentReadingTime';

const YourDevice = () => {
  const [macAddress, setMacAddress] = useState('');
  const [lastSync, setLastSync] = useState(null);
  const { currentUser } = useAuth();

  // Get the users device mac address
  useEffect(() => {
    if (currentUser) {
        fetchPairedDeviceMacAddress(currentUser.uid)
        .then((mac) => {
          if (mac) {
            setMacAddress(mac);
          }
        })
        .catch((error) => {
          console.error('Error fetching device MAC address:', error);
          // Handle the error accordingly
        });
    }
  }, [currentUser]);


  return (
    <div className="bg-black text-white min-h-screen p-4 flex flex-col items-center">
      <div className="flex flex-wrap justify-center items-center gap-4">
        {macAddress && <DeviceDetails macAddress={macAddress} />}
      </div>
    </div>
  );
};

export default YourDevice;
