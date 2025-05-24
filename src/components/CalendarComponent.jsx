import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button } from 'react-bootstrap';

const moodEmojis = {
  happy: '😊',
  sad: '😢',
  neutral: '😐',
};

export default function CalendarComponent({ moods, onDateSelect, onMoodChange }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = new Date();
  const minDate = new Date();
  minDate.setDate(currentDate.getDate() - 5); // 5 дней назад

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const tileContent = ({ date }) => {
    const dateStr = date.toISOString().split('T')[0];
    const mood = moods.find(m => m.date === dateStr)?.mood;
    return mood ? <span>{moodEmojis[mood]}</span> : null;
  };

  // Проверяем, находится ли дата в допустимом диапазоне (последние 5 дней)
  const isValidDate = selectedDate && selectedDate >= minDate && selectedDate <= currentDate;

  return (
    <div className="calendar-container">
      <Calendar
        onClickDay={handleDateClick}
        value={selectedDate}
        className="custom-calendar"
        tileContent={tileContent}
        minDate={minDate} // Ограничиваем минимальную дату
        maxDate={currentDate} // Ограничиваем максимальную дату
      />
      {selectedDate && isValidDate && (
        <div className="text-center mt-4">
          <h5>Настроение на {selectedDate.toLocaleDateString()}</h5>
          <div className="d-flex justify-content-center gap-3 mt-3">
            {Object.keys(moodEmojis).map((mood) => (
              <Button
                key={mood}
                variant="outline-secondary"
                onClick={() => onMoodChange(selectedDate, mood)}
              >
                {moodEmojis[mood]} {mood}
              </Button>
            ))}
          </div>
        </div>
      )}
      {selectedDate && !isValidDate && (
        <div className="text-center mt-4 text-muted">
          <p>Можно выбирать настроение только за последние 5 дней.</p>
        </div>
      )}
    </div>
  );
}