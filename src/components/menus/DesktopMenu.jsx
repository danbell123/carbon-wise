import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/Logo.png';

const DesktopMenu = () => {
  return (
    <aside className="h-screen fixed top-0 bg-bg-outer text-white w-64">
      <div className="flex flex-col justify-between h-full p-5">
        <div>
          <div className="pt-5 pb-10">
            <img src={Logo} alt="Carbon Wise Logo" className="w-full" />
          </div>
          <nav className="flex flex-col space-y-3">
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
        </div>
        <div>
        <div className="p-5 mb-5 bg-bg-main flex flex-col rounded-lg w-min">
          <NavLink to="/your-scores" className="text-sm text-text-colour-secondary bg-transparent hover:bg-bg-main rounded-lg flex items-center">
            <span className="material-symbols-outlined">
              dark_mode
            </span>
          </NavLink>
          </div>
          <div className="p-5 mb-10 bg-bg-main flex flex-col rounded-lg">
            <div className="flex items-center space-x-3 text-base">
              <span className="material-symbols-outlined">
                account_circle
              </span>
              <span>Dan Bell</span>
            </div>
            <NavLink to="/your-scores" className="text-sm text-text-colour-secondary bg-transparent hover:bg-bg-main rounded-lg flex items-center">
              <p className='mb-0'>Settings</p>
            </NavLink>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DesktopMenu;
