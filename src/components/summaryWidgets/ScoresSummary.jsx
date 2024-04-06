import React, { useState, useEffect } from 'react';
import Button from '../../components/buttons/btn';
import ScoreCard from '../../components/summaryWidgets/ScoreCard';

const ScoresSummary = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Define an array of scores
  const w1scores = [50, 65, 80, 75, 90];
  const w2scores = [10, 65, 80, 9, 90, 55, 60];

  return (
    <div className='w-full'>
        <div className='flex flex-col w-full justify-start gap-0 pb-4'>
            <h2 className='text-2xl font-semibold m-0 text-text-colour-primary'>Your Daily Carbon Scores</h2>
            <p className='text-base font-normal  m-0 text-text-colour-tertiary'>North East England</p>
        </div>

      {loading && <p className='mt-0 text-base text-text-colour-secondary animate-pulse'>Loading...</p>}

        <div className='flex flex-col my-2 gap-4 overflow-hidden'>
            <p className='text-lg font-semibold  m-0 text-text-colour-secondary'>This week: </p>
            <div className='flex flex-row gap-3 overflow-x-auto pb-2'>
                {/* Map over the scores array to render ScoreCards */}
                {w1scores.map((score, index) => (
                    <ScoreCard key={index} score={score} />
                ))}
            </div>
        </div>

        <div className='flex flex-col my-2 gap-4 overflow-hidden'>
            <p className='text-lg font-semibold  m-0 text-text-colour-secondary'>Last week: </p>
            <div className='flex flex-row gap-3 overflow-x-auto pb-2'>
                {/* Map over the scores array to render ScoreCards */}
                {w2scores.map((score, index) => (
                    <ScoreCard key={index} score={score} />
                ))}
            </div>
        </div>

    </div>
  );
};

export default ScoresSummary;
