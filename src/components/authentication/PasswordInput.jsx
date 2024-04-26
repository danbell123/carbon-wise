import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';  // Import zxcvbn for password strength evaluation

const PasswordInput = ({ value, onChange, isNewPassword, placeholder="Password"}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (e) => {
    onChange(e); // Call the onChange passed from parent to update the value
    if (isNewPassword) {
      const result = zxcvbn(e.target.value);
      setPasswordStrength(result.score); // Update password strength based on evaluation
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col items-left gap-4 w-full">
      <div className="flex items-center relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={value}
          onChange={handlePasswordChange}
          placeholder={placeholder}
          className="text-lg w-full px-4 py-2 border-transparent bg-gray-200 rounded shadow-sm focus:outline-none box-border"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 p-0 m-0 bg-transparent focus:outline-none align-middle"
        >
          {showPassword ? <span className="material-symbols-outlined">visibility_off</span> : <span className="material-symbols-outlined">visibility</span>}
        </button>
      </div>
      {/* Conditional rendering of the password strength bar */}
      {isNewPassword && (
        <div className="w-full bg-gray-300 rounded h-2">
          <div className={`h-2 rounded transition-width duration-300 ease-in-out ${
            passwordStrength === 0 ? 'bg-veryHighColour w-2' : 
            passwordStrength === 1 ? 'bg-orange-500 w-1/4' : 
            passwordStrength === 2 ? 'bg-yellow-500 w-1/2' : 
            passwordStrength === 3 ? 'bg-lowColour w-3/4' : 
            'bg-veryLowColour w-full'}`}></div>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
