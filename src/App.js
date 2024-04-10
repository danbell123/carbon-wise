import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DesktopMenu from './components/menus/DesktopMenu';
import MobileMenu from './components/menus/MobileMenu';
import Dashboard from './pages/Dashboard/Dashboard';
import LoginRegister from './pages/LoginRegister';
import { AuthProvider, useAuth } from './contexts/authContext';
import { ToastProvider } from './contexts/ToastContext';
import Toast from './components/toast/Toast';
import 'material-symbols';
import PairDevice from './pages/Device/PairDevice';
import YourDevice from './pages/Device/YourDevice';
import ScoresPage from './pages/Scores';
import './App.css';
import { ThemeProvider } from './contexts/themeContext';
import AccountPage from './pages/Settings/Settings';
import CarbonIntensityPage from './pages/CarbonIntensity';
import DeviceStatus from './components/DeviceStatus';
import { useDevice, DeviceProvider } from './contexts/DeviceContext';
import { set } from 'date-fns';
import { getAuth } from 'firebase/auth'
import UsagePage from './pages/Usage';

// A component to protect routes
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
}

// Define a component inside App.js for conditional routing
function ConditionalRoutes() {
  const { pairedTo } = useDevice();

  return (
    <Routes>
      <Route path="/" element={<LoginRegister />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/pair-device" element={pairedTo !=null ? <Navigate to="/your-device" /> : <PrivateRoute><PairDevice /></PrivateRoute>} />
      <Route path="/your-device" element={pairedTo == null ? <Navigate to="/pair-device" /> : <PrivateRoute><YourDevice /></PrivateRoute>} />
      <Route path="/account" element={<PrivateRoute><AccountPage /></PrivateRoute>} />
      <Route path="/carbon-intensity" element={<PrivateRoute><CarbonIntensityPage /></PrivateRoute>} />
      <Route path="/testData" element={<PrivateRoute><DeviceStatus /></PrivateRoute>} />
      <Route path="/your-scores" element={<PrivateRoute><ScoresPage /></PrivateRoute>} />
      <Route path="/your-usage" element={<PrivateRoute><UsagePage /></PrivateRoute>} />
    </Routes>
    
  );
}

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  const isMobile = windowWidth < 768;

  return (
    <AuthProvider>
      <DeviceProvider>
        <ToastProvider>
          <ThemeProvider>
            <Router>
              <div className="App font-rubik flex min-h-screen bg-bg-outer">
                {/* Use ConditionalMenus here to control the visibility of menus */}
                <ConditionalMenus />
                <div 
                  className='flex-grow lg:ml-64 md:ml-64 sm:rounded-3xl first-letter:sm:m-0 sm:m-3 bg-mainBackground bg-cover bg-center overflow-hidden'
                >
                  <ConditionalRoutes />
                </div>
              </div>
            </Router>
          </ThemeProvider>
        </ToastProvider>
      </DeviceProvider>
    </AuthProvider>
);
};

// A child component for handling conditional menu rendering based on user authentication and screen size
const ConditionalMenus = () => {
  const { currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);

      // Close the mobile menu when resizing to desktop size
      if (newWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Determine if we're on a mobile device
  const isMobile = windowWidth < 768;

  // Determine if the menu should be shown (user is logged in)
  const showMenu = !!currentUser;

  return (
    <>
      {showMenu && (
        isMobile ? <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} /> : <DesktopMenu />
      )}
    </>
  );
};


export default App;