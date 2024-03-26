import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { useToast } from '../../contexts/ToastContext';
import { db } from '../../firebase'; // Adjust this path to your Firebase config initialization
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useDevicePairing } from '../../contexts/DevicePairingContext';

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
    <div className="container mx-auto p-4">
      <form onSubmit={handleManualEntry} className="space-y-4">
        <input
          type="text"
          placeholder="Enter MAC Address"
          value={macAddress}
          onChange={(e) => setMacAddress(e.target.value)}
          className="input text-lg w-full px-4 py-2 border-gray-300 rounded shadow-sm focus:ring focus:ring-opacity-50"
        />
        <button type="submit" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Pair Device
        </button>
      </form>

      {/* QR Code scanning functionality */}
    </div>
  );
};

export default PairDevice;
