import React, { useState } from 'react';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { format, addMinutes, startOfDay, endOfDay } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const GenerateReadings = () => {
  const [status, setStatus] = useState('');

  const generateReadingsForDay = async () => {
    const firestore = getFirestore();
    const deviceID = 'abc'; // Define the device ID
    const today = new Date(); // Using today's date
    const startDate = startOfDay(today);
    const endDate = endOfDay(today);

    let currentTime = startDate;
    setStatus('Generating readings...');

    while (currentTime <= endDate) {
      const timestamp = format(currentTime, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
      const readingID = uuidv4(); // Generate a random ID for the reading
      const kWh = Math.random() + 1; // Generate a random kWh value between 1 and 2
      const devicePath = `dailyReadings/${format(currentTime, 'yyyy-MM-dd')}/deviceID/${deviceID}/readings`;

      const readingsRef = doc(collection(firestore, devicePath), readingID);
      
      await setDoc(readingsRef, {
        kWh: kWh,
        timestamp: timestamp
      });

      currentTime = addMinutes(currentTime, 1); // Move to the next minute
    }

    setStatus('Readings generated successfully!');
  };

  return (
    <div>
      <button onClick={generateReadingsForDay}>Generate Readings</button>
      <p>{status}</p>
    </div>
  );
};

export default GenerateReadings;
