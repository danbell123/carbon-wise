import React, { useEffect, useState, memo } from 'react';
import UsageVisualization from '../dataVis/UsageVisualization';
import formatDateToNow from '../../services/readableDateTime';
import Button from '../buttons/btn';
import BarLoader from '../loader/barLoader';
import { useDevice } from '../../contexts/DeviceContext';

const UsageContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { pairedTo, isDisconnected, latestData } = useDevice();

  if (pairedTo == null) {
    return (
      <div className="h-full p-8 px-14 bg-error-bg box-border backdrop-blur-sm w-full rounded-xl shadow-md flex flex-col items-center justify-center gap-4">
        <span className="!text-7xl material-symbols-outlined text-text-colour-primary">warning</span>
        <p className='text-text-colour-primary text-center text-xl'>No Device Paired</p>
        <p className='text-text-colour-primary text-center text-sm'>Pair with a device to monitor your usage.</p>
        <Button className="bg-secondary-colour hover:bg-secondary-colour-hover text-white font-bold py-2 px-4 rounded">
          Pair Device
        </Button>
      </div>
    );
  }

  if (isDisconnected) {
    return (
      <div className="h-full p-8 px-14 bg-error-bg box-border backdrop-blur-sm w-full rounded-xl shadow-md flex flex-col items-center justify-center gap-4">
        <span className="!text-7xl material-symbols-outlined text-text-colour-primary">warning</span>
        <p className='text-text-colour-primary text-center'>Your device is disconnected. Please check your device.</p>
        <Button className="mt-4 bg-secondary-colour hover:bg-secondary-colour-hover text-white font-bold py-2 px-4 rounded">
          More Details
        </Button>
        <div className='flex flex-col gap-0'>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full p-5 bg-bg-main-transparent box-border border border-white backdrop-blur-sm w-full rounded-xl shadow-md flex flex-col items-center justify-center">
        <BarLoader />
        <p className='text-text-colour-secondary text-center'>Loading your usage data...</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-bg-main-transparent box-border border border-white backdrop-blur-sm w-full p-5 rounded-xl shadow-md flex flex-col justify-between items-center gap-4">
      <h1 className="text-2xl font-semibold text-text-colour-primary self-start w-full">Your Current Usage</h1>
      
      {/* Spacer div */}
      <div className="flex-grow"></div>
  
      <DeviceLatestData kWh={latestData.kWh} timestamp={latestData.timestamp} />
      
      {/* Another spacer div to ensure visualization stays centered */}
      <div className="flex-grow"></div>
  
      <Button className="bg-secondary-colour hover:bg-secondary-colour-hover text-white font-bold py-2 px-4 rounded self-start w-full">
        More Details
      </Button>
    </div>
  );
  
  
};

const DeviceLatestData = memo(({ kWh, timestamp }) => {
  // State to keep track of the last known kWh value
  const [lastKnownKWh, setLastKnownKWh] = useState(kWh);

  // Update lastKnownKWh only when kWh changes and is not undefined
  useEffect(() => {
    if (kWh !== undefined) {
      setLastKnownKWh(kWh);
    }
  }, [kWh]);

  return (
    <>
      <div>
        {/* Always render UsageVisualization but use lastKnownKWh to avoid disappearance */}
        <UsageVisualization value={lastKnownKWh || 0} maxValue={10} />
      </div>
    </>
  );
}, (prevProps, nextProps) => {
  // Rerender only if kWh or timestamp has changed
  return prevProps.kWh === nextProps.kWh && prevProps.timestamp === nextProps.timestamp;
});

export default UsageContainer;
