import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Register user
export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

// Login user
export const loginUser = async (userData) => {
  const response = await api.post('/users/login', userData);
  return response.data;
};

// Get user info
export const getUserInfo = async (token) => {
  const response = await api.get('/users', {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

// Get tasks
export const getTasks = async (token) => {
  const response = await api.get('/tasks', {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

// Add task
export const addTask = async (taskData, token) => {
  const response = await api.post('/tasks', taskData, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

// Update task
export const updateTask = async (id, taskData, token) => {
  const response = await api.put(`/tasks/${id}`, taskData, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

// Delete task
export const deleteTask = async (id, token) => {
  const response = await api.delete(`/tasks/${id}`, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};
