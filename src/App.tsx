import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router';
import LoginScreen from './auth/login';
import Dashboard from './admin/dashboard';
import './App.css';

// Simple auth context
export const AuthContext = React.createContext({
  isAuthenticated: false,
  login: (access: string, refresh: string) => {

  },
  logout: () => {},
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('accessToken')
  );

  const login = (access: string, refresh: string) => {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken',refresh);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginScreen />} 
          />
          <Route 
            path="/dashboard/*" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;