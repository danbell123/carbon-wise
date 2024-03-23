import { rtdb, databaseRef } from '../firebase'; 
import { query, orderByChild, limitToLast, get } from 'firebase/database';

const fetchMostRecentReadingTimestamp = async (macAddress) => {
  console.log('Attempting to fetch timestamp for MAC:', macAddress);
  const readingsRef = databaseRef(rtdb, `energy_data/${macAddress}`);
  const recentReadingQuery = query(readingsRef, orderByChild('timestamp'), limitToLast(1));

  try {
    const snapshot = await get(recentReadingQuery);
    if (snapshot.exists() && snapshot.hasChildren()) {
      const readings = snapshot.val();
      const mostRecentReadingKey = Object.keys(readings).sort((a, b) => readings[b].timestamp - readings[a].timestamp)[0];
      const mostRecentReading = readings[mostRecentReadingKey];
      console.log('Most recent reading:', mostRecentReading);
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
