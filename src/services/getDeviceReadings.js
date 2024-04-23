import { getFirestore, collection, query, where, getDocs, doc } from 'firebase/firestore';
import { parseISO, format, eachDayOfInterval } from 'date-fns';

async function fetchDeviceReadings(deviceID, startDate, endDate) {
  const firestore = getFirestore();
  const results = [];

  // Generate each date between startDate and endDate
  const dateRange = eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate)
  });

  for (const date of dateRange) {
    const dateString = format(date, 'yyyy-MM-dd'); // Format date as yyyy-MM-dd
    const devicePath = `dailyReadings/${dateString}/deviceID/${deviceID}/readings`;

    // Query for readings within the specific deviceID on the specific date
    const readingsRef = collection(firestore, devicePath);
    const querySnapshot = await getDocs(readingsRef);

    querySnapshot.forEach(doc => {
      const data = doc.data();
      results.push({
        readingID: doc.id,
        kWh: data.kWh,
        timestamp: data.timestamp
      });
    });
  }

  return results;
}

export default fetchDeviceReadings;
