import { createContext, useContext, useEffect, useState } from 'react';
import { getProfile, loginRequest, registerRequest, subscribePlan } from '../services/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const profileData = await getProfile(token);
        setUser(profileData);
      } catch (err) {
        logout();
      }
    };
    fetchProfile();
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { token: newToken, user: loggedUser } = await loginRequest(email, password);
      setToken(newToken);
      setUser(loggedUser);
      localStorage.setItem('token', newToken);
      return true;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const { token: newToken, user: created } = await registerRequest(payload);
      setToken(newToken);
      setUser(created);
      localStorage.setItem('token', newToken);
      return true;
    } finally {
      setLoading(false);
    }
  };

  const subscribe = async (planId) => {
    if (!token) return false;
    const data = await subscribePlan(token, planId);
    setUser({ ...user, subscriptionPlan: data.plan, subscriptionStatus: 'ACTIVE', subscriptionExpiresAt: data.expiresAt });
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    hasActiveSubscription:
      user?.subscriptionStatus === 'ACTIVE' && user?.subscriptionExpiresAt && new Date(user.subscriptionExpiresAt) > new Date(),
    login,
    logout,
    register,
    subscribe
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
