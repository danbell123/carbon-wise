import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import DeviceDetails from '../../components/deviceWidgets/DeviceDetails';
import DeviceStatus from '../../components/deviceWidgets/DeviceStatus';
import ConnectedUsers from '../../components/deviceWidgets/ConnectedUsers';
import fetchPairedDeviceMacAddress from '../../services/getUserDevice';
import fetchMostRecentReadingTimestamp from '../../services/getMostRecentReadingTime';

const YourDevice = () => {
  const [macAddress, setMacAddress] = useState('');
  const [lastSync, setLastSync] = useState(null);
  const { currentUser } = useAuth();

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

  useEffect(() => {
    // Example usage
        (async () => {
            const timestamp = await fetchMostRecentReadingTimestamp(macAddress);
            console.log('Most recent reading timestamp:', timestamp);
        })();
    }, [macAddress]);  

  return (
    <div className="bg-black text-white min-h-screen p-4 flex flex-col items-center">

      <div className="flex flex-wrap justify-center items-center gap-4">
        {macAddress && <DeviceDetails macAddress={macAddress} />}
        {lastSync && <DeviceStatus lastSync={lastSync} />}
      </div>
      {macAddress && <ConnectedUsers macAddress={macAddress} />}
    </div>
  );
};

export default YourDevice;
