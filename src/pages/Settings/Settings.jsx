import React, { useState } from 'react';
import GeneralSettings from '../../components/settings/General';
import NotificationSettings from '../../components/settings/Notifications';
import AccountSettings from '../../components/settings/Account';
import Button from '../../components/buttons/btn';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('General');
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('Logged out successfully');
      navigate('/'); 
    }).catch((error) => {
      console.error('Failed to log out:', error);
    });
  };
  

  return (
    <div className="p-5 pt-28 sm:pt-10 ">
      <div className="flex justify-between items-center mb-8 ">
        <h1 className="text-3xl font-bold m-0 text-text-colour-primary">Your Account</h1>
        <Button
          onClick={handleLogout}
          className="bg-red-500 text-white text-base px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          colour="red"
        >
          Log Out
        </Button>
      </div>

      {/* Section 2: Tabbed Section */}
      <div className=''>
        <div className="">
          <nav className="flex space-x-4" aria-label="Tabs">
            {['General', 'Notifications', 'Account'].map((tab) => (
              <a
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 font-medium text-lg rounded-t-lg cursor-pointer
                  ${activeTab === tab ? 'bg-primary-colour text-white' : 'text-text-colour-secondary hover:text-text-colour-primary'}`}
              >
                {tab}
              </a>
            ))}
          </nav>
        </div>
        <div className='bg-bg-outer rounded-b-lg p-5 border-t-8 border-solid border-primary-colour'>
          {activeTab === 'General' && 
            <div>
                <GeneralSettings />
            </div>}
          {activeTab === 'Notifications' && 
           <div>
                <NotificationSettings />
            </div>}
          {activeTab === 'Account' && 
            <div>
              <AccountSettings />
            </div>}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
