import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onAuthClick={() => setShowAuth(true)} />
      <main className="flex-grow-1">
        <Container className="py-4">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute setShowAuth={setShowAuth}>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Container>
      </main>
      <Footer />
      <AuthModal show={showAuth} onHide={() => setShowAuth(false)} />
    </div>
  );
}