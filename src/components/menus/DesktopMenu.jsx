import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import ToggleThemeButton from '../buttons/ToggleThemeButton';
import { motion } from 'framer-motion'; 

const DesktopMenu = () => {
  const buttonVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1.01,
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
      },
    },
    tap: {
      scale: 0.97,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 600,
      },
    },
  };

  return (
    <aside className="h-screen fixed top-0 bg-bg-outer text-white w-64">
      <div className="flex flex-col justify-between h-full p-5">
        <div>
          <div className="pt-5 pb-10">
            <img src={Logo} alt="Carbon Wise Logo" className="w-full" />
          </div>
          <nav className="flex flex-col space-y-5">
          <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            > 
              <NavLink 
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                  ? "text-lg text-bg-outer bg-primaryGradient1 hover:bg-bg-main pl-2 rounded-lg flex items-center"
                  : "text-lg shadow-inner-menu text-text-colour-secondary hover:text-text-colour-primary bg-transparent hover:bg-bg-main pl-2 rounded-lg flex items-center"
                } 
              >
                <span className="material-symbols-outlined mr-1">home</span>
                <p className='m-2'>Dashboard</p>
              </NavLink>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            > 
              <NavLink 
                to="/carbon-intensity"
                className={({ isActive }) =>
                  isActive
                  ? "text-lg text-bg-outer bg-primaryGradient1 hover:bg-bg-main pl-2 rounded-lg flex items-center"
                  : "text-lg shadow-inner-menu text-text-colour-secondary hover:text-text-colour-primary bg-transparent hover:bg-bg-main pl-2 rounded-lg flex items-center"
                } 
              >
                <span className="material-symbols-outlined mr-1">monitoring</span>
                <p className='m-2'>Carbon Intensity</p>
              </NavLink>
            </motion.div> 

            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <NavLink 
                to="/your-usage"
                className={({ isActive }) =>
                  isActive
                  ? "text-lg text-bg-outer bg-primaryGradient1 hover:bg-bg-main pl-2 rounded-lg flex items-center"
                  : "text-lg shadow-inner-menu text-text-colour-secondary hover:text-text-colour-primary bg-transparent hover:bg-bg-main pl-2 rounded-lg flex items-center"
                } 
              >
                <span className="material-symbols-outlined mr-1">
                electric_bolt
                </span>
                <p className='m-2'>Usage</p>
              </NavLink>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            > 
              <NavLink 
                to="/your-scores"
                className={({ isActive }) =>
                  isActive
                  ? "text-lg text-bg-outer bg-primaryGradient1 hover:bg-bg-main pl-2 rounded-lg flex items-center"
                  : "text-lg shadow-inner-menu text-text-colour-secondary hover:text-text-colour-primary bg-transparent hover:bg-bg-main pl-2 rounded-lg flex items-center"
                } 
              >
                <span className="material-symbols-outlined mr-1">speed</span>
                <p className='m-2'>Scores</p>
              </NavLink>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            > 
              <NavLink 
                to="/your-device"
                className={({ isActive }) =>
                  (isActive
                    ? "text-lg bg-primaryGradient1 hover:bg-bg-main text-bg-outer rounded-lg flex items-center"
                    : "text-lg text-text-colour-secondary hover:text-text-colour-primary shadow-inner-menu bg-transparent hover:bg-bg-main rounded-lg flex items-center")
                  + " relative px-3"
                } 
              >
                <span className="material-symbols-outlined mr-1">
                  browse_activity
                </span>
                <p className='m-2'>Device</p>

                {/* Badge container adjusted for top-right positioning */}
                <span className="absolute top-0 right-0 flex h-3 w-3 -mt-1 -mr-1"> 
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-65"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green opacity-90"></span>
                </span>
              </NavLink>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <NavLink 
                to="/account"
                className={({ isActive }) =>
                  isActive
                  ? "text-lg text-bg-outer bg-primaryGradient1 hover:bg-bg-main pl-2 rounded-lg flex items-center"
                  : "text-lg shadow-inner-menu text-text-colour-secondary hover:text-text-colour-primary bg-transparent hover:bg-bg-main pl-2 rounded-lg flex items-center"
                } 
              >
                <span className="material-symbols-outlined mr-1">settings</span>
                <p className='m-2'>Account</p>
              </NavLink>
            </motion.div>

          </nav>
        </div>
        <div>
        <div className="mb-5">
          <ToggleThemeButton />
          </div>
          <div className="p-5 mb-10 bg-bg-main flex flex-col rounded-lg">
            <NavLink to="/account" className="flex items-center space-x-3 text-base">
              <span className="material-symbols-outlined">
                account_circle
              </span>
              <span>Dan Bell</span>
            </NavLink>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DesktopMenu;
