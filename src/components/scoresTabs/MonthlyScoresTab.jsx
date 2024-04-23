import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ScoresCalendar from './scoresCalendar';
import getUserScore from '../../services/getUserScores';
import { getAuth } from 'firebase/auth';
import CustomMonthInput from '../../components/inputs/CustomMonthInput';

function MonthlyScoreTab() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scores, setScores] = useState({});

  useEffect(() => {
    const fetchScoresForMonth = async () => {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1; // Adjust for 1-indexed month
      const daysInMonth = new Date(year, month, 0).getDate();

      const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error('No authenticated user found.');
        
      const scorePromises = [];
  
      for (let day = 1; day <= daysInMonth; day++) {
        const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        scorePromises.push(
          getUserScore(user.uid, dateString)
            .then(score => {
              return { date: dateString, score };
            })
        );
      }
  
      const scoresArray = await Promise.all(scorePromises);
      const scoresObject = scoresArray.reduce((acc, { date, score }) => {
        if (score !== null) {
          acc[date] = score;
        }
        return acc;
      }, {});
  
      setScores(scoresObject);
    };
  
    fetchScoresForMonth().catch(console.error);
  }, [selectedDate]); // This will re-run when selectedDate changes
  

  const handleChange = (date) => {
    setSelectedDate(date);
    // The fetching and state update logic will be triggered by the useEffect hook when selectedDate changes
  };

  return (
    <div className="p-5 pt-28 sm:pt-10">
      <div className="mb-5">
        <CustomMonthInput
          value={selectedDate}
          onChange={handleChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker={true}
          dropdownMode="select"
          onCalendarOpen={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1))}
        />
      </div>
      <ScoresCalendar
        year={selectedDate.getFullYear()}
        month={selectedDate.getMonth() + 1}
        scores={scores}
      />
      
    </div>
  );
}

export default MonthlyScoreTab;
