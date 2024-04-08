import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Button from '../buttons/btn';
import { useToast } from '../../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';


const LoginForm = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { addToast } = useToast(); // Assuming you have a toast system for notifications
  const navigate = useNavigate(); // Get the navigate function

  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      addToast('Login successful!', 'success');
      navigate('/dashboard');
    } catch (error) {
      addToast('Failed to login. Please check your credentials.', 'error');
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
        addToast('Login successful!', 'success');
        navigate('/dashboard');
    } catch (error) {
      addToast('Failed to login. Please check your credentials.', 'error');
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="flex flex-col xl:flex-row justify-center gap-4">
          <Button onClick={handleGoogleSignIn} width='full' >
            Log In With Google
          </Button>
          <Button width='full'>
            Log In With Facebook
          </Button>
        </div>
        <div className="flex items-center my-2">
          <div className="flex-grow border-t "></div>
          <span className="flex-shrink mx-4 text-text-colour-tertiary">or continue with email</span>
          <div className="flex-grow border-t"></div>
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
                onChange={e => setPassword(e.target.value)}
                className="text-lg w-full px-4 py-2 border-transparent bg-gray-200 rounded shadow-sm focus:outline-none box-border"
            />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <p>Forgot Password?</p>
        </div>
        <Button size="large" width="full" >LOG IN</Button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm">Don't have account? <button onClick={onToggle} className="text-sm text-blue-500 hover:underline">Register</button></p>
      </div>
    </div>
  );
};

export default LoginForm;
