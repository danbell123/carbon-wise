import React, { useState } from 'react';
import LoginForm from '../components/authentication/LoginForm';
import RegisterForm from '../components/authentication/RegisterForm';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleClass = isLogin
    ? "translate-x-0"
    : "translate-x-full";

  return (
    <div className="flex flex-col items-center font-rubik justify-center min-h-screen bg-secondary-colour ">

      <div className="mb-8 relative w-1/3 bg-gray-300 rounded-full h-10 flex items-center cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
        {/* This will be the sliding element */}
        <div className={`absolute left-0 w-1/2 bg-white rounded-full shadow-md h-full ${toggleClass} transition-transform duration-300 ease-in-out flex items-center justify-center`}>
          <span className={`text-sm font-medium ${isLogin ? 'font-bold' : ''}`}>
            
          </span>
        </div>
        {/* Non-sliding elements */}
        <span className={`absolute left-0 w-1/2 text-center text-lg ${isLogin ? 'font-bold' : ''}`}>
          Login
        </span>
        <span className={`absolute right-0 w-1/2 text-center text-lg ${!isLogin ? 'font-bold' : ''}`}>
          Register
        </span>
      </div>

      <div className="w-2/3 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-10">
            <div className="text-center">
              <p className="font-bold text-3xl">
                {isLogin ? 'Login to your Account' : 'Create an Account'}
              </p>
              <p className="text-xl">
                {isLogin ? 'Welcome Back! Please Log In' : 'Welcome To CarbonWise.'}
              </p>
            </div>
            {isLogin ? (
              <LoginForm onToggle={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onToggle={() => setIsLogin(true)} />
            )}
          </div>
          <div className="w-full md:w-1/2 bg-primary-colour p-10 hidden md:block">
            {/* High fidelity content goes here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
