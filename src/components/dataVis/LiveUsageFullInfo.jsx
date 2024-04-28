import React, { useEffect, useState, memo } from 'react';
import UsageVisualization from '../dataVis/UsageVisualization';
import { useNavigate } from 'react-router-dom';
import Button from '../buttons/btn';
import BarLoader from '../loader/barLoader';
import { useDevice } from '../../contexts/DeviceContext';
import EnergyMonitor from '../../assets/EnergyMonitor.png';

const LiveUsageFullInfo = () => {
    const { pairedTo, isDisconnected, latestData } = useDevice();
    let navigate = useNavigate();

    if (pairedTo == null) {
      return (
        <div className="h-full glassEffect p-8 px-14 bg-error-bg box-border backdrop-blur-sm w-full rounded-xl shadow-md flex flex-col items-center justify-center gap-4">
          <span className="!text-7xl material-symbols-outlined text-text-colour-primary">warning</span>
          <p className='text-text-colour-primary text-center text-xl'>No Device Paired</p>
          <p className='text-text-colour-primary text-center text-sm'>Pair with a device to monitor your usage.</p>
          <Button colour="transparent" onClick={() => navigate('/pair-device')}>
            Pair Device
          </Button>
        </div>
      );
    }
  
    if (isDisconnected) {
      return (
        <div className="h-full xl:w-1/5 glassEffect p-8 px-14 bg-error-bg box-border backdrop-blur-sm w-full rounded-xl shadow-md flex flex-col items-center justify-center gap-4">
          <span className="!text-7xl material-symbols-outlined text-text-colour-primary">warning</span>
          <p className='text-text-colour-primary text-center'>Your device is disconnected. Please check your device.</p>
          <Button colour="transparent" onClick={() => navigate('/your-device')}>
            More Details
          </Button>
        </div>
      );
    }
  
    return (
        <div className='flex flex-col gap-4'>
            <div className="flex flex-col h-full lg:h-min glassEffect bg-bg-main-transparent p-5 rounded-xl justify-between items-center gap-4">
                <h1 className="text-xl font-semibold text-text-colour-primary self-start w-full">Live Usage</h1>
                <DeviceLatestData kWh={latestData.kWh} timestamp={latestData.timestamp} pairedTo={pairedTo} />
            </div>
            <div>
                <DeviceTable pairedTo={pairedTo} isDisconnected={isDisconnected}/>
            </div>
        </div>
    );
  };

    const DeviceTable = ({ pairedTo, isDisconnected }) => {
        return (
            <>
                <div className={`flex flex-col glassEffect rounded-xl justify-between items-center ${isDisconnected ? 'bg-redGradient' : 'bg-greenGradient'}`}>
                    <div className='flex flex-row xl:flex-col gap-4 w-full justify-between items-top xl:gap-0'>
                        <div className=' flex flex-col justify-start gap-4 p-5 xl:pb-2'>
                            <p className='text-xl font-semibold text-text-colour-primary self-start w-full'>Your Energy Monitor:</p>
                            <p className='text-text-colour-secondary text-base m-0'>Paired To: {pairedTo}</p>
                            <div className='flex flex-row gap-1'>
                                <p className={`m-0 text-base font-normal ${!isDisconnected ? 'text-green' : 'text-red'}`}>
                                    {!isDisconnected ? 'CONNECTED' : 'DISCONNECTED'}
                                </p>
                                {!isDisconnected && <span className="material-symbols-outlined text-green text-base">check</span>}
                            </div>
                        </div>
                        <div className='flex flex-col w-20 sm:w-24 p-1 xl:pb-5 xl:pl-5'>
                            <img src={EnergyMonitor} alt='Energy Monitor' className='relative h-auto' />
                        </div>
                    </div>
                </div>
            </>
        );
    };


    const DeviceLatestData = memo(({ kWh, timestamp, pairedTo }) => {
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

export default LiveUsageFullInfo;
