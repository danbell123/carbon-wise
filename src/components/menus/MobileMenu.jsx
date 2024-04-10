import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import ToggleThemeButton from '../buttons/ToggleThemeButton';
import { motion } from 'framer-motion'; 
import {useDevice} from '../../contexts/DeviceContext';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {isDisconnected, pairedTo} = useDevice();


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
        stiffness: 1000,
      },
    },
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-transparent z-20">
        <div className="flex items-center justify-between p-5">
          {/* Hamburger Icon */}
          <button
            className="text-text-colour-primary focus:outline-none bg-transparent p-0"
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
        } transition-transform duration-200 ease-in-out`}
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
            className="text-text-colour-primary focus:outline-none bg-transparent pl-5"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="p-5">
            <img src={Logo} alt="Carbon Wise Logo" className="w-full" />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-3 p-5 gap-3">
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

            {pairedTo === null ? (
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            > 
              <NavLink 
                to="/pair-device"
                className={({ isActive }) =>
                  isActive
                  ? "text-lg text-bg-outer bg-primaryGradient1 hover:bg-bg-main pl-2 rounded-lg flex items-center"
                  : "text-lg shadow-inner-menu text-text-colour-secondary hover:text-text-colour-primary bg-transparent hover:bg-bg-main pl-2 rounded-lg flex items-center"
                } 
              >
                <span className="material-symbols-outlined mr-1">browse_activity</span>
                <p className='m-2'>Pair Device</p>
              </NavLink>
            </motion.div>
            ) : 
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            > 
                <NavLink 
                to="/your-device"
                className={({ isActive }) =>
                  isActive
                  ? "text-lg relative text-bg-outer bg-primaryGradient1 hover:bg-bg-main pl-2 rounded-lg flex items-center"
                  : "text-lg relative shadow-inner-menu text-text-colour-secondary hover:text-text-colour-primary bg-transparent hover:bg-bg-main pl-2 rounded-lg flex items-center"
                } 
              >
                <span className="material-symbols-outlined mr-1">
                  browse_activity
                </span>
                <p className='m-2'>Device</p>

                {/* Display badge if device is paired and context is live */}
                {!isDisconnected?
                  <span className="absolute top-0 right-0 flex h-3 w-3 -mt-1 -mr-1"> 
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-65"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green opacity-90"></span>
                  </span>
                  : 
                  null}
              </NavLink>
            </motion.div>
            }

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

            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <NavLink 
                to="/faqs"
                className={({ isActive }) =>
                  isActive
                  ? "text-lg text-bg-outer bg-primaryGradient1 hover:bg-bg-main pl-2 rounded-lg flex items-center"
                  : "text-lg shadow-inner-menu text-text-colour-secondary hover:text-text-colour-primary bg-transparent hover:bg-bg-main pl-2 rounded-lg flex items-center"
                } 
              >
                <span className="material-symbols-outlined mr-1">help</span>
                <p className='m-2'>FAQ's</p>
              </NavLink>
            </motion.div>

          </nav>
          <div className='p-5 self-end'>
            <ToggleThemeButton />
          </div>
      </aside>
    </>
  );
};

export default MobileMenu;
