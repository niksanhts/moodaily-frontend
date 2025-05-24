import React, { useContext, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function MainPage() {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Container className="py-5 text-center">
      <h1 className="text-title">Добро пожаловать в Moodaily!</h1>
      <p className="text-subtitle">Отслеживайте своё настроение и анализируйте свои эмоции.</p>
      <Button as={Link} to="/register" variant="primary">
        Зарегистрироваться
      </Button>
    </Container>
  );
}