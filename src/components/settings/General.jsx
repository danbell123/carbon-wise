import React, { useState, useEffect } from 'react';
import Button from '../../components/buttons/btn';
import updateUser from '../../services/updateUser';
import { useAuth } from '../../contexts/authContext';
import regions from '../../data/regions'; 

const GeneralSettings = () => {
  const { currentUser } = useAuth();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [regionID, setRegionID] = useState('');

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName || '');
      setLastName(currentUser.lastName || '');
      setRegionID(currentUser.region || '');
    }
  }, [currentUser]);

  const handleSave = async (e) => {
    e.preventDefault();

    const uid = currentUser.uid;
    const updatedUserObj = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(regionID && { regionID }),
    };

    const response = await updateUser(uid, updatedUserObj);
    if (response.success) {
      console.log("User update successful");
    } else {
      console.error("User update failed:", response.error);
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
