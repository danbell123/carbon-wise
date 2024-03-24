import React, { useState } from 'react';
import Button from '../../components/buttons/btn';

// Mock user data and regions array
const currentUser = {
  firstName: 'John',
  lastName: 'Doe',
  region: 'North America',
};

const regions = ['North America', 'Europe', 'Asia', 'Australia', 'South America', 'Africa'];

const GeneralSettings = () => {
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [region, setRegion] = useState(currentUser.region);

  const handleSave = (e) => {
    e.preventDefault();
    // Handle the save logic here
    // This might involve sending the updated user details to a backend server
    console.log('Saved:', { firstName, lastName, region });
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
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="text-lg w-full px-4 py-2 border-transparent bg-gray-200 rounded shadow-sm focus:outline-none box-border"
                >
                {regions.map((r) => (
                    <option key={r} value={r}>{r}</option>
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
