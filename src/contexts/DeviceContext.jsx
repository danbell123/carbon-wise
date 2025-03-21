import React, { createContext, useContext, useEffect, useState } from 'react';
import { rtdb, databaseRef, onValue, query, limitToLast } from '../firebase';
import { getFirestore, collection, getDocs, getDoc, doc, setDoc, deleteDoc, FirestoreError } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useToast } from '../contexts/ToastContext';  

// Define the context
const DeviceContext = createContext();

// Define a custom hook for easy context consumption
export const useDevice = () => useContext(DeviceContext);

export const DeviceProvider = ({ children }) => {
    const auth = getAuth();
    const firestore = getFirestore();
    const currentUser = auth.currentUser;

    const { addToast } = useToast();

    const [deviceState, setDeviceState] = useState({
        pairedTo: null,
        isDisconnected: true,
        latestData: {
            kWh: null,
            timestamp: null
        }
    });

    const pairDevice = async (macAddress) => {
        try {
            const firestore = getFirestore();
            const deviceRef = doc(firestore, 'user-device-pairings', macAddress);
            
            // Check if the device document exists
            const docSnap = await getDoc(deviceRef);
            if (!docSnap.exists()) {
                throw new Error("Device with this MAC address does not exist.");
            }
    
            const usersPairedRef = collection(deviceRef, 'usersPaired');
    
            // Add user to the device's 'usersPaired' subcollection
            const userDocRef = doc(usersPairedRef, currentUser.uid);
            await setDoc(userDocRef, {
                pairedOn: new Date(), 
                userID: currentUser.uid
            });
    
            // After successful pairing, update the device context
            setDeviceState((prevState) => ({
                ...prevState,
                pairedTo: macAddress,
                isDisconnected: false,
                latestData: {
                    kWh: null, 
                    timestamp: null,
                },
            }));

            addToast('Device paired successfully', 'success');
    
        } catch (error) {
            // Handle specific Firestore errors or generic errors
            if (error instanceof FirestoreError) {
                console.error("Firestore error during device pairing:", error.message);
            } else {
                console.error("Error pairing device:", error.message);
            }
            addToast(`Failed to pair device: ${error.message}`, 'error');
        }
    };

    const unpairDevice = async (macAddress) => {
        try {
            const userDocRef = doc(firestore, 'user-device-pairings', macAddress, 'usersPaired', currentUser.uid);
            await deleteDoc(userDocRef);
            // After successful pairing, update the device context
            setDeviceState((prevState) => ({
                ...prevState,
                pairedTo: null,
                isDisconnected: true,
                latestData: {
                    kWh: null, 
                    timestamp: null,
                },
            }));
            return true; // Indicate success
        } catch (error) {
            console.error('Error removing the user from the device:', error);
            throw error; // Allow the caller to handle errors
        }
    };

    useEffect(() => {
        let disconnectTimer = null;
        let unsubscribeFromAuthStateChanged = null;
        let unsubscribeFromRealtimeListener = null;

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
                return deviceDoc.id;
              }
            }
            return null;
          };

        const setupRealtimeListener = (pairedDeviceMAC) => {
            if (!pairedDeviceMAC) {
                setDeviceState(prevState => ({
                    ...prevState,
                    pairedTo: null,
                    isDisconnected: true,
                    latestData: { kWh: null, timestamp: null }
                }));
                return () => {};
            }

            const readingsRef = databaseRef(rtdb, `energy_data/${pairedDeviceMAC}`);
            const readingsQuery = query(readingsRef, limitToLast(1));

            return onValue(readingsQuery, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const lastEntry = Object.values(data)[0];

                    setDeviceState({
                        pairedTo: pairedDeviceMAC,
                        isDisconnected: false,
                        latestData: {
                            kWh: lastEntry.kWh,
                            timestamp: lastEntry.timestamp
                        }
                    });

                    {/* Disconnecteded after 70sec. Should be sending data every 60sec */}
                    clearTimeout(disconnectTimer);
                    disconnectTimer = setTimeout(() => {
                        setDeviceState(prevState => ({...prevState, isDisconnected: true}));
                        addToast(`Device Disconnected`, 'error');
                    }, 70000);
                }
            });
        };

        unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
            if (user) {
                checkUserDevicePairing(user.uid).then(macAddress => {
                    unsubscribeFromRealtimeListener = setupRealtimeListener(macAddress);
                }).catch(error => {
                    console.error("Error checking user-device pairing:", error);
                });
            } else {
                setDeviceState(prevState => ({
                    ...prevState,
                    pairedTo: null,
                    isDisconnected: true,
                    latestData: { kWh: null, timestamp: null }
                }));
            }
        });

        // Cleanup function
        return () => {
            unsubscribeFromAuthStateChanged && unsubscribeFromAuthStateChanged();
            unsubscribeFromRealtimeListener && unsubscribeFromRealtimeListener();
            clearTimeout(disconnectTimer);
        };
    }, [deviceState.pairedTo]); 

    return (
        <DeviceContext.Provider value={{ ...deviceState, pairDevice, unpairDevice }}>
            {children}
        </DeviceContext.Provider>
    );
};