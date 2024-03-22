import React, { useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Create a React Context for authentication. This context will be used to provide and consume the authentication state throughout the app.
const AuthContext = React.createContext();

// Custom hook to allow easy consumption of the authentication context anywhere in the app. This hook simplifies accessing the current user and authentication state.
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component wraps the app's components and provides the authentication state to them. It manages the current user state and loading state.
export const AuthProvider = ({ children }) => {

  // State to hold the current user. Undefined if no user is logged in.
  const [currentUser, setCurrentUser] = useState();

  // Loading state to delay the rendering of the app until the current user is determined. This prevents flash of unauthorized content.
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const auth = getAuth(); // Initialize Firebase Auth instance.
    
    // Set up an observer on the Auth object to listen for changes in the authentication state. This effectively detects login and logout actions.
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user); // Update state with the currently logged-in user or null if no user is logged in.
      setLoading(false); // Set loading to false once the authentication state is determined to proceed with rendering the app.
    });

    // Cleanup function: the returned function from useEffect will be called when the component unmounts. It unsubscribes from the authentication listener.
    return unsubscribe;
  }, []);

  // The value to be provided by the AuthContext.Provider. Includes the current user object.
  const value = { currentUser };

  return (
    // The AuthContext provider makes the authentication state accessible to any child components. It only renders children when not loading, ensuring the authentication state is determined first.
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
