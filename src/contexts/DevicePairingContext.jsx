import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, query, getDocs, getFirestore } from 'firebase/firestore';

const DevicePairingContext = createContext();

export const useDevicePairing = () => useContext(DevicePairingContext);

export const DevicePairingProvider = ({ children }) => {
  const [isPaired, setIsPaired] = useState(false);
  const [pairedDeviceMAC, setPairedDeviceMAC] = useState(''); // State to store the paired device's MAC address
  const [isLoading, setIsLoading] = useState(true);

  const checkUserDevicePairing = async (uid) => {
    const firestore = getFirestore();
    const devicesCollectionRef = collection(firestore, 'user-device-pairings');
    const devicesQuery = query(devicesCollectionRef);
    const querySnapshot = await getDocs(devicesQuery);

    for (const deviceDoc of querySnapshot.docs) {
      const usersPairedRef = collection(deviceDoc.ref, 'usersPaired');
      const usersPairedSnapshot = await getDocs(usersPairedRef);

      const userIsPaired = usersPairedSnapshot.docs.some(userDoc => userDoc.id === uid);
      if (userIsPaired) {
        console.log(`User ${uid} is paired with device ${deviceDoc.id}`);
        return { isPaired: true, macAddress: deviceDoc.id }; // Return both pairing status and MAC address
      }
    }
    console.log(`User ${uid} is not paired with any device`);
    return { isPaired: false, macAddress: '' }; // Return false and empty string if not paired
  };

  const recheckPairingStatus = async () => {
    console.log('Rechecking pairing status...');
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setIsLoading(true);
      const { isPaired: isPairedResult, macAddress } = await checkUserDevicePairing(user.uid);
      console.log('Pairing status rechecked:', isPairedResult, 'MAC:', macAddress);
      setIsPaired(isPairedResult);
      setPairedDeviceMAC(macAddress); // Update the MAC address state
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoading(true);
        const { isPaired: isPairedResult, macAddress } = await checkUserDevicePairing(user.uid);
        setIsPaired(isPairedResult);
        setPairedDeviceMAC(macAddress); // Update state with MAC address
        setIsLoading(false);
      } else {
        setIsPaired(false);
        setPairedDeviceMAC(''); // Reset MAC address state
        setIsLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <DevicePairingContext.Provider value={{ isPaired, pairedDeviceMAC, isLoading, recheckPairingStatus }}>
      {children}
    </DevicePairingContext.Provider>
  );
};
