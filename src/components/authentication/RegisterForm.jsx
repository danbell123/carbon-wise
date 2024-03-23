import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const RegisterForm = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const auth = getAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      console.error("Passwords do not match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Handle successful registration
    } catch (error) {
      // Handle errors
      console.error("Error signing up:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Handle successful registration
    } catch (error) {
      // Handle errors
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleRegister} className="space-y-6">
        <div className="flex justify-center gap-4">
          <button type="button" onClick={handleGoogleSignIn} className="flex items-center justify-center w-1/2 px-4 py-2 border rounded shadow-sm text-sm font-medium text-gray-600 hover:bg-gray-50">
            Register With Google
          </button>
          <button type="button" className="flex items-center justify-center w-1/2 px-4 py-2 border rounded shadow-sm text-sm font-medium text-gray-600 hover:bg-gray-50">
            Register With Facebook
          </button>
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
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-300 box-border"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-300 box-border"
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-300 box-border"
            />
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
