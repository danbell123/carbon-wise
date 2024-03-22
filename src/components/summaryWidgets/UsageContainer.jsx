import React from 'react';
import UsageVisualization from './UsageVisualization';

const UsageContainer = () => {

  const value = 10;
  const maxValue = 20;

  return (
    <div className="bg-bg-main font-rubik text-text-colour-primary p-4 rounded-lg shadow-md max-w-sm">
      <h1 className="text-lg font-semibold">Your Current Usage</h1>
      <p className="text-sm">Last Updated: Just Now</p>
      <UsageVisualization value={value} maxValue={maxValue} />
      <button className="mt-4 bg-secondary-colour hover:bg-secondary-colour-hover text-white font-bold py-2 px-4 rounded">
        More Details
      </button>
    </div>
  );
};

export default UsageContainer;