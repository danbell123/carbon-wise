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
      navigate('/'); 
    }).catch((error) => {
      console.error('Failed to log out:', error);
    });
  };
  

  return (
    <div className="p-5 pt-20 sm:p-10 flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold m-0 text-text-colour-primary">Your Account</h1>
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
        <div className="pb-2">
          <nav className="flex space-x-4" aria-label="Tabs">
            {['General', 'Notifications', 'Account'].map((tab) => (
              <a
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 font-medium text-base rounded-t-lg cursor-pointer bg-bg-main-transparent glassEffect
                  ${activeTab === tab ? 'bg-primary-colour text-white' : 'text-text-colour-secondary hover:text-text-colour-primary'}`}
              >
                {tab}
              </a>
            ))}
          </nav>
        </div>
        <div className='bg-bg-main-transparent glassEffect rounded-b-lg p-5'>
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
