import React, { useState, useEffect } from 'react';
import Button from '../../components/buttons/btn';
import updateUserNotifications from '../../services/updateUserNotifications';
import { useAuth } from '../../contexts/authContext';
import { useToast } from '../../contexts/ToastContext';
import fetchUserData from '../../services/getUserDetails'; // Make sure this path is correct

const NotificationSettings = () => {
  const { currentUser } = useAuth();
  const { addToast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [carbonLow, setCarbonLow] = useState(false);
  const [carbonHigh, setCarbonHigh] = useState(false);
  const [usageHigh, setUsageHigh] = useState(false);

  useEffect(() => {
    // Fetch and set user's notification settings
    const fetchAndSetNotificationSettings = async () => {
      if (currentUser && currentUser.uid) {
        try {
          const userData = await fetchUserData(currentUser.uid);
          if (userData) {
            // Assuming these are the correct field names in your Firestore document
            // Adjust them according to your actual Firestore document structure
            setNotificationsEnabled(userData.notificationsEnabled || false);
            setCarbonLow(userData.ciLowNotif || false);
            setCarbonHigh(userData.ciHighNotif || false);
            setUsageHigh(userData.usageHighNotif || false);
          }
        } catch (error) {
          console.error("Failed to fetch notification settings:", error);
        }
      }
    };

    fetchAndSetNotificationSettings();
  }, [currentUser]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!currentUser || !currentUser.uid) {
      console.error("No user id available for updating notification settings.");
      return;
    }

    const notificationSettings = {
      notificationsEnabled, // This is assumed to be part of your user document now
      ciHighNotif: carbonHigh,
      ciLowNotif: carbonLow,
      usageHighNotif: usageHigh,
    };

    try {
      const response = await updateUserNotifications(currentUser.uid, notificationSettings);
      if (response.success) {
        addToast("Notification settings updated successfully", 'success');
      } else {
        addToast(`Error updating notification settings: ${response.error}`, 'error');
      }
    } catch (error) {
      console.error("Error updating notification settings:", error);
      addToast(`Error updating notification settings: ${error.message}`, 'error');
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
