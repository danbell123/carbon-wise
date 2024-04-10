import React, { useState, useEffect } from 'react';
import Button from '../../components/buttons/btn';
import { format } from 'date-fns';
import PasswordInput from '../authentication/PasswordInput';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword, deleteUser } from "firebase/auth";
import { useToast } from '../../contexts/ToastContext';
import fetchUserData from '../../services/getUserDetails';
import { redirect } from 'react-router-dom';

const AccountSettings = () => {
  const auth = getAuth();
  const user = auth.currentUser; 

  const [userDetails, setUserDetails] = useState({
    email: "email",
  });
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordDelete, setOldPasswordDelete] = useState('');

  const { addToast } = useToast();

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      if (user) {
        try {
          const userData = await fetchUserData(user.uid);
          if (userData) {
            setUserDetails({
              ...userDetails,
              email: userData.email || 'No email available',
            });
          } else {
            addToast(`Could not find your data`, 'error');
          }
        } catch (error) {
          addToast(`Failed to fetch your data: ${error}`, 'error');
        }
      }
    };

    fetchAndSetUserData();
  }, [user]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
  
    if (!user || oldPassword.length === 0 || newPassword.length === 0) {
      addToast(`Please provide old and new password`, 'error');
      return;
    }
  
    try {
      // Re-authenticate the user with the old password
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      try {
        await reauthenticateWithCredential(user, credential);
      } catch (error) {
        addToast(`Incorrect original password`, 'error');
        return;
      }
  
      // Proceed to update the password after successful re-authentication
      await updatePassword(user, newPassword);
      setNewPassword('');
      setOldPassword('');
      addToast(`Password change success`, 'success');
    } catch (error) {
      addToast(`Error changing password: ${error}`, 'error');
      // Handle or display the error appropriately
    }
  };

  const handleAccountDeletion = async () => {
    if (!user) {
      return;
    }

    // Re-authenticate the user with the old password
    const credential = EmailAuthProvider.credential(user.email, oldPasswordDelete);
    try {
      await reauthenticateWithCredential(user, credential);
    } catch (error) {
      addToast(`Incorrect original password`, 'error');
      return;
    }

    try {
      await deleteUser(user);
      addToast(`Account deleted successfully`, 'success');
      redirect('/');
    } catch (error) {
      addToast(`Error deleting account: ${error}`, 'error');
    }
  };


  return (
    <div className='flex flex-col gap-6 w-full xl:w-3/4'>
      <h2 className='text-xl text-text-colour-primary mb-0'>Account Settings</h2>
      <div>
        <p className="text-sm font-medium text-text-colour-secondary my-0">Email: {userDetails.email}</p>
      </div>
      <form onSubmit={handlePasswordChange} className="flex flex-col space-y-4 p-5 border border-solid border-text-colour-tertiary rounded-xl">
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

      <form onSubmit={handleAccountDeletion} className="flex flex-col space-y-4 p-5 border border-solid border-text-colour-tertiary rounded-xl">
        <h2 className='text-lg text-text-colour-primary m-0'>Delete Your Account</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="oldPasswordDelete" className="text-sm font-medium text-text-colour-secondary">
            Old Password:
          </label>
          <PasswordInput
            id="oldPasswordDelete"
            value={oldPasswordDelete}
            onChange={(e) => setOldPasswordDelete(e.target.value)}
          />
        </div>
        <Button type="submit" size="medium" width="1/3" colour='red'>Delete Account</Button>
      </form>
    </div>
  );
};

export default AccountSettings;
