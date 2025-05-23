import React, { useState } from 'react';
import CalendarComponent from '../components/CalendarComponent';
import DonutChart from '../components/DonutChart';

export default function ProfilePage() {
  const [selectedDate, setSelectedDate] = useState(null);

  const moodData = [
    { name: 'Позитив', value: 12 },
    { name: 'Нейтрально', value: 5 },
    { name: 'Негатив', value: 3 },
  ];

  return (
    <div className="container py-5 text-center">
      <h1 className="text-title mb-3">Личный кабинет</h1>
      <p className="text-subtitle mb-4">Отслеживай своё настроение по дням</p>
      <div className="calendar-wrapper mb-5">
        <CalendarComponent onDateSelect={setSelectedDate} />
      </div>
      <h3 className="mb-3">Статистика настроения</h3>
      <DonutChart data={moodData} />
    </div>
  );
}
