import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import Button from '../../components/buttons/btn';
import { useDevice } from '../../contexts/DeviceContext';


const PairDevice = () => {
  const [macAddress, setMacAddress] = useState('');
  const { pairDevice } = useDevice();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleManualEntry = async (e) => {
    e.preventDefault();
    try {
        await pairDevice(macAddress);
        navigate('/your-device');
    } catch (error) {
        addToast(`Failed to pair device: ${error.message}`, 'error');
    }
  };

  return (
    <main className="flex-1 w-full h-min rounded-3xs flex flex-col items-start justify-start relative">
        <section className="p-5 pt-16 sm:p-10 flex flex-col items-start justify-start z-[1] text-text-colour-primary gap-3">
          <h1 className="text-4xl w-full m-0">
            Pair Your Device
          </h1>
          <h3 className="m-0 text-lg font-normal text-text-colour-secondary">
            Connect your device to start tracking energy usage. Need help? Check the <a href="/help" className="text-primary-colour">help guide</a>.
          </h3>
          <div className="container mx-auto pt-4 w-full">
            <form onSubmit={handleManualEntry} className="space-y-4 flex flex-col">
              <input
                type="text"
                placeholder="Enter Device ID"
                value={macAddress}
                onChange={(e) => setMacAddress(e.target.value)}
                className="input text-lg w-4/5 px-4 py-2 text-bg-main rounded shadow-sm"
              />
              <Button type="submit" width='1/4'>
                Pair Device
              </Button>
            </form>
          </div>
        </section>
    </main>
  );
};

export default PairDevice;
