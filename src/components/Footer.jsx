import React from 'react';
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-light text-center py-3 mt-auto">
      <Container>
        <small>
          © 2025 • <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
        </small>
      </Container>
    </footer>
  );
}