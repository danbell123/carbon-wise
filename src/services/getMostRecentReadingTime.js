import { query, orderByChild, limitToLast, get } from 'firebase/database';
import { rtdb, databaseRef } from '../firebase'; 

/**
 * Fetches the most recent reading timestamp for a given device MAC address.
 * @param {string} macAddress The MAC address of the device.
 * @return {Promise<string|null>} The timestamp of the most recent reading if found, null otherwise.
 */
const fetchMostRecentReadingTimestamp = async (macAddress) => {
  const readingsRef = databaseRef(rtdb, `energy_data/${macAddress}/readings`);

  // Create a query to get the most recent reading based on timestamp
  const recentReadingQuery = query(readingsRef, orderByChild('timestamp'), limitToLast(1));

  try {
    const snapshot = await get(recentReadingQuery);
    if (snapshot.exists() && snapshot.hasChildren()) {
      const mostRecentReadingKey = Object.keys(snapshot.val())[0];
      const mostRecentReading = snapshot.val()[mostRecentReadingKey];
      return mostRecentReading.timestamp;
    } else {
      console.log('No readings available for device:', macAddress);
      return null;
    }
  } catch (error) {
    console.error('Error fetching most recent reading timestamp:', error);
    throw error;
  }
};

export default fetchMostRecentReadingTimestamp;

