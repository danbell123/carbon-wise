import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/Logo.png';

const DesktopMenu = () => {
  return (
    <aside className="h-screen fixed top-0 bg-bg-outer text-white w-64">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="p-5 pt-10">
            <img src={Logo} alt="Carbon Wise Logo" className="w-full" />
          </div>
          <nav className="flex flex-col px-5 space-y-3">
            <NavLink 
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                ? "text-lg text-bg-outer bg-primaryGradient1 hover:bg-bg-main pl-2 rounded flex items-center"
                : "text-lg text-text-colour-secondary hover:text-text-colour-primary bg-transparent hover:bg-bg-main pl-2 rounded flex items-center"
              } 
            >
              <span className="material-symbols-outlined mr-1">home</span>
              <p className='m-2'>Dashboard</p>
            </NavLink>

            <NavLink 
              to="/carbon-intensity"
              className={({ isActive }) =>
                isActive
                ? "text-lg text-bg-outer bg-primaryGradient1 hover:bg-bg-main pl-2 rounded flex items-center"
                : "text-lg text-text-colour-secondary hover:text-text-colour-primary bg-transparent hover:bg-bg-main pl-2 rounded flex items-center"
              } 
            >
              <span className="material-symbols-outlined mr-1">monitoring</span>
              <p className='m-2'>Carbon Intensity</p>
            </NavLink>


            <NavLink 
              to="/your-usage"
              className={({ isActive }) =>
                isActive
                ? "text-lg text-bg-outer bg-primaryGradient1 hover:bg-bg-main pl-2 rounded flex items-center"
                : "text-lg text-text-colour-secondary hover:text-text-colour-primary bg-transparent hover:bg-bg-main pl-2 rounded flex items-center"
              } 
            >
              <span className="material-symbols-outlined mr-1">electric_bolt</span>
              <p className='m-2'>Your Usage</p>
            </NavLink>

            <NavLink 
              to="/your-scores"
              className={({ isActive }) =>
                isActive
                ? "text-lg text-bg-outer bg-primaryGradient1 hover:bg-bg-main pl-2 rounded flex items-center"
                : "text-lg text-text-colour-secondary hover:text-text-colour-primary bg-transparent hover:bg-bg-main pl-2 rounded flex items-center"
              } 
            >
              <span className="material-symbols-outlined mr-1">speed</span>
              <p className='m-2'>Your Scores</p>
            </NavLink>
            


          </nav>
        </div>
        <div className="p-5 bg-bg-main flex flex-col">

          <div className="flex items-center space-x-3 text-base">
            <span className="material-symbols-outlined">
              account_circle
            </span>
            <span>Dan Bell</span>
          </div>

          <NavLink to="/your-scores" className="text-sm text-text-colour-secondary bg-transparent hover:bg-bg-main rounded flex items-center">
            <p>Settings</p>
          </NavLink>

        </div>

      </div>
    </aside>
  );
};

export default DesktopMenu;
