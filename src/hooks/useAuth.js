// src/hooks/useAuth.js
import { useState } from 'react';
import { login, register } from '../api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleLogin = async (email, password) => {
    const { token, user } = await login(email, password);
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token); // Сохраняем токен
  };

  const handleRegister = async (email, username, password) => {
    const { token, user } = await register(email, username, password);
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
  };

  return { user, token, handleLogin, handleRegister };
};