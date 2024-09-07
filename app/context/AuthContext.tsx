// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: () => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const { signIn } = useGoogleLogin({
//     onSuccess: () => setIsAuthenticated(true),
//     onFailure: () => setIsAuthenticated(false),
//   });

//   useEffect(() => {
//     // Add logic to check if the user is already authenticated
//     // For example, check if a token is present in localStorage
//     const token = localStorage.getItem('access_token'); // Adjust based on your auth logic
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const login = () => {
//     signIn();
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     localStorage.removeItem('token'); // Adjust based on your auth logic
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
