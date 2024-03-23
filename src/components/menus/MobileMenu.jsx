// MobileMenu.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-transparent z-20">
        <div className="flex items-center justify-between p-4">
          {/* Hamburger Icon */}
          <button
            className="text-white focus:outline-none bg-transparent"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          {/* TODO: Account and notifications. */}
          <div>
            <button
              className="text-white focus:outline-none bg-transparent"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button
              className="text-white focus:outline-none bg-transparent"
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
        className={`transform top-0 left-0 w-64 bg-gray-800 text-white fixed h-full overflow-auto z-30 ease-in-out transition-all duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Menu header */}
        <button
            className="text-white focus:outline-none bg-transparent p-5"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        <div className="text-xl font-bold p-5 bg-green-500">
          CarbonWISE
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-5">
          <NavLink to="/dashboard" className="p-2 hover:bg-green-600 rounded">
            Dashboard
          </NavLink>
          <NavLink to="/carbon-intensity" className="p-2 hover:bg-green-600 rounded">
            Carbon Intensity
          </NavLink>
          <NavLink to="/your-usage" className="p-2 hover:bg-green-600 rounded">
            Your Usage
          </NavLink>
          <NavLink to="/your-scores" className="p-2 hover:bg-green-600 rounded">
            Your Scores
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default MobileMenu;
