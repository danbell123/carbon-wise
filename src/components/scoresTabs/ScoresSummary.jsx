import React, { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';
import { getAuth } from 'firebase/auth';
import getUserScore from '../../services/getUserScores';
import BarLoader from '../../components/loader/barLoader';

function ScoresKeyData() {
    const [dailyAverage, setDailyAverage] = useState(0);
    const [highestScore, setHighestScore] = useState({ score: 0, date: '' });
    const [lowestScore, setLowestScore] = useState({ score: 100, date: '' }); // Assuming score range is 0-100
    const [loading, setLoading] = useState({ average: true, highest: true, lowest: true });

    useEffect(() => {
        const fetchScores = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) throw new Error('No authenticated user found.');

            let totalScore = 0;
            let countScores = 0;
            let scores = [];

            for (let i = 0; i < 30; i++) {
                const date = subDays(new Date(), i);
                const dateString = format(date, 'yyyy-MM-dd');
                const score = await getUserScore(user.uid, dateString);
                if (score !== null) {
                    totalScore += score;
                    countScores++;
                    scores.push({ score, date: dateString });
                }
            }

            if (countScores > 0) {
                setDailyAverage((totalScore / countScores).toFixed(1));
                scores.sort((a, b) => b.score - a.score);
                setHighestScore({ score: scores[0].score, date: scores[0].date });
                setLowestScore({ score: scores[scores.length - 1].score, date: scores[scores.length - 1].date });
            }

            // Update loading states
            setLoading({ average: false, highest: false, lowest: false });
        };

        fetchScores().catch(console.error);
    }, []);

    const renderLoader = (message) => (
        <div className='flex flex-col h-full justify-center justify-items-center p-5'>
            <BarLoader />
            <p className="text-center text-text-colour-secondary pt-2">{message}</p>
        </div>
    );

    return (
        <div className="flex flex-row gap-4">
            <div className="w-1/3 h-min bg-bg-main-transparent glassEffect p-4 justify-center items-center text-center flex flex-col gap-2 rounded-lg">
                {loading.average ? renderLoader("Loading Daily Average") : (
                    <>
                        <h1 className="text-lg w-full m-0 text-text-colour-primary">Daily Average</h1>
                        <h2 className='veryhigh-score-text m-0 text-5xl'>{dailyAverage}</h2>
                        <p className='text-text-colour-tertiary m-0 text-sm'>/100</p>
                        <p className='text-text-colour-secondary m-0 text-base'>Last 30 Days</p>
                    </>
                )}
            </div>
            <div className="w-1/3 h-min bg-bg-main-transparent glassEffect p-4 justify-center items-center text-center flex flex-col gap-2 rounded-lg">
                {loading.highest ? renderLoader("Loading Highest Score") : (
                    <>
                        <h1 className="text-lg w-full m-0 text-text-colour-primary">Highest Score</h1>
                        <h2 className='veryhigh-score-text m-0 text-5xl'>{highestScore.score}</h2>
                        <p className='text-text-colour-tertiary m-0 text-sm'>/100</p>
                        <p className='text-text-colour-secondary m-0 text-base'>{format(new Date(highestScore.date), 'dd/MM/yyyy')}</p>
                    </>
                )}
            </div>
            <div className="w-1/3 h-min bg-bg-main-transparent glassEffect p-4 justify-center items-center text-center flex flex-col gap-2 rounded-lg">
                {loading.lowest ? renderLoader("Loading Lowest Score") : (
                    <>
                        <h1 className="text-lg w-full m-0 text-text-colour-primary">Lowest Score</h1>
                        <h2 className='veryhigh-score-text m-0 text-5xl'>{lowestScore.score}</h2>
                        <p className='text-text-colour-tertiary m-0 text-sm'>/100</p>
                        <p className='text-text-colour-secondary m-0 text-base'>{format(new Date(lowestScore.date), 'dd/MM/yyyy')}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default ScoresKeyData;
