import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import zxcvbn from 'zxcvbn';
import Button from '../buttons/btn';
import { useToast } from '../../contexts/ToastContext';
import { registerUser } from '../../services/registerUser';
import { useNavigate } from 'react-router-dom';
import regions from '../../data/regions';
import PasswordInput from './PasswordInput';


const RegisterForm = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [regionID, setRegionID] = useState('15');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
  
    const evaluation = zxcvbn(password); // Evaluate password strength immediately
    setPasswordStrength(evaluation.score); // Update the state for future use
  
    console.log("passwordStrength", evaluation.score);
  
    if (evaluation.score < 3) {
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
      let additionalData = {
        regionID,
        firstName,
        lastName
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
      // Now include the regionID in the additionalData object
      let additionalData = {
        regionID: 15 //Set to default region ID
      };

      await signInWithPopup(auth, provider);
      console.log("My reg process now...")
      await registerUser(null, null, additionalData);
      addToast('Registered with Google!', 'success');
      navigate('/dashboard'); // Redirect to the dashboard

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
        </div>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400">or register with email</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex flex-col items-center my-4 gap-4">
          <div className="flex flex-row items-center gap-4 w-full">
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="text-lg w-full px-4 py-2 border-transparent bg-gray-200 rounded shadow-sm focus:outline-none box-border"
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="text-lg w-full px-4 py-2 border-transparent bg-gray-200 rounded shadow-sm focus:outline-none box-border"
            />
          </div>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="text-lg w-full px-4 py-2 border-transparent bg-gray-200 rounded shadow-sm focus:outline-none box-border"
            />
            <PasswordInput value={password} onChange={e => setPassword(e.target.value)} isNewPassword={true}/>
            <PasswordInput value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='Confirm Password' />
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
        <Button size="large" width="full" >Register</Button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm">Already have an account? <button onClick={onToggle} className="text-sm text-blue-500 hover:underline">Login</button></p>
      </div>
    </div>
  );
};

export default RegisterForm;
