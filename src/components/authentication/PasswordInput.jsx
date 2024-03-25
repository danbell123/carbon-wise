import React, { useState } from 'react';

const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col items-left gap-4 w-full">
      <div className="flex items-center relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={value} // Use value passed from parent
          onChange={onChange} // Use onChange passed from parent
          placeholder="Password"
          className="text-lg w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 p-0 m-0 bg-transparent focus:outline-none align-middle"
        >
          {showPassword ? <span className="material-symbols-outlined">visibility_off</span> : <span className="material-symbols-outlined">visibility</span>}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
