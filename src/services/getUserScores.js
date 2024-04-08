import { getFirestore, doc, getDoc } from 'firebase/firestore';
import findUserDeviceMacAddress from './getUserDevice'; // Adjust the path as necessary

// Async function to get the user's score based on a date
async function getUserScore(userId, date) {
  const firestore = getFirestore();

  // First, find the MAC address for the device the user is paired with
  const deviceMacAddress = await findUserDeviceMacAddress(userId);
  if (!deviceMacAddress) {
    return null; // Early return if no device is paired
  }

    // Access the dailyReadings collection for the specified date, then navigate to the device subcollection/document
    const deviceReadingsRef = doc(firestore, `dailyReadings/${date}/deviceID/${deviceMacAddress}`);
    const deviceReadingsDoc = await getDoc(deviceReadingsRef);

    if (!deviceReadingsDoc.exists()) {
    return null; // Early return if the document for the user's device doesn't exist
    }

    // Assuming 'score' is a field inside the device's document
    const userScore = deviceReadingsDoc.data().score;
    return userScore;

}

export default getUserScore;
