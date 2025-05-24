import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/api';

export default function AuthModal({ show, onHide }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegistering) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Пароли не совпадают');
        }
        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        alert('Регистрация успешна! Пожалуйста, войдите.');
        setIsRegistering(false);
      } else {
        await login({
          email: formData.email,
          password: formData.password,
        });
        onHide();
        navigate('/profile');
      }
    } catch (err) {
      // Извлекаем сообщение из ответа сервера
      setError(err.message || 'Произошла ошибка. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onHide();
    navigate('/');
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setFormData({ email: '', username: '', password: '', confirmPassword: '' });
    setError(null);
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isRegistering ? 'Регистрация' : 'Авторизация'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email адрес</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите email"
              required
            />
          </Form.Group>

          {isRegistering && (
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Введите имя пользователя"
                required
              />
            </Form.Group>
          )}

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              required
            />
          </Form.Group>

          {isRegistering && (
            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Повторите пароль</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Повторите пароль"
                required
              />
            </Form.Group>
          )}

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Загрузка...' : isRegistering ? 'Зарегистрироваться' : 'Войти'}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column align-items-center">
        <div className="mb-3">
          {isRegistering ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
          <Button variant="link" onClick={toggleMode} className="p-0">
            {isRegistering ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </div>
        <Button variant="secondary" onClick={handleClose} style={{ minWidth: '120px' }}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
}