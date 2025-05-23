import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button } from 'react-bootstrap';

const moodEmojis = {
  happy: '😊',
  sad: '😢',
  neutral: '😐',
};

export default function CalendarComponent({ onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [moods, setMoods] = useState({});

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const handleMoodChange = (date, mood) => {
    setMoods({
      ...moods,
      [date.toISOString().split('T')[0]]: mood,
    });
  };

  const tileContent = ({ date }) => {
    const mood = moods[date.toISOString().split('T')[0]];
    return mood ? <span>{moodEmojis[mood]}</span> : null;
  };

  return (
    <div className="calendar-container">
      <Calendar
        onClickDay={handleDateClick}
        value={selectedDate}
        className="custom-calendar"
        tileContent={tileContent}
      />

      {selectedDate && (
        <div className="text-center mt-4">
          <h5>Настроение на {selectedDate.toLocaleDateString()}</h5>
          <div className="d-flex justify-content-center gap-3 mt-3">
            {Object.keys(moodEmojis).map((mood) => (
              <Button
                key={mood}
                variant="outline-secondary"
                onClick={() => handleMoodChange(selectedDate, mood)}
              >
                {moodEmojis[mood]} {mood}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
