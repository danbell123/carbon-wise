import React from 'react';
import MonthlyScoreSummaryCard from './MonthlyScoreSummaryCard';

const ScoresCalendar = ({ year, month, scores }) => {
  // Helper function to get the number of days in the month
  const getDaysInMonth = (year, month) => {
    // Note: Here month is already 1-based coming from the props, so adjust accordingly
    return new Date(year, month, 0).getDate();
  };
  
  const daysInMonth = getDaysInMonth(year, month);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Determine what day of the week the month starts on
  const startDay = new Date(year, month - 1, 1).getDay()-1;

  // Create an array with placeholders for the starting empty days
  const calendarDays = Array(startDay).fill(null).concat(daysArray);

  return (
    <div>
      <h2 className='text-xl w-full m-0 text-text-colour-primary mb-4'>{`Scores for ${year}-${String(month).padStart(2, '0')}`}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
        {calendarDays.map((day, index) => {
          // Construct the date key with proper zero padding for month and day
          const dateKey = day ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` : `empty-${index}`;
          // Access the score using the dateKey; if no score for the day, default to '-'
          const score = day ? scores[dateKey] || '-' : null;
          return <MonthlyScoreSummaryCard key={dateKey} date={day ? dateKey : undefined} score={score} />;
        })}
      </div>
    </div>
  );
};

export default ScoresCalendar;
