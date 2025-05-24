import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import CalendarComponent from '../components/CalendarComponent';
import DonutChart from '../components/DonutChart';
import { getItems, addItem, updateItem } from '../services/api';

export default function ProfilePage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [moods, setMoods] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMoods = async () => {
      setLoading(true);
      try {
        const data = await getItems();
        setMoods(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMoods();
  }, []);

  const uniqueMoods = [];
  const seenDates = new Set();
  for (const mood of moods.slice().reverse()) {
    if (!seenDates.has(mood.date)) {
      seenDates.add(mood.date);
      uniqueMoods.push(mood);
    }
  }

  const moodData = [
    { name: 'Позитив', value: uniqueMoods.filter((m) => m.mood === 'happy').length },
    { name: 'Нейтрально', value: uniqueMoods.filter((m) => m.mood === 'neutral').length },
    { name: 'Негатив', value: uniqueMoods.filter((m) => m.mood === 'sad').length },
  ];

  const handleMoodChange = async (date, mood) => {
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setDate(currentDate.getDate() - 5);

    if (date < minDate || date > currentDate) {
      setError('Можно выбирать настроение только за последние 5 дней.');
      return;
    }

    try {
      const dateStr = date.toISOString().split('T')[0];
      const existingMood = moods.find((m) => m.date === dateStr);
      let response;
      if (existingMood) {
        response = await updateItem(existingMood.id, { date: dateStr, mood });
        setMoods(moods.map((m) => (m.date === dateStr ? response : m)));
      } else {
        const newMood = { date: dateStr, mood };
        response = await addItem(newMood);
        setMoods([...moods, response]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="py-5 text-center">
      <h1 className="text-title">Личный кабинет</h1>
      <p className="text-subtitle">Отслеживай своё настроение по дням</p>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <p>Загрузка...</p>}
      <div className="calendar-wrapper">
        <CalendarComponent
          moods={moods}
          onDateSelect={setSelectedDate}
          onMoodChange={handleMoodChange}
        />
      </div>
      <h3 className="text-title">Статистика настроения</h3>
      <DonutChart data={moodData} />
    </Container>
  );
}