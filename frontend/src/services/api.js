import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
});

const authHeader = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const loginRequest = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data.data;
};

export const registerRequest = async (payload) => {
  const { data } = await api.post('/auth/register', payload);
  return data.data;
};

export const getProfile = async (token) => {
  const { data } = await api.get('/auth/me', authHeader(token));
  return data.data;
};

export const fetchDashboard = async (token) => {
  const { data } = await api.get('/reports/dashboard', authHeader(token));
  return data.data;
};

export const fetchProducts = async (token, params = {}) => {
  const { data } = await api.get('/products', { ...authHeader(token), params });
  return data.data;
};

export const fetchMovements = async (token) => {
  const { data } = await api.get('/movements', authHeader(token));
  return data.data;
};

export const fetchPlans = async () => {
  const { data } = await api.get('/subscriptions');
  return data.data;
};

export const subscribePlan = async (token, planId) => {
  const { data } = await api.post('/subscriptions/subscribe', { planId }, authHeader(token));
  return data.data;
};
