import React, { useState, useEffect } from 'react';
import Button from '../../components/buttons/btn';
import updateUser from '../../services/updateUser';
import { useAuth } from '../../contexts/authContext';
import regions from '../../data/regions';
import { useToast } from '../../contexts/ToastContext';
import fetchUserData from '../../services/getUserDetails'; // Make sure this is the correct path

const GeneralSettings = () => {
  const { currentUser } = useAuth();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [regionID, setRegionID] = useState('15');

  const { addToast } = useToast();

  useEffect(() => {
    const fetchAndSetUserDetails = async () => {
      if (currentUser && currentUser.uid) {
        try {
          const userDetails = await fetchUserData(currentUser.uid);
          if (userDetails) {
            setFirstName(userDetails.firstName || '');
            setLastName(userDetails.lastName || '');
            setRegionID(userDetails.regionID || ''); // Ensure the field name matches what's stored in Firestore
          }
        } catch (error) {
          console.error("Failed to fetch user details:", error);
          addToast(`Failed to fetch user details: ${error.message}`, 'error');
        }
      }
    };

    fetchAndSetUserDetails();
  }, [currentUser, addToast]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (currentUser && currentUser.uid) {
      const uid = currentUser.uid;
      const updatedUserObj = {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(regionID && { regionID }),
      };

      try {
        const response = await updateUser(uid, updatedUserObj);
        if (response.success) {
          addToast("User update successful", 'success');
        } else {
          addToast(`User update failed: ${response.error}`, 'error');
        }
      } catch (error) {
        console.error("User update failed:", error);
        addToast(`User update failed: ${error.message}`, 'error');
      }
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
        <div className='flex flex-col items-left gap-4 w-full xl:w-1/3'>
            <h2 className='text-xl text-text-colour-primary'>General Settings</h2>
            <div>
                <label htmlFor="firstName" className="block pb-1 text-sm font-medium text-text-colour-secondary">First Name</label>
                <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="text-lg w-full px-4 py-2 border-transparent bg-gray-200 rounded shadow-sm focus:outline-none box-border"
                />
            </div>
            <div>
                <label htmlFor="lastName" className="block pb-1 text-sm font-medium text-text-colour-secondary">Last Name</label>
                <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="text-lg w-full px-4 py-2 border-transparent bg-gray-200 rounded shadow-sm focus:outline-none box-border"
                />
            </div>
            <div>
              <label htmlFor="region" className="block pb-1 text-sm font-medium text-text-colour-secondary">Region</label>
              <select
                id="region"
                value={regionID}
                onChange={(e) => setRegionID(e.target.value)}
                className="text-lg w-full px-4 py-2 border-transparent bg-gray-200 rounded shadow-sm focus:outline-none box-border"
              >
                <option value="">Select a region...</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))}
              </select>
            </div>
            <div className='pt-4'>
                <Button size="medium" width="1/2" >Save Changes</Button>
            </div>
        </div>
    </form>
  );
};

export default GeneralSettings;
