import React, { useState, useEffect } from 'react';
import Button from '../../components/buttons/btn';
import ScoreCard from '../../components/summaryWidgets/ScoreCard';
import getUserScore from '../../services/getUserScores';
import { useAuth } from '../../contexts/authContext'; // Assuming you have an auth context
import { startOfWeek, subDays, format } from 'date-fns';

const ScoresSummary = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [w1ScoresDates, setW1ScoresDates] = useState([]); // For "this week" scores with dates
  const [w2ScoresDates, setW2ScoresDates] = useState([]); // For "last week" scores with dates
  const { currentUser } = useAuth(); // Assuming your auth context provides this

  const generateWeekDates = (startDate) => {
    return Array.from({ length: 7 }).map((_, index) =>
      format(subDays(startDate, -index), 'yyyy-MM-dd')
    );
  };

  useEffect(() => {
    const fetchScores = async () => {
      if (!currentUser) {
        setError('User not authenticated');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
        const startOfLastWeek = subDays(startOfThisWeek, 7);

        const datesThisWeek = generateWeekDates(startOfThisWeek);
        const datesLastWeek = generateWeekDates(startOfLastWeek);

        const scoresThisWeek = await Promise.all(datesThisWeek.map(async date => ({
          date,
          score: await getUserScore(currentUser.uid, date) || '-'
        })));
        const scoresLastWeek = await Promise.all(datesLastWeek.map(async date => ({
          date,
          score: await getUserScore(currentUser.uid, date) || '-'
        })));

        setW1ScoresDates(scoresThisWeek);
        setW2ScoresDates(scoresLastWeek);
      } catch (err) {
        setError('Failed to fetch scores');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [currentUser]);

  return (
    <div className='w-full'>
        <div className='flex flex-col w-full justify-start gap-0 pb-4'>
            <h2 className='text-2xl font-semibold m-0 text-text-colour-primary'>Your Daily Carbon Scores</h2>
        </div>

      {loading && <p className='mt-0 text-base text-text-colour-secondary animate-pulse'>Loading...</p>}

      <div className='flex flex-col my-2 gap-4 overflow-hidden'>
            <p className='text-lg font-semibold  m-0 text-text-colour-secondary'>This week: </p>
            <div className='flex flex-row gap-3 overflow-x-auto pb-2'>
                {w1ScoresDates.map((item, index) => (
                    <ScoreCard key={index} date={item.date} score={item.score} />
                ))}
            </div>
        </div>

        <div className='flex flex-col my-2 gap-4 overflow-hidden'>
            <p className='text-lg font-semibold  m-0 text-text-colour-secondary'>Last week: </p>
            <div className='flex flex-row gap-3 overflow-x-auto pb-2'>
                {w2ScoresDates.map((item, index) => (
                    <ScoreCard key={index} date={item.date} score={item.score} />
                ))}
            </div>
        </div>

    </div>
  );
};

export default ScoresSummary;
