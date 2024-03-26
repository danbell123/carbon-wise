import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, query, getDocs, getFirestore } from 'firebase/firestore';

const DevicePairingContext = createContext();

export const useDevicePairing = () => useContext(DevicePairingContext);

export const DevicePairingProvider = ({ children }) => {
  const [isPaired, setIsPaired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Moved inside DevicePairingProvider to access relevant states and functions
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
        return true; // User is paired with at least one device
      }
    }
    console.log(`User ${uid} is not paired with any device`);
    return false; // User is not paired with any device
  };

  // Also moved inside DevicePairingProvider
  const recheckPairingStatus = async () => {
    console.log('Rechecking pairing status...');
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setIsLoading(true);
      const isPairedResult = await checkUserDevicePairing(user.uid);
      console.log('Pairing status rechecked:', isPairedResult);
      setIsPaired(isPairedResult);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoading(true);
        checkUserDevicePairing(user.uid).then(isPairedResult => {
          setIsPaired(isPairedResult);
          setIsLoading(false);
        });
      } else {
        setIsPaired(false);
        setIsLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <DevicePairingContext.Provider value={{ isPaired, isLoading, recheckPairingStatus }}>
      {children}
    </DevicePairingContext.Provider>
  );
};
