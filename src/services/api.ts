import axios from 'axios';

const RAZORPAY_KEY_ID = 'rzp_test_your_key_id';
const BASE_URL = 'http://localhost:5005/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth endpoints
export const register = async (userData: any) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials: any) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

// Vehicle APIs
export const getVehicles = async () => {
  const response = await api.get('/vehicles');
  return response.data;
};

export const getVehicleById = async (id: string) => {
  const response = await api.get(`/vehicles/${id}`);
  return response.data;
};

export const createVehicle = async (vehicleData: any) => {
  const response = await api.post('/vehicles', vehicleData);
  return response.data;
};

export const updateVehicle = async (id: string, vehicleData: any) => {
  const response = await api.put(`/vehicles/${id}`, vehicleData);
  return response.data;
};

export const deleteVehicle = async (id: string) => {
  const response = await api.delete(`/vehicles/${id}`);
  return response.data;
};

// Fine APIs
export const getFines = async () => {
  const response = await api.get('/fines');
  return response.data;
};

export const getFineById = async (id: string) => {
  const response = await api.get(`/fines/${id}`);
  return response.data;
};

export const getFinesByVehicle = async (vehicleId: string) => {
  const response = await api.get(`/fines/vehicle/${vehicleId}`);
  return response.data;
};

export const createFine = async (fineData: any) => {
  const response = await api.post('/fines', fineData);
  return response.data;
};

export const updateFine = async (id: string, fineData: any) => {
  const response = await api.put(`/fines/${id}`, fineData);
  return response.data;
};

export const deleteFine = async (id: string) => {
  const response = await api.delete(`/fines/${id}`);
  return response.data;
};

// Payment APIs
export const createPaymentOrder = async (fineId: string) => {
  const response = await api.post(`/payments/create-order/${fineId}`);
  return response.data;
};

export const verifyPayment = async (paymentData: any) => {
  const response = await api.post('/payments/verify', paymentData);
  return response.data;
};

// Add auth interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getRazorpayKey = () => RAZORPAY_KEY_ID;
