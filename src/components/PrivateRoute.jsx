// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function PrivateRoute({ children, setShowAuth }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  if (!token) {
    setShowAuth(true); // Показываем модальное окно
    navigate('/'); // Перенаправляем на главную страницу
    return null;
  }

  return children;
}