import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const LoginForm = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Handle successful login
    } catch (error) {
      // Handle errors
      console.error("Error signing in:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Handle successful login
    } catch (error) {
      // Handle errors
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="w-full ">
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="flex justify-center gap-4">
          <button type="button" onClick={handleGoogleSignIn} className="flex items-center justify-center w-1/2 px-4 py-2 border rounded shadow-sm text-sm font-medium text-gray-600 hover:bg-gray-50">
            Log In With Google
          </button>
          <button type="button" className="flex items-center justify-center w-1/2 px-4 py-2 border rounded shadow-sm text-sm font-medium text-gray-600 hover:bg-gray-50">
            Log In With Facebook
          </button>
        </div>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400">or continue with email</span>
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
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button type="button" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </button>
        </div>
        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
          LOG IN
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm">Don't have account? <button onClick={onToggle} className="text-sm text-blue-500 hover:underline">Register</button></p>
      </div>
    </div>
  );
};

export default LoginForm;
