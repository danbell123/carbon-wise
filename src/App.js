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
import './App.css';
import { ThemeProvider } from './contexts/themeContext';

// A component to protect routes
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
}

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    
    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768; // Assume 768px is the breakpoint for mobile devices

  return (
  <AuthProvider>
    <ToastProvider>
      <ThemeProvider>
        <div className="App font-rubik flex min-h-screen">
          <Router>
            {/* Sidebar or Mob Menu*/}
            <ConditionalMenus />

            {/* Main Content */}
            <div className="flex-grow lg:ml-64 md:ml-64 sm:ml-0">
              <Routes>
                <Route path="/" element={<LoginRegister />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/pair-device" element={<PrivateRoute><PairDevice /></PrivateRoute>} />
                <Route path="/your-device" element={<PrivateRoute><YourDevice /></PrivateRoute>} />
              </Routes>
              <Toast />
            </div>
          </Router>
        </div>
      </ThemeProvider>
    </ToastProvider>
  </AuthProvider>

  );
};

// A child component for handling conditional menu rendering
const ConditionalMenus = () => {
  const { currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close the mobile menu when resizing to desktop size
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <>
      {isMobile ? (
        <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      ) : (
        currentUser && <DesktopMenu />
      )}
    </>
  );
};


export default App;