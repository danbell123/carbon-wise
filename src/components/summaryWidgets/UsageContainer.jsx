import React, { useEffect, useState } from 'react';
import UsageVisualization from './UsageVisualization';
import { rtdb, databaseRef, onValue } from '../../firebase';

const UsageContainer = () => {
  const [value, setValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('');
  const deviceMAC = "14d5f1ef-03b0-4546-90fd-7190128bdf1d"; // Replace with your device's MAC address

  useEffect(() => {
    const readingsRef = databaseRef(rtdb, `energy_data/${deviceMAC}`);

    const unsubscribeReadings = onValue(readingsRef, (snapshot) => {
      const readings = snapshot.val();
      let latestValue = 0;
      let highestValue = 0;
      let latestTimestamp = '';

      if (readings) {
        const readingsArray = Object.values(readings);
        
        // Sort readings by timestamp in descending order to have the most recent reading first
        readingsArray.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

        latestValue = readingsArray[0]?.kWh || 0; // Most recent reading's kWh
        highestValue = Math.max(...readingsArray.map(reading => parseFloat(reading.kWh))); // Highest kWh value
        latestTimestamp = readingsArray[0]?.timestamp || ''; // Timestamp of the most recent reading
      }

      setValue(parseFloat(latestValue));
      setMaxValue(parseFloat(highestValue));
      setLastUpdated(latestTimestamp);
    });

    // Cleanup function
    return () => unsubscribeReadings();
  }, [deviceMAC]);

  // Format timestamp for display
  const formattedLastUpdated = lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Loading...';

  return (
    <div className="bg-bg-main w-full font-rubik text-text-colour-primary p-4 rounded-lg shadow-md">
      <h1 className="text-lg font-semibold">Your Current Usage</h1>
      <p className="text-sm">Last Updated: {formattedLastUpdated}</p>
      <UsageVisualization value={value} maxValue={maxValue} />
      <button className="mt-4 bg-secondary-colour hover:bg-secondary-colour-hover text-white font-bold py-2 px-4 rounded">
        More Details
      </button>
    </div>
  );
};

export default UsageContainer;
