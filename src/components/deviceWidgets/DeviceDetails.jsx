import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const DeviceDetails = ({ macAddress }) => {
  const [deviceDetails, setDeviceDetails] = useState({ name: '', lastSync: null });

  useEffect(() => {
    const fetchDeviceDetails = async () => {
      const deviceRef = doc(db, 'user-device-pairings', macAddress);
      const deviceDoc = await getDoc(deviceRef);

      if (deviceDoc.exists()) {
        setDeviceDetails(deviceDoc.data());
      }
    };

    fetchDeviceDetails();
  }, [macAddress]);

  const lastSyncTime = deviceDetails.lastSync?.toDate(); // Assuming lastSync is a Firestore timestamp
  const formattedLastSync = lastSyncTime ? lastSyncTime.toLocaleTimeString() : 'Unavailable';

  return (
    <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">Your Energy Monitor</h1>
        <p className="text-center mb-2">{macAddress}</p>

        

        
    </div>
  );
};

export default DeviceDetails;
