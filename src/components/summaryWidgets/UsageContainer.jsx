import React, { useEffect, useState } from 'react';
import UsageVisualization from './UsageVisualization';
import { rtdb, databaseRef, onValue } from '../../firebase';
import formatDateToNow from '../../services/readableDateTime';
import Button from '../buttons/btn';
import BarLoader from '../loader/barLoader';
import { useDevicePairing } from '../../contexts/DevicePairingContext';
import { useDeviceLive } from '../../contexts/DeviceLiveContext';

const UsageContainer = () => {
  const [value, setValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isPaired, pairedDeviceMAC } = useDevicePairing();
  const { isDeviceLive } = useDeviceLive();
  const [isDisconnected, setIsDisconnected] = useState(false);

  useEffect(() => {
    let disconnectTimer;
  
    if (!isPaired || !pairedDeviceMAC) {
      setIsLoading(false);
      return;
    }
  
    setIsLoading(true);
    setIsDisconnected(false); // Assume connection until proven otherwise
  
    const readingsRef = databaseRef(rtdb, `energy_data/${pairedDeviceMAC}`);
    const unsubscribeReadings = onValue(readingsRef, (snapshot) => {
      const readings = snapshot.val();
  
      if (readings) {
        const readingsArray = Object.values(readings).filter(reading => reading.timestamp);
  
        if (readingsArray.length > 0) {
          // Assuming timestamp is a string that can be directly compared
          // If timestamps are not in a directly comparable format, convert them appropriately
          readingsArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
          const latestReading = readingsArray[0];
          const latestValue = parseFloat(latestReading.kWh) || 0;
          const highestValue = Math.max(...readingsArray.map(reading => parseFloat(reading.kWh)));
          const latestTimestamp = latestReading.timestamp;
  
          setValue(latestValue);
          setMaxValue(highestValue);
          setLastUpdated(latestTimestamp);
        }
        setIsLoading(false);
        setIsDisconnected(false);
      } else {
        // Handle case where no readings are returned
        setIsDisconnected(true);
      }
    });
  
    return () => {
      unsubscribeReadings();
      clearTimeout(disconnectTimer);
    };
  }, [pairedDeviceMAC, isPaired]);

  if (!isPaired) {
    return (
      <div className="h-full p-8 px-14 bg-error-bg box-border borde backdrop-blur-sm w-full rounded-xl shadow-md flex flex-col items-center justify-center gap-4">
        <span className="!text-7xl material-symbols-outlined text-text-colour-primary">warning</span>
        <p className='text-text-colour-primary text-center'>You are not paired to a device. Pair with a device to monitor your usage.</p>
        <Button className="mt-4 bg-secondary-colour hover:bg-secondary-colour-hover text-white font-bold py-2 px-4 rounded">
          Pair Device
        </Button>
      </div>
    );
  }

  if (isDisconnected) {
    return (
      <div className="h-full p-8 px-14 bg-error-bg box-border borde backdrop-blur-sm w-full rounded-xl shadow-md flex flex-col items-center justify-center gap-4">
        <span className="!text-7xl material-symbols-outlined text-text-colour-primary">warning</span>
        <p className='text-text-colour-primary text-center'>Your device is disconnected. Please check your device.</p>
        <Button className="mt-4 bg-secondary-colour hover:bg-secondary-colour-hover text-white font-bold py-2 px-4 rounded">
          More Details
        </Button>
        <div className='flex flex-col gap-0'>
          <p className='text-text-colour-secondary text-xs text-center mb-0'>Last Updated: {formatDateToNow(lastUpdated)}</p>
          <p className='text-text-colour-secondary text-xs text-center mt-2'>Device ID: {pairedDeviceMAC}</p>
        </div>
      </div>
    );
  }

  const formattedLastUpdated = lastUpdated ? formatDateToNow(lastUpdated) : 'Loading...';

  if (isLoading) {
    return (
      <div className="h-full p-5 bg-bg-main-transparent box-border border border-white backdrop-blur-sm w-full rounded-xl shadow-md flex flex-col items-center justify-center">
        <BarLoader />
        <p className='text-text-colour-secondary text-center'>Loading your usage data...</p>
      </div>
    );
  }

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
