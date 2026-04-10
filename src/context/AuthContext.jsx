import React, { createContext, useContext, useState, useEffect } from 'react';
import { request } from '../lib/api';

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  user: 'user',
  isAuthenticated: 'isAuthenticated',
  accessToken: 'accessToken'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  const login = (userData, token, role = 'user') => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentRole(role);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
    localStorage.setItem(STORAGE_KEYS.isAuthenticated, 'true');
    localStorage.setItem('currentRole', role);
    if (token) {
      localStorage.setItem(STORAGE_KEYS.accessToken, token);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentRole(null);
    localStorage.removeItem(STORAGE_KEYS.user);
    localStorage.removeItem(STORAGE_KEYS.isAuthenticated);
    localStorage.removeItem(STORAGE_KEYS.accessToken);
    localStorage.removeItem('currentRole');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('reviewerToken');
    localStorage.removeItem('reviewerUser');
    localStorage.removeItem('reviewerAuthenticated');
  };

  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(updatedUser));
  };

  const fetchCurrentUser = async () => {
    try {
      const result = await request('/v1/auth/me');
      if (result.ok && result.data.code === 0) {
        const userData = result.data.data;
        setUser(userData);
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
        return userData;
      }
    } catch (err) {
      console.error('fetchCurrentUser error:', err);
    }
    return null;
  };

  const checkAuth = (role = 'user') => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('currentRole');
    if (storedAuth === 'true' && storedUser && storedRole === role) {
      setIsAuthenticated(true);
      setCurrentRole(role);
      setUser(JSON.parse(storedUser));
    }
  };

  useEffect(() => {
    const storedRole = localStorage.getItem('currentRole');
    if (storedRole) {
      checkAuth(storedRole);
    }
  }, []);

  const hasRole = (requiredRole) => {
    if (!user) return false;
    const roles = user.roles || [];
    const primaryRole = user.primaryRole || user.currentRole;
    return roles.includes(requiredRole) || primaryRole === requiredRole;
  };

  const isAdmin = () => hasRole('operator') || hasRole('super_admin');
  const isReviewer = () => hasRole('reviewer');
  const isContestant = () => hasRole('contestant') || hasRole('team_leader');

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      currentRole,
      login, 
      logout, 
      updateUser, 
      fetchCurrentUser, 
      checkAuth,
      hasRole,
      isAdmin,
      isReviewer,
      isContestant
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;