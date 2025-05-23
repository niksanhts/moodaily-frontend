import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function EmojiSliderModal({ show, onHide, onSave }) {
  const [value, setValue] = useState(50);
  const getEmoji = v => (v < 25 ? '😞' : v < 50 ? '😐' : v < 75 ? '🙂' : '😃');

  const handleSave = () => {
    onSave(value);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Оцените настроение</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <div style={{ fontSize: '3rem' }}>{getEmoji(value)}</div>
        <input
          type="range"
          className="form-range mt-3"
          min={0}
          max={100}
          value={value}
          onChange={e => setValue(+e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Отмена</Button>
        <Button variant="primary" onClick={handleSave}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
  );
}
