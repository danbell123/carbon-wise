import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAuth } from 'firebase/auth';
import getUserScore from '../../services/getUserScores';
import { format } from 'date-fns';
import CustomDateInput from '../../components/inputs/CustomDateInput';

function DailyScoreTab() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchScoreForDate = async () => {
      const dateString = format(selectedDate, 'yyyy-MM-dd');

      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user found.');

      const fetchedScore = await getUserScore(user.uid, dateString);
      setScore(fetchedScore || null);  // Store the fetched score or null if not found
    };

    fetchScoreForDate().catch(console.error);
  }, [selectedDate]);  // Fetch new score whenever the selected date changes

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  const renderDayScore = () => {
    if (score) {
      return (
        <div className="flex flex-row gap-4 py-8 glassEffectNoShadow">
          <div className="w-full h-min px-4 justify-center items-start text-center flex flex-col gap-2 rounded-lg">
            <h1 className="text-xl text-text-colour-primary">{formatDate(selectedDate)}</h1>
            <h1 className="text-base m-0 text-text-colour-primary">Very Good Score</h1>
          </div>
          <div className="w-min h-min p-6 justify-center items-center text-center flex flex-col gap-2 rounded-lg">
            <h2 className='veryhigh-score-text m-0 text-5xl'>{score}</h2>
            <p className='text-text-colour-tertiary m-0 text-sm'>/100</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row gap-4 py-8 glassEffectNoShadow">
          <div className="w-full h-min px-4 justify-center items-start text-center flex flex-col gap-2 rounded-lg">
            <h1 className="text-xl text-text-colour-primary">{formatDate(selectedDate)}</h1>
            <h1 className="text-base m-0 text-text-colour-primary">No Score Recorded</h1>
          </div>
        </div>
      );
    }
  };

  const formatDate = (date) => {
    return format(date, 'EEEE do MMMM');
  };

  return (
    <div className="p-5 pt-28 sm:pt-10">
      <div className="mb-5">
        <CustomDateInput value={selectedDate} onChange={handleChange} />
      </div>
      <div>
        {renderDayScore()}
      </div>
    </div>
  );
}

export default DailyScoreTab;
