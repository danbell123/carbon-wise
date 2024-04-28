import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import ToggleThemeButton from '../buttons/ToggleThemeButton';
import { motion } from 'framer-motion'; 
import {useDevice} from '../../contexts/DeviceContext';
import { useAuth } from '../../contexts/authContext';
import getUserDetails from '../../services/getUserDetails';
import regions from '../../data/regions.json';

const DesktopMenu = () => {
  const {isDisconnected, pairedTo} = useDevice();
  const {currentUser} = useAuth();
  const [userData, setUserData] = useState(null);  // State to store the user data

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser?.uid) { // Ensure there is a current user ID before fetching
        try {
          const fetchedUserData = await getUserDetails(currentUser.uid);
          setUserData(fetchedUserData); // Update state with the fetched user data
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        }
      }
    };

    fetchUserData();
  }, [currentUser , userData]);

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

  const capitalize = (str) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

  const getInitials = (firstName, lastName) => {
    return `${firstName[0]}${lastName[0]}`;
  };

  const getRegionName = (regionId) => {
    const numericRegionId = Number(regionId);
    const region = regions.find(r => r.id === numericRegionId);
    return region ? region.name : 'Region not found';
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
        </div>
        <div>
        <div className="mb-5">
          <ToggleThemeButton />
          </div>
          <div className="p-3 mb-10 bg-bg-main flex flex-col rounded-lg">
            <NavLink to="/account" className="flex items-center space-x-3 text-base">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primaryGradient1 text-bg-outer font-semibold">
                <span>
                  {userData && getInitials(capitalize(userData.firstName), capitalize(userData.lastName))}
                </span>
              </div>
              <div className="flex flex-col">
                <span className='text-base text-text-colour-primary'>{userData && `${capitalize(userData.firstName)} ${capitalize(userData.lastName)}`}</span>
                <span className='text-sm text-text-colour-tertiary'>
                  {userData && getRegionName(userData.regionID)}
                </span>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DesktopMenu;
