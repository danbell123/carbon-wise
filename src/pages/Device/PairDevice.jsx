import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { useToast } from '../../contexts/ToastContext';
import { db } from '../../firebase'; // Adjust this path to your Firebase config initialization
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useDevicePairing } from '../../contexts/DevicePairingContext';
import Button from '../../components/buttons/btn';

const PairDevice = () => {
  const [macAddress, setMacAddress] = useState('');
  const { currentUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { recheckPairingStatus } = useDevicePairing();

  // Handle manual MAC address entry
  const handleManualEntry = async (e) => {
    e.preventDefault();

    // Implement your MAC address validation logic here

    // Check if the MAC address is already in the database
    try {
      const deviceRef = doc(db, 'user-device-pairings', macAddress);
      const usersPairedRef = collection(deviceRef, 'usersPaired');
      const usersPairedSnap = await getDocs(usersPairedRef);

      // Check if current user is already paired
      const isPaired = usersPairedSnap.docs.some(doc => doc.id === currentUser.uid);
      if (isPaired) {
        addToast('You are already paired with this device.', 'error');
        return;
      }

      // Add user to the device's 'usersPaired' subcollection
      const userDocRef = doc(usersPairedRef, currentUser.uid);
      await setDoc(userDocRef, {
        pairedOn: new Date(), // Or any other user information you need to store
        userID: currentUser.uid
      });
      
      recheckPairingStatus(); // Call the function to update the pairing status
      addToast('Device paired successfully!', 'success');
      navigate('/your-device');
    } catch (error) {
      addToast(`Error pairing device: ${error.message}`, 'error');
    }
  };


  return (
    <main className="flex-1 w-full h-min rounded-3xs bg-bg-main flex flex-col items-start justify-start relative">
        <section className="p-5 pt-16 sm:p-10 flex flex-col items-start justify-start z-[1] text-text-colour-primary gap-3">
          <h1 className="text-4xl w-full m-0">
            Pair Your Device
          </h1>
          <h3 className="m-0 text-lg font-normal text-text-colour-secondary">
            Connect your device to start tracking energy usage
          </h3>
          <div className="container mx-auto pt-4">
            <form onSubmit={handleManualEntry} className="space-y-4">
              <input
                type="text"
                placeholder="Enter MAC Address"
                value={macAddress}
                onChange={(e) => setMacAddress(e.target.value)}
                className="input text-lg w-full px-4 py-2 border-gray-300 rounded shadow-sm focus:ring focus:ring-opacity-50"
              />
              <Button type="submit" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Pair Device
              </Button>
            </form>

            {/* QR Code scanning functionality */}
          </div>
        </section>
    </main>
  );
};

export default PairDevice;
