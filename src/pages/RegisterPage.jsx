// src/components/RegisterPage.jsx
import React, { useState } from 'react';
import { Container, Button, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Пароль должен содержать минимум 8 символов';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    try {
      await register({ username, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Ошибка регистрации');
    }
  };

  return (
    <Container className="py-5 text-center">
      <h1 className="text-title">Регистрация</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} className="calendar-wrapper">
        <Form.Group className="mb-3">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Зарегистрироваться
        </Button>
      </Form>
      <p className="mt-3">
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </Container>
  );
}