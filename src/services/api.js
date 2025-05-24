// src/services/api.js
const API_URL = 'http://localhost:5000';

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Ошибка регистрации');
  }

  return data;
};

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Ошибка авторизации');
  }

  localStorage.setItem('token', data.token);
  return data;
};

export const getUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Токен отсутствует');
  }

  const response = await fetch(`${API_URL}/user`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Ошибка получения данных пользователя');
  }

  return data;
};

export const getItems = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/items`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Ошибка получения данных');
  }

  return response.json();
};

export const addItem = async (item) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Ошибка добавления элемента');
  }

  return response.json();
};

export const updateItem = async (id, item) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Ошибка редактирования элемента');
  }

  return response.json();
};

export const deleteItem = async (id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Ошибка удаления элемента');
  }

  return response.json();
};