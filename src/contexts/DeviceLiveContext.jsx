// DeviceLiveContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { rtdb, databaseRef, onValue, query, limitToLast } from '../firebase';
import { useDevicePairing } from './DevicePairingContext';

const DeviceLiveContext = createContext();

export const useDeviceLive = () => useContext(DeviceLiveContext);

export const DeviceLiveProvider = ({ children }) => {
  const { pairedDeviceMAC } = useDevicePairing();
  const [isDeviceLive, setIsDeviceLive] = useState(false);
  const [latestData, setLatestData] = useState(null); // Use an appropriate initial state

  useEffect(() => {
    if (pairedDeviceMAC) {
      const readingsRef = databaseRef(rtdb, `energy_data/${pairedDeviceMAC}`);
      const lastReadingQuery = query(readingsRef, limitToLast(1));

      const unsubscribe = onValue(lastReadingQuery, (snapshot) => {
        const reading = snapshot.val();
        if (reading) {
          const readingEntries = Object.entries(reading);
          if (readingEntries.length > 0) {
            // Assuming the latest data is in readingEntries[0][1]
            const latestTimestamp = readingEntries[0][1].timestamp;
            const latestReadingData = readingEntries[0][1]; // For example
            const isLive = Date.now() - new Date(latestTimestamp).getTime() < 60000; // Less than a minute ago
            setIsDeviceLive(isLive);
            setLatestData(latestReadingData); // Update the latest data state
          } else {
            setIsDeviceLive(false);
            setLatestData(null);
          }
        } else {
          setIsDeviceLive(false);
          setLatestData(null);
        }
      });      

      // Cleanup function
      return () => unsubscribe();
    }
  }, [pairedDeviceMAC]);

  return (
    <DeviceLiveContext.Provider value={{ isDeviceLive, latestData }}>
      {children}
    </DeviceLiveContext.Provider>
  );  
};
