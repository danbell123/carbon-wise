import React, { useState } from 'react';
import Button from '../../components/buttons/btn';
import updateUserNotifications from '../../services/updateUserNotifications'; 
import { useAuth } from '../../contexts/authContext'; 

const NotificationSettings = () => {
  const { currentUser } = useAuth();

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [carbonLow, setCarbonLow] = useState(false);
  const [carbonHigh, setCarbonHigh] = useState(false);
  const [usageHigh, setUsageHigh] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();

    // Ensure currentUser and currentUser.uid are available
    if (!currentUser || !currentUser.uid) {
      console.error("No user id available for updating notification settings.");
      return;
    }

    // Prepare notification settings based on whether notifications are enabled
    const notificationSettings = {
      ciHighNotif: notificationsEnabled && carbonHigh,
      ciLowNotif: notificationsEnabled && carbonLow,
      usageHighNotif: notificationsEnabled && usageHigh,
    };

    // Use the uid from the currentUser object
    const uid = currentUser.uid;

    // Call the service function with the user's uid and notification settings
    const response = await updateUserNotifications(uid, notificationSettings);
    if (response.success) {
      console.log("Notification settings updated successfully");
    } else {
      console.error("Error updating notification settings:", response.error);
      console.error("user id:", uid); 
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className='flex flex-col gap-4 w-full xl:w-1/3'>
          <h2 className='text-xl text-text-colour-primary'>Notification Settings</h2>
          <div className="flex items-center">
              <input
                type="checkbox"
                id="enableNotifications"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="text-lg w-6 h-6 mr-2"
              />
              <label htmlFor="enableNotifications" className="text-sm font-medium text-text-colour-secondary">
                Enable Notifications
              </label>
          </div>
          <fieldset disabled={!notificationsEnabled} className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="carbonLow"
                checked={carbonLow}
                onChange={(e) => setCarbonLow(e.target.checked)}
                className="text-lg w-6 h-6 mr-2"
              />
              <label htmlFor="carbonLow" className="text-sm font-medium text-text-colour-secondary">
                Carbon Low Notification
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="carbonHigh"
                checked={carbonHigh}
                onChange={(e) => setCarbonHigh(e.target.checked)}
                className="text-lg w-6 h-6 mr-2"
              />
              <label htmlFor="carbonHigh" className="text-sm font-medium text-text-colour-secondary">
                Carbon High Notification
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="usageHigh"
                checked={usageHigh}
                onChange={(e) => setUsageHigh(e.target.checked)}
                className="text-lg w-6 h-6 mr-2"
              />
              <label htmlFor="usageHigh" className="text-sm font-medium text-text-colour-secondary">
                Usage High Notification
              </label>
            </div>
          </fieldset>
          <div className='pt-4 flex justify-start'>
              <Button size="medium" width="1/2">Save Changes</Button>
          </div>
      </div>
    </form>
  );
};

export default NotificationSettings;
