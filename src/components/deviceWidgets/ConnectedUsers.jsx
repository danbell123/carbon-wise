import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const ConnectedUsers = () => {
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    const fetchConnectedUsers = async () => {
      // Replace 'DEVICE_MAC_ADDRESS' with the actual MAC address variable
      const q = query(collection(db, 'user-device-pairings', 'DEVICE_MAC_ADDRESS', 'usersPaired'));
      const querySnapshot = await getDocs(q);
      setConnectedUsers(querySnapshot.docs.map(doc => doc.data()));
    };

    fetchConnectedUsers();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-3">Connected Users</h2>
      <ul>
        {connectedUsers.map((user, index) => (
          <li key={index} className="mb-2">
            {user.name} {/* Adjust depending on the structure of your user data */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConnectedUsers;
