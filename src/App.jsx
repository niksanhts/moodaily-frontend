import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onAuthClick={() => setShowAuth(true)} />
      <main className="flex-grow-1 container py-4">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
      <AuthModal show={showAuth} onHide={() => setShowAuth(false)} />
    </div>
  );
}
