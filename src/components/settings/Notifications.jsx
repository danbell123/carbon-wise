import React, { useState } from 'react';
import Button from '../../components/buttons/btn';

const NotificationSettings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [carbonLow, setCarbonLow] = useState(false);
  const [carbonHigh, setCarbonHigh] = useState(false);
  const [usageHigh, setUsageHigh] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // Implement the save logic here
    console.log('Notification Settings Saved:', { carbonLow, carbonHigh, usageHigh });
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
