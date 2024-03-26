import React, { useState, useEffect } from 'react';
import EnergyMonitor from '../../assets/EnergyMonitor.png';
import Device from '../../assets/Mobile.png'; 
import { ResponsiveLine } from '@nivo/line';
import { rtdb, databaseRef, onValue, query, limitToLast } from '../../firebase';
import { parseISO } from 'date-fns';
import Button from '../../components/buttons/btn';
import unpair from '../../services/updatePairing';
import { getAuth } from "firebase/auth";  
import { useDevicePairing } from '../../contexts/DevicePairingContext';
import { useToast } from '../../contexts/ToastContext';

const YourDevice = () => {
  const [chartData, setChartData] = useState([]);
  const [connected, setConnected] = useState(true);
  const { recheckPairingStatus, pairedDeviceMAC } = useDevicePairing();
  const { addToast } = useToast();

  const auth = getAuth(); 
  const user = auth.currentUser; 

  const handleUnpair = async () => {
    const deviceMAC = {pairedDeviceMAC}; // Use the actual MAC address or retrieve it from state/props
    try {
      await unpair(user.uid, deviceMAC.pairedDeviceMAC);
      recheckPairingStatus();
      addToast('Device unpaired', 'success');
    } catch (error) {
      // Handle error (already logged in updatePairing)
      addToast('Failed to unpair device', 'error');
    }
  };

  useEffect(() => {
    let debounceTimer;
    const deviceMAC = pairedDeviceMAC;
    const readingsRef = databaseRef(rtdb, `energy_data/${deviceMAC}`);
    const last20ReadingsQuery = query(readingsRef, limitToLast(20));
  
    const unsubscribe = onValue(last20ReadingsQuery, (snapshot) => {
      const readings = snapshot.val();
      if (readings) {
        const transformedData = transformReadingsToChartData(readings);
        setChartData([{ id: "energyUsage", data: transformedData }]);
  
        // Clear any previous debounce timer
        clearTimeout(debounceTimer);
  
        // Set a new debounce timer
        debounceTimer = setTimeout(() => {
          const latestReadingTime = Math.max(...Object.values(readings).map(r => new Date(r.timestamp).getTime()));
          const oneMinuteAgo = Date.now() - 60000;
          setConnected(latestReadingTime > oneMinuteAgo);
        }, 1000); // Adjust debounce time as needed
      } else {
        setChartData([]);
        setConnected(false);
      }
    });
  
    // Cleanup function
    return () => {
      unsubscribe();
      clearTimeout(debounceTimer);
    };
  }, []);
  
   
  return (
  <>
    <main className="flex-1 w-full h-min rounded-3xs bg-bg-main flex flex-col items-start justify-start relative">
        <section className="p-5 pt-16 sm:p-10 flex flex-col items-start justify-start z-[1] text-text-colour-primary gap-3">
          <h1 className="text-4xl w-full m-0">
            Your Device
          </h1>
          <h3 className="m-0 text-lg font-normal text-text-colour-secondary">
            Monitoring your electricty usage 24/7
          </h3>
          <Button
          onClick={handleUnpair}
          className="bg-red-500 text-white text-base px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          colour="red"
        >
          Unpair Device
        </Button>
        </section>
      </main>
      <section className="p-5 sm:p-10 flex flex-col items-start justify- z-[1] text-text-colour-primary gap-8">
        <div className='w-full h-min'>
          <div className='w-full h-min flex flex-row items-start items-center justify-between gap-3 relative'>

            <div className="relative w-1/4 h-min align-middle flex justify-around ">
              <div className={`absolute inset-0 w-full h-full opacity-100 ${connected ? 'animate-ping bg-svg' : ''}`}></div>
              <img src={EnergyMonitor} alt='Energy Monitor' className='relative z-10 w-3/4 h-auto' />
            </div>

            <div className='w-1/2 h-min flex flex-row items-center justify-center gap-1'>
              <p className={`m-0 text-xl font-normal ${connected ? 'text-green' : 'text-red'}`}>
                {connected ? 'CONNECTED' : 'DISCONNECTED'}
              </p>
              {connected && <span className="material-symbols-outlined text-green ">check</span>}
            </div>


            <div className="relative w-1/4 h-min align-middle flex justify-around ">
              <div className={`absolute inset-0 w-full h-full opacity-100 ${connected ? 'animate-ping bg-svg' : ''}`}></div>
              <img src={Device} alt='Phone' className='relative z-10 w-2/3 h-auto' />
            </div>

          </div>
        </div>
        <div className='w-full h-min pt-5'>
          <h1 className="text-lg w-full m-0">
            Paired to: CARBON-WATCHER-v1.0{pairedDeviceMAC}
          </h1>
          <h3 className="mt-2 text-base font-normal text-text-colour-secondary">
            Last Sync: 12:00 12/12/2021
          </h3>
        </div>
        <div className='w-full h-min sm:pt-5 overflow-hidden'>
          <div style={{ height: "400px", width:"80vw"}}>
          <ResponsiveLine
            tooltip={() => null}
            data={chartData.map(series => ({
              ...series,
              color: "var(--text-colour-secondary)" // Assuming you can control line color at the data level
            }))}
            margin={{ top: 10, right: 0, bottom: 10, left: 45 }}
            curve="monotoneX"
            xScale={{ type: "time", format: "%Y-%m-%dT%H:%M:%S", precision: "second" }}
            xFormat="time:%Y-%m-%d"
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            axisLeft={{
              legendOffset: -40,
              legendPosition: "middle",
              // Apply the CSS variable for text color directly in the style prop for dynamic styling
              tickColor: "var(--text-colour-primary)",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendColor: "var(--text-colour-primary)",
            }}
            axisBottom={null} // Remove the X axis
            colors="var(--text-colour-secondary)" // Use CSS variables for line colors
            pointSize={0}
            pointBorderWidth={0}
            useMesh={true}
            enableSlices={false}
            motionStiffness={500}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fill: "var(--text-colour-primary)", // Change all text to use the CSS variable
                    fontSize: "16px" // Make text bigger
                  }
                },
                legend: {
                  text: {
                    fill: "var(--text-colour-primary)", // Use the CSS variable for legend text
                    fontSize: "16px" // Make legend text bigger
                  }
                }
              },
              grid: {
                line: {
                  stroke: "var(--text-colour-secondary)", // Match the grid lines to the secondary text color
                  strokeWidth: 1
                }
              }
            }}
            
          />



          </div>
        </div>
      </section>
    </>
 )
};

// Step 4: Safe parseISO wrapper
const safeParseISO = (dateString) => {
  if (typeof dateString === 'string' && dateString.trim() !== '') {
    try {
      return parseISO(dateString);
    } catch (error) {
      console.error('Error parsing date:', dateString, error);
      return null;
    }
  } else {
    console.warn('Invalid date string:', dateString);
    return null;
  }
};

const transformReadingsToChartData = (readings) => {
  return Object.values(readings)
    // Step 2: Enhanced filtering
    .filter(reading => typeof reading.timestamp === 'string' && reading.timestamp.trim() !== '')
    .map(reading => ({
      x: safeParseISO(reading.timestamp), // Use the safe parsing function
      y: reading.kWh
    }))
    .filter(data => data.x !== null); // Filter out any entries that couldn't be parsed
};




export default YourDevice;
