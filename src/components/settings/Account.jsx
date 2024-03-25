import React, { useState } from 'react';
import Button from '../../components/buttons/btn';
import { format } from 'date-fns';
import PasswordInput from '../authentication/PasswordInput';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword, deleteUser } from "firebase/auth";

const AccountSettings = () => {
  const [userDetails, setUserDetails] = useState({
    email: 'user@example.com',
    registrationDate: '2023-01-01',
  });
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const auth = getAuth(); // Initialize Firebase Auth
  const user = auth.currentUser; // Get the currently signed-in user, corrected this line

  const handlePasswordChange = async (e) => {
    e.preventDefault();
  
    if (!user || oldPassword.length === 0 || newPassword.length === 0) {
      console.log('No user signed in or password not provided');
      return;
    }
  
    try {
      // Re-authenticate the user with the old password
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);
      console.log('Re-authentication successful');
  
      // Proceed to update the password after successful re-authentication
      await updatePassword(user, newPassword);
      console.log('Password changed successfully');
      setNewPassword('');
      setOldPassword(''); // Clear old password field
    } catch (error) {
      console.error('Error changing password:', error);
      // Handle or display the error appropriately
    }
  };

  const handleAccountDeletion = async () => {
    if (!user) {
      console.log('No user signed in');
      return;
    }

    try {
      await deleteUser(user);
      console.log('Account deleted successfully');
      // Redirect user or perform other clean-up actions here
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };


  return (
    <div className='flex flex-col gap-6 w-full xl:w-3/4'>
      <h2 className='text-xl text-text-colour-primary'>Account Settings</h2>
      <div>
        <p className="text-sm font-medium text-text-colour-secondary mt-0">Email: {userDetails.email}</p>
        <p className="text-sm font-medium text-text-colour-secondary">Registered: {format(new Date(userDetails.registrationDate), 'PPP')}</p>
      </div>
      <form onSubmit={handlePasswordChange} className="flex flex-col space-y-4 p-5 border border-solid border-text-colour-secondary">
        <h2 className='text-lg text-text-colour-primary m-0'>Change Password</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="oldPassword" className="text-sm font-medium text-text-colour-secondary">
            Old Password:
          </label>
          <PasswordInput
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="newPassword" className="text-sm font-medium text-text-colour-secondary">
            New Password:
          </label>
          <PasswordInput id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
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
