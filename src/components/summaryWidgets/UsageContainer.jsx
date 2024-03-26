import React, { useEffect, useState } from 'react';
import UsageVisualization from './UsageVisualization';
import { rtdb, databaseRef, onValue } from '../../firebase';
import formatDateToNow from '../../services/readableDateTime';
import Button from '../buttons/btn'
import BarLoader from '../loader/barLoader'
import { useDevicePairing } from '../../contexts/DevicePairingContext';


const UsageContainer = () => {
  const [value, setValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const { isPaired, pairedDeviceMAC, recheckPairingStatus } = useDevicePairing();

  useEffect(() => {
    const readingsRef = databaseRef(rtdb, `energy_data/${pairedDeviceMAC}`);
    setIsLoading(true); // Set loading to true when starting to fetch data
  
    const unsubscribeReadings = onValue(readingsRef, (snapshot) => {
      const readings = snapshot.val();
      let latestValue = 0;
      let highestValue = 0;
      let latestTimestamp = '';
  
      if (readings) {
        const readingsArray = Object.values(readings).filter(reading => reading.timestamp); // Ensure only items with timestamps are processed
        
        if (readingsArray.length > 0) {
          readingsArray.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  
          latestValue = readingsArray[0].kWh || 0; // Most recent reading's kWh
          highestValue = Math.max(...readingsArray.map(reading => parseFloat(reading.kWh))); // Highest kWh value
          latestTimestamp = readingsArray[0].timestamp; // Timestamp of the most recent reading
        }
      }
  
      setValue(parseFloat(latestValue));
      setMaxValue(parseFloat(highestValue));
      setLastUpdated(latestTimestamp);
      setIsLoading(false); // Set loading to false after fetching data
    });
  
    // Cleanup function
    return () => unsubscribeReadings();
  }, [pairedDeviceMAC]);


  // Format timestamp for display or show loading message
  const formattedLastUpdated = lastUpdated ? formatDateToNow(lastUpdated) : 'Loading...';

  if (isLoading) {
    // Render loading state if data is still being fetched
    return (
      <div className="h-full p-5 bg-bg-main-transparent box-border border border-white backdrop-blur-sm w-full p-5 rounded-xl shadow-md flex flex-col items-center justify-center">
        <BarLoader />
        <p className='text-text-colour-secondary text-center'>Loading your usage data...</p>
      </div>
    );
  }

  // Render component once data is loaded
  return (
    <div className="h-full bg-bg-main-transparent box-border border border-white backdrop-blur-sm w-full p-5 rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold m-0 text-text-colour-primary">Your Current Usage</h1>
      <p className="text-sm font-light text-text-colour-secondary">Last Updated: {formattedLastUpdated}</p>
      <UsageVisualization value={value} maxValue={maxValue} />
      <Button className="mt-4 bg-secondary-colour hover:bg-secondary-colour-hover text-white font-bold py-2 px-4 rounded">
        More Details
      </Button>
    </div>
  );
};

export default UsageContainer;
