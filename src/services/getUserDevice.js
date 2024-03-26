import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Function to find a MAC address that a user is paired with
async function findUserDeviceMacAddress(userId) {
  const firestore = getFirestore();
  const pairingsCollection = collection(firestore, 'user-device-pairings');
  const pairedDevicesSnapshot = await getDocs(pairingsCollection);

  for (const deviceDoc of pairedDevicesSnapshot.docs) {
    const usersPairedRef = collection(deviceDoc.ref, 'usersPaired');
    const usersPairedSnapshot = await getDocs(usersPairedRef);
    
    // Search through the usersPaired subcollection for the user's ID
    const userIsPaired = usersPairedSnapshot.docs.some(userDoc => userDoc.id === userId);
    if (userIsPaired) {
      // Return the MAC address (document ID of the device)
      console.log(`User ${userId} is paired with device ${deviceDoc.id}`);
      return deviceDoc.id;
    }
  }

  console.log(`User ${userId} is not paired with any device`);  
  return null; // Return null if the user is not paired with any device
}

export default findUserDeviceMacAddress;
