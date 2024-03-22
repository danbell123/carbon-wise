// UsageVisualization.jsx
import React from 'react';

const UsageVisualization = ({ value, maxValue }) => {
  const percentage = Math.min(value / maxValue, 1);
  const radius = 90; // Radius of the arc
  const circumference = Math.PI * radius; // Semi-circle circumference
  const arcLength = percentage * circumference;
  const emptyLength = circumference - arcLength;

  return (
    <div className="my-4 flex justify-center items-center">
      <svg width="200" height="110" viewBox="0 0 200 110">
        {/* Background arc */}
        <path
          d="M 10,100 A 90,90 0 0,1 190,100"
          fill="none"
          stroke="#333"
          strokeWidth="20"
          strokeLinecap="round"
        />
        {/* Foreground arc */}
        <path
          d="M 10,100 A 90,90 0 0,1 190,100"
          fill="none"
          stroke="rgba(13, 170, 226, 1)" 
          strokeWidth="20"
          strokeDasharray={`${arcLength} ${emptyLength}`}
          strokeDashoffset="0"
          strokeLinecap="round"
        />
        {/* Text */}
        <text
          x="100"
          y="60" // Adjust the y position if necessary to center the text
          textAnchor="middle"
          fill="white"
          fontSize="20"
        >
          {`${value}kWh`}
        </text>
      </svg>
    </div>
  );
};

export default UsageVisualization;
