import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function AuthModal({ show, onHide }) {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleMode = () => setIsRegistering(!isRegistering);

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isRegistering ? 'Регистрация' : 'Авторизация'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email адрес</Form.Label>
            <Form.Control type="email" placeholder="Введите email" />
          </Form.Group>

          {isRegistering && (
            <Form.Group controlId="formUsername" className="mt-3">
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control type="text" placeholder="Введите имя пользователя" />
            </Form.Group>
          )}

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" placeholder="Введите пароль" />
          </Form.Group>

          {isRegistering && (
            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Label>Повторите пароль</Form.Label>
              <Form.Control type="password" placeholder="Повторите пароль" />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column align-items-center">
        <div className="mb-3">
          {isRegistering ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
          <Button variant="link" onClick={toggleMode} className="p-0">
            {isRegistering ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </div>
        <div className="d-flex gap-3 justify-content-center w-100">
          <Button variant="secondary" onClick={onHide} style={{ minWidth: '120px' }}>
            Отмена
          </Button>
          <Button variant="primary" style={{ minWidth: '120px' }}>
            {isRegistering ? 'Зарегистрироваться' : 'Войти'}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}