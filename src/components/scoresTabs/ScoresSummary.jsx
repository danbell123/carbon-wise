import React, { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';
import { getAuth } from 'firebase/auth';
import getUserScore from '../../services/getUserScores';
import BarLoader from '../../components/loader/barLoader';
import getScoreColor from '../../utils/scoreColour'; 

function ScoresKeyData() {
    const [dailyAverage, setDailyAverage] = useState(null);
    const [highestScore, setHighestScore] = useState(null);
    const [lowestScore, setLowestScore] = useState(null);
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
                const calculatedAverage = (totalScore / countScores).toFixed(0); // Calculate and format
                setDailyAverage({score: calculatedAverage}); // Update state
                scores.sort((a, b) => b.score - a.score);
                setHighestScore({ score: scores[0].score, date: scores[0].date });
                setLowestScore({ score: scores[scores.length - 1].score, date: scores[scores.length - 1].date });
            } else {
                setDailyAverage(null);
                setHighestScore(null);
                setLowestScore(null);
            }

            setLoading({ average: false, highest: false, lowest: false });
        };

        fetchScores().catch(error => {
            console.error(error);
            setLoading({ average: false, highest: false, lowest: false });
        });
    }, []);

    const renderLoader = (message) => (
        <div className='flex flex-col h-full justify-center justify-items-center p-5'>
            <BarLoader />
            <p className="text-center text-text-colour-secondary pt-2">{message}</p>
        </div>
    );

    const renderLoaderOrData = (data, title) => {
        if (!data) {
            return (
                <>
                    <h1 className="text-lg w-full m-0 text-text-colour-primary">{title}</h1>
                    <p className='text-text-colour-secondary m-0 text-base'>No data available</p>
                </>
            );
        }
    
        const scoreClass = getScoreColor(parseInt(data.score, 10)); // Use utility function to get the score class
        const scoreText = data.score !== undefined ? data.score.toString() : 'No score';
        const dateText = data.date ? format(new Date(data.date), 'dd/MM/yyyy') : 'Last 30 days';
    
        return (
            <>
                <h1 className="text-lg w-full m-0 text-text-colour-primary">{title}</h1>
                <h2 className={`${scoreClass} m-0 text-5xl`}>{scoreText}</h2>
                <p className='text-text-colour-tertiary m-0 text-sm'>/100</p>
                <p className='text-text-colour-secondary m-0 text-base'>{dateText}</p>
            </>
        );
    };

    return (
        <div className="flex flex-row gap-4">
            <div className="w-1/3 h-min bg-bg-main-transparent glassEffect p-4 justify-center items-center text-center flex flex-col gap-2 rounded-lg">
                {loading.average ? renderLoader("Loading Daily Average") : renderLoaderOrData(dailyAverage, "Daily Average")}
            </div>
            <div className="w-1/3 h-min bg-bg-main-transparent glassEffect p-4 justify-center items-center text-center flex flex-col gap-2 rounded-lg">
                {loading.highest ? renderLoader("Loading Highest Score") : renderLoaderOrData(highestScore, "Highest Score")}
            </div>
            <div className="w-1/3 h-min bg-bg-main-transparent glassEffect p-4 justify-center items-center text-center flex flex-col gap-2 rounded-lg">
                {loading.lowest ? renderLoader("Loading Lowest Score") : renderLoaderOrData(lowestScore, "Lowest Score")}
            </div>
        </div>
    );
}

export default ScoresKeyData;
