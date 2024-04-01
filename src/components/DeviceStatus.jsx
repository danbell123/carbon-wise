import React, { memo } from 'react';
import { useDevice } from '../contexts/DeviceContext';

// A memoized component for displaying the latest data
// This component only rerenders when `kWh` or `timestamp` changes
const DeviceLatestData = memo(({ kWh, timestamp }) => {
  return (
    <div>
      <h4>Last Reading:</h4>
      <p>Value: {kWh} kWh</p>
      <p>Last Updated: {timestamp}</p>
    </div>
  );
}, (prevProps, nextProps) => {
  // Only rerender if kWh or timestamp has changed
  return prevProps.kWh === nextProps.kWh && prevProps.timestamp === nextProps.timestamp;
});

const DeviceStatus = () => {
  const { pairedTo, isDisconnected, latestData } = useDevice();

  return (
    <div className='text-text-colour-primary'>
      <h2>Device Status</h2>
      {pairedTo ? (
        <div>
          <p>Device Paired: Yes</p>
          <p>Paired To: {pairedTo}</p>
          <p>Status: {isDisconnected ? 'Disconnected' : 'Connected'}</p>
          <DeviceLatestData kWh={latestData.kWh} timestamp={latestData.timestamp} />
        </div>
      ) : (
        <p>No device paired.</p>
      )}
    </div>
  );
};

export default DeviceStatus;
