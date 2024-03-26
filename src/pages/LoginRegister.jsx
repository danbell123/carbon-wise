import React, { useState } from 'react';
import LoginForm from '../components/authentication/LoginForm';
import RegisterForm from '../components/authentication/RegisterForm';
import WaveBackground from '../components/waveBackground';
import FloatingPhone from '../components/FloatingPhone';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleClass = isLogin
    ? "translate-x-0"
    : "translate-x-full";

  return (
    <> 
      <div className="min-h-screen bg-secondary-colour ">
        <div className="flex flex-col items-center font-rubik justify-center min-h-screen">
          <div className="z-20 mb-8 relative w-1/3 bg-bg-outer rounded-full h-10 flex items-center cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
            {/* Sliding element */}
            <div className={`absolute left-0 w-1/2 bg-bg-main rounded-full shadow-md h-full ${toggleClass} transition-transform duration-300 ease-in-out flex items-center justify-center`}>

            </div>
            {/* Non-sliding elements */}
            <span className={`absolute left-0 w-1/2 text-center text-lg ${isLogin ? 'font-bold text-text-colour-primary' : 'text-text-colour-secondary'}`}>
              Login
            </span>
            <span className={`absolute right-0 w-1/2 text-center text-lg ${!isLogin ? 'font-bold text-text-colour-primary' : 'text-text-colour-secondary'}`}>
              Register
            </span>
          </div>
          <div className="w-2/3 bg-bg-main rounded-lg shadow-md overflow-hidden z-10	">
            <div className="md:flex">
              <div className="md:w-1/2 p-10">
                <div className="text-left">
                  <p className=" font-bold text-4xl mb-0 text-text-colour-primary">
                    {isLogin ? 'Log In' : 'Register'}
                  </p>
                  <p className="text-base mb-12 text-text-colour-secondary">
                    {isLogin ? 'Welcome back! Select method to log in:' : 'Welcome to CarbonWise! Select method to register your account:'}
                  </p>
                </div>
                {isLogin ? (
                  <LoginForm onToggle={() => setIsLogin(false)} />
                ) : (
                  <RegisterForm onToggle={() => setIsLogin(true)} />
                )}
              </div>
              <div className="w-full md:w-1/2 bg-bg-outer p-10 hidden md:block">
              <section className="grid place-content-center p-12">
                <FloatingPhone />
              </section>
              </div>
            </div>
          </div>
        </div>
        <WaveBackground />
      </div>
    </>
  );
};

export default LoginRegister;
