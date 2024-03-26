import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

// Function just handles Firestore operations
async function unpair(userId, deviceMacAddress) {
    console.log(`Attempt to remove user ${userId} from device with MAC address: ${deviceMacAddress}`);
  const firestore = getFirestore();
  try {
    const userDocRef = doc(firestore, 'user-device-pairings', deviceMacAddress, 'usersPaired', userId);
    await deleteDoc(userDocRef);
    console.log(`Successfully removed user ${userId} from device with MAC address: ${deviceMacAddress}`);
    return true; // Indicate success
  } catch (error) {
    console.error('Error removing the user from the device:', error);
    throw error; // Allow the caller to handle errors
  }
}

export default unpair;
