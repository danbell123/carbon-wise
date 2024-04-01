import React, { memo } from 'react';

// Foreground arc and text are likely to change, so we memoize them together for efficiency
const DynamicParts = memo(({ value, arcLength, emptyLength }) => {
  const radius = 90; // Assuming radius is constant and used here for calculations
  console.log('DynamicParts rendered');
  console.log('value:', value);
  console.log('arcLength:', arcLength);
  console.log('emptyLength:', emptyLength);
  return (
    <>
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
    </>
  );
}, (prevProps, nextProps) => {
  // Re-render only if value, arcLength, or emptyLength change
  return prevProps.value === nextProps.value &&
         prevProps.arcLength === nextProps.arcLength &&
         prevProps.emptyLength === nextProps.emptyLength;
});

// Main component, UsageVisualization, uses DynamicParts for the parts that change
const UsageVisualization = ({ value, maxValue }) => {
  const percentage = Math.min(value / maxValue, 1);
  const radius = 90; // Radius of the arc remains constant
  const circumference = Math.PI * radius; // Semi-circle circumference, also constant
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
        {/* Dynamic parts: foreground arc and text */}
        <DynamicParts value={value} arcLength={arcLength} emptyLength={emptyLength} />
      </svg>
    </div>
  );
};

export default UsageVisualization;
