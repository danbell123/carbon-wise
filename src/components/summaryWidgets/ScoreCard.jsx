import React from 'react';
import getScoreColor from '../../utils/scoreColour'; // Import the utility function

const ScoreCard = ({ score, date }) => {
    const scoreClass = getScoreColor(score); // Get the appropriate class for the score

    return (
        <div className='flex flex-col gap-0 bg-bg-main-transparent glassEffect'>
            <div className='flex flex-col gap-5 w-min h-min p-6 justify-center items-center rounded-t-2xl'>
                <div className='flex flex-col gap-0 justify-center items-center'>
                    <h2 className='text-text-colour-primary m-0 font-normal text-sm text-center'>{date}</h2>
                </div>
                <div className='flex flex-col gap-0 items-center w-24'>
                    <h2 className={`${scoreClass} m-0 text-5xl`}>{score}</h2>
                    <p className='text-text-colour-tertiary m-0 text-sm'>/100</p>
                </div>
            </div>
            <div className='flex flex-col gap-0 justify-center items-center bg-bg-main-transparent rounded-b-xl p-1'>
                <h2 className='text-text-colour-secondary m-0 font-semibold text-sm'>View Details</h2>
            </div>
        </div>
    );
};

export default ScoreCard;
