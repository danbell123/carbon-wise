import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DesktopMenu from './components/menus/DesktopMenu';
import MobileMenu from './components/menus/MobileMenu';
import Dashboard from './pages/Dashboard/Dashboard';
import LoginRegister from './pages/LoginRegister';
import { AuthProvider, useAuth } from './contexts/authContext';
import { ToastProvider } from './contexts/ToastContext';
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
import UsagePage from './pages/Usage';
import FAQPage from './pages/FAQ';
import Toast from './components/toast/Toast';

// A component to protect routes
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
}

// Define a component inside App.js for conditional routing
function ConditionalRoutes() {
  const { pairedTo } = useDevice();
  const { currentUser } = useAuth();

  return (
    <Routes>
      {/* Redirect signed-in users to the dashboard */}
      <Route path="/" element={currentUser ? <Navigate to="/dashboard" replace /> : <LoginRegister />} />
      
      {/* Protect other routes */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/pair-device" element={pairedTo != null ? <Navigate to="/your-device" /> : <PrivateRoute><PairDevice /></PrivateRoute>} />
      <Route path="/your-device" element={pairedTo == null ? <Navigate to="/pair-device" /> : <PrivateRoute><YourDevice /></PrivateRoute>} />
      <Route path="/account" element={<PrivateRoute><AccountPage /></PrivateRoute>} />
      <Route path="/carbon-intensity" element={<PrivateRoute><CarbonIntensityPage /></PrivateRoute>} />
      <Route path="/testData" element={<PrivateRoute><DeviceStatus /></PrivateRoute>} />
      <Route path="/your-scores" element={<PrivateRoute><ScoresPage /></PrivateRoute>} />
      <Route path="/your-usage" element={<PrivateRoute><UsagePage /></PrivateRoute>} />
      <Route path="/faqs" element={<PrivateRoute><FAQPage /></PrivateRoute>} />
    </Routes>
  );
}

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { currentUser } = useAuth();  // Make sure this destructuring is correct and useAuth() provides a value.

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
      <ToastProvider>
        <DeviceProvider>
          <ThemeProvider>
            <Router>
              <Toast />
              <div className="App font-rubik flex min-h-screen bg-bg-outer">
                <ConditionalMenus />
                {/* Render this div only if the user is logged in */}
                {currentUser && (
                  <div className={`lg:ml-64 md:ml-64 m-0 sm:m-3 flex-grow sm:rounded-3xl bg-mainBackground bg-cover bg-center bg-fixed overflow-y-auto h-screen`}>
                    <ConditionalRoutes />
                  </div>
                )}
                {/* Render this div only if the user is not logged in */}
                {!currentUser && (
                  <div className={`flex-grow bg-mainBackground bg-cover bg-center bg-fixed overflow-y-auto h-screen`}>
                    <ConditionalRoutes />
                  </div>
                )}
              </div>
            </Router>
          </ThemeProvider>
        </DeviceProvider>
      </ToastProvider>
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