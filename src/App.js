import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DesktopMenu from '../src/components/menus/DesktopMenu';
import MobileMenu from '../src/components/menus/MobileMenu';
import Dashboard from '../src/pages/Dashboard/Dashboard';
import LoginRegister from '../src/pages/LoginRegister';
import { AuthProvider, useAuth } from './authContext'; // Adjust the import path as necessary

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
      <div className="App">
        {isMobile ? <MobileMenu /> 
                  : <DesktopMenu />
        }
        <Router>
          <Routes>
            <Route path="/" element={<LoginRegister />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          </Routes>
      </Router>
      </div>
    </AuthProvider>
  );
};

export default App;