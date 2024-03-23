// MobileMenu.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import ToggleThemeButton from '../ToggleThemeButton';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-transparent z-20">
        <div className="flex items-center justify-between p-5">
          {/* Hamburger Icon */}
          <button
            className="text-white focus:outline-none bg-transparent p-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined p-0">menu</span>
          </button>

          {/* TODO: Account and notifications. */}
          <div className='flex gap-8'>
            <button
              className="text-white focus:outline-none bg-transparent p-0"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button
              className="text-white focus:outline-none bg-transparent p-0"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </div>
      </header>


      {/* Menu Overlay */}
      <div
        className={`fixed w-full h-full top-0 left-0 bg-black bg-opacity-50 z-10 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Items */}
      <aside
        className={`transform top-0 left-0 w-64 bg-bg-outer fixed h-full overflow-auto z-30 ease-in-out transition-all duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Menu header */}
        <div className='flex flex-row'>
          <button
            className="text-white focus:outline-none bg-transparent pl-5"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="p-5">
            <img src={Logo} alt="Carbon Wise Logo" className="w-full" />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-3 p-5">
            <NavLink 
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                ? "text-lg text-bg-outer bg-primaryGradient1 hover:bg-bg-main pl-2 rounded-lg flex items-center"
                : "text-lg text-text-colour-secondary hover:text-text-colour-primary bg-transparent hover:bg-bg-main pl-2 rounded-lg flex items-center"
              } 
            >
              <span className="material-symbols-outlined mr-1">home</span>
              <p className='m-2'>Dashboard</p>
            </NavLink>

            <NavLink 
              to="/carbon-intensity"
              className={({ isActive }) =>
                isActive
                ? "text-lg text-bg-outer bg-primaryGradient1 hover:bg-bg-main pl-2 rounded-lg flex items-center"
                : "text-lg text-text-colour-secondary hover:text-text-colour-primary bg-transparent hover:bg-bg-main pl-2 rounded-lg flex items-center"
              } 
            >
              <span className="material-symbols-outlined mr-1">monitoring</span>
              <p className='m-2'>Carbon Intensity</p>
            </NavLink>


            <NavLink 
              to="/your-usage"
              className={({ isActive }) =>
                isActive
                ? "text-lg text-bg-outer bg-primaryGradient1 hover:bg-bg-main pl-2 rounded-lg flex items-center"
                : "text-lg text-text-colour-secondary hover:text-text-colour-primary bg-transparent hover:bg-bg-main pl-2 rounded-lg flex items-center"
              } 
            >
              <span className="material-symbols-outlined mr-1">electric_bolt</span>
              <p className='m-2'>Your Usage</p>
            </NavLink>
            
            <NavLink 
              to="/your-scores"
              className={({ isActive }) =>
                isActive
                ? "text-lg text-bg-outer bg-primaryGradient1 hover:bg-bg-main pl-2 rounded-lg flex items-center"
                : "text-lg text-text-colour-secondary hover:text-text-colour-primary bg-transparent hover:bg-bg-main pl-2 rounded-lg flex items-center"
              } 
            >
              <span className="material-symbols-outlined mr-1">speed</span>
              <p className='m-2'>Your Scores</p>
            </NavLink>
          </nav>
          <div className='p-5 self-end'>
            <ToggleThemeButton />
          </div>
      </aside>
    </>
  );
};

export default MobileMenu;
