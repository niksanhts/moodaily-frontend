// src/components/Header.jsx
import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Header() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="navbar-light">
      <Container>
        <Navbar.Brand as={Link} to="/">Moodaily</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Главная</Nav.Link>
            {isAuthenticated && <Nav.Link as={Link} to="/profile">Профиль</Nav.Link>}
          </Nav>
          {isAuthenticated ? (
            <div className="d-flex align-items-center">
              <span className="me-3 text-muted">Привет, {user?.username || 'Пользователь'}!</span>
              <Button variant="outline-danger" onClick={handleLogout}>
                Выйти
              </Button>
            </div>
          ) : (
            <Button as={Link} to="/login" variant="outline-primary">
              Войти
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}