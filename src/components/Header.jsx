import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Header({ onAuthClick }) {
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload(); // Перезагружаем страницу для обновления состояния
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Moodaily</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Главная</Nav.Link>
            <Nav.Link as={Link} to="/profile">Профиль</Nav.Link>
          </Nav>
          {isAuthenticated ? (
            <Button variant="outline-danger" onClick={handleLogout}>
              Выйти
            </Button>
          ) : (
            <Button variant="outline-primary" onClick={onAuthClick}>
              Войти
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}