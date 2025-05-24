import React from 'react';
import { Container } from 'react-bootstrap';

export default function MainPage() {
  return (
    <Container className="text-center">
      <h1 className="text-title">Добро пожаловать!</h1>
      <p className="text-subtitle">Это главная страница вашего приложения.</p>
    </Container>
  );
}