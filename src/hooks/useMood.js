// src/hooks/useMood.js
import { useState } from 'react';
import { saveMood } from '../api';

export const useMood = () => {
  const [moods, setMoods] = useState({});

  const handleSaveMood = async (date, mood, value) => {
    const savedMood = await saveMood(date, mood, value);
    setMoods((prev) => ({
      ...prev,
      [date]: savedMood,
    }));
  };

  return { moods, handleSaveMood };
};