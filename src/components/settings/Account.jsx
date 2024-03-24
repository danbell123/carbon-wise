import React, { useState } from 'react';
import Button from '../../components/buttons/btn';
import { format } from 'date-fns';
import PasswordInput from '../authentication/PasswordInput';

const AccountSettings = () => {
  // Assuming these details are fetched or passed down as props
  const [userDetails, setUserDetails] = useState({
    email: 'user@example.com',
    registrationDate: '2023-01-01',
  });
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Implement password change logic here
    console.log('Password changed to:', newPassword);
    // Clear input field after change
    setNewPassword('');
  };

  const handleAccountDeletion = () => {
    // Implement account deletion logic here
    console.log('Account deletion initiated');
  };

  return (
    <div className='flex flex-col gap-6 w-full xl:w-3/4'>
      <h2 className='text-xl text-text-colour-primary'>Account Settings</h2>
      <div>
        <p className="text-sm font-medium text-text-colour-secondary mt-0">Email: {userDetails.email}</p>
        <p className="text-sm font-medium text-text-colour-secondary">Registered: {format(new Date(userDetails.registrationDate), 'PPP')}</p>
      </div>
      <form onSubmit={handlePasswordChange} className=" flex flex-col space-y-4 p-5 border border-solid border-text-colour-secondary">
      <h2 className='text-lg text-text-colour-primary m-0'>Change Password</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="newPassword" className="text-sm font-medium text-text-colour-secondary">
            New Password:
          </label>
          <PasswordInput />
        </div>
        <Button type="submit" size="medium" width="1/3">Change Password</Button>
      </form>
      <div className='pt-4 flex justify-start'>
        <Button onClick={handleAccountDeletion} size="medium" width="1/2" colour="red" >Delete Account</Button>
      </div>
    </div>
  );
};

export default AccountSettings;
