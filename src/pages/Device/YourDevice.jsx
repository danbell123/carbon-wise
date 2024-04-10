import React from 'react';
import EnergyMonitor from '../../assets/EnergyMonitor.png';
import Device from '../../assets/Mobile.png'; 
import Button from '../../components/buttons/btn';
import { useToast } from '../../contexts/ToastContext';
import { useDevice } from '../../contexts/DeviceContext';

const YourDevice = () => {
  const { addToast } = useToast();
  const { unpairDevice, pairedTo, isDisconnected} = useDevice();

  const handleUnpair = async () => {
    try {
      await unpairDevice(pairedTo);
      addToast('Device unpaired successfully', 'success');
    } catch (error) {
      // Handle error (already logged in updatePairing)
      addToast('Failed to unpair device', 'error');
    }
  };
   
  return (
  <>
    <main className="flex-1 w-full h-min rounded-3xs flex flex-col items-start justify-start relative">
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
              <div className={`absolute inset-0 w-full h-full opacity-100 ${!isDisconnected ? 'animate-ping bg-svg' : ''}`}></div>
              <img src={EnergyMonitor} alt='Energy Monitor' className='relative z-10 w-3/4 h-auto' />
            </div>

            <div className='w-1/2 h-min flex flex-row items-center justify-center gap-1'>
              <p className={`m-0 text-xl font-normal ${!isDisconnected ? 'text-green' : 'text-red'}`}>
                {!isDisconnected ? 'CONNECTED' : 'DISCONNECTED'}
              </p>
              {!isDisconnected && <span className="material-symbols-outlined text-green ">check</span>}
            </div>


            <div className="relative w-1/4 h-min align-middle flex justify-around ">
              <div className={`absolute inset-0 w-full h-full opacity-100 ${!isDisconnected ? 'animate-ping bg-svg' : ''}`}></div>
              <img src={Device} alt='Phone' className='relative z-10 w-2/3 h-auto' />
            </div>

          </div>
        </div>
        <div className='w-full h-min pt-5'>
          <h1 className="text-lg w-full m-0">
            Paired to: CARBON-WATCHER-v1.0{pairedTo}
          </h1>
          <h3 className="mt-2 text-base font-normal text-text-colour-secondary">
            Last Sync: 12:00 12/12/2021
          </h3>
        </div>
      </section>
    </>
 )
};





export default YourDevice;
