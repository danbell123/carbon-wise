import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import zxcvbn from 'zxcvbn';
import Button from '../buttons/btn';
import { useToast } from '../../contexts/ToastContext';
import { registerUser } from '../../services/registerUser';
import { useNavigate } from 'react-router-dom';
import regions from '../../data/regions';


const RegisterForm = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [regionID, setRegionID] = useState('');
  const { addToast } = useToast(); 
  const navigate = useNavigate();

  const auth = getAuth();

  const evaluatePassword = (password) => {
    const evaluation = zxcvbn(password);
    setPasswordStrength(evaluation.score);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    evaluatePassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (passwordStrength < 3) {
        addToast("Password is too weak!", "error");
        return;
    }

    if (password !== confirmPassword) {
        addToast("Passwords do not match!", "error");
        return;
    }

    if (!regionID) { // Check if the regionID is selected
        addToast("Please select your region", "error");
        return;
    }

    try {
        // Now include the regionID in the additionalData object
        let additionalData = {
            regionID // Assuming registerUser can handle this additional piece of information
        };

        await registerUser(email, password, additionalData);
        addToast('Registration successful!', 'success');
        navigate('/dashboard'); // Redirect to the dashboard
    } catch (error) {
        addToast(error.message, 'error'); // Display the error message from Firebase
    }
};


  const handleGoogleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission which could refresh the page
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      addToast('Signed in with Google!', 'success');
      // Redirect or update UI after successful sign-in
    } catch (error) {
      addToast(error.message, 'error'); // Display the error message from Firebase
    }
};

  return (
    <div className="w-full">
      <form onSubmit={handleRegister} className="space-y-6">
        <div className="flex justify-center gap-4">
            <Button onClick={handleGoogleSignIn} width='full' >
                Register With Google
            </Button>
            <Button width='full'>
                Register With Facebook
            </Button>
        </div>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400">or register with email</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex flex-col items-center my-4 gap-4">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="text-lg w-full px-4 py-2 border-transparent bg-gray-200 rounded shadow-sm focus:outline-none box-border"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="text-lg w-full px-4 py-2 border-transparent bg-gray-200 rounded shadow-sm focus:outline-none box-border"
            />
            {/* Password strength bar */}
            <div className="w-full bg-gray-300 rounded h-2">
                <div className={`h-2 rounded transition-width duration-300 ease-in-out ${passwordStrength === 0 ? 'bg-red-500 w-2' : passwordStrength === 1 ? 'bg-orange-500 w-1/4' : passwordStrength === 2 ? 'bg-yellow-500 w-1/2' : passwordStrength === 3 ? 'bg-green-300 w-3/4' : 'bg-green-500 w-full'}`}></div>
            </div>
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="text-lg w-full px-4 py-2 border-transparent bg-gray-200 rounded shadow-sm focus:outline-none box-border"
            />
            <div className="w-full bg-gray-300 rounded">
              <select
                id="region"
                value={regionID}
                onChange={(e) => setRegionID(e.target.value)}
                className="text-lg w-full px-4 py-2 border-transparent bg-gray-200 rounded shadow-sm focus:outline-none box-border"
              >
                <option value="">Select your region...</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))}
              </select>
            </div>
        </div>
        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
          REGISTER
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm">Already have an account? <button onClick={onToggle} className="text-sm text-blue-500 hover:underline">Login</button></p>
      </div>
    </div>
  );
};

export default RegisterForm;
