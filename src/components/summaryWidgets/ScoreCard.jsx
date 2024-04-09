import React, { useEffect, useState } from 'react';

const ScoreCard = ({ score, date }) => {

    return (
        <div className='flex flex-col gap-0'>
            <div className='flex flex-col gap-5 bg-bg-outer w-min h-min p-6 justify-center items-center rounded-t-2xl'>
                <div className='flex flex-col gap-0 justify-center items-center'>
                    <h2 className='text-text-colour-primary m-0 font-normal text-sm text-center'>{date}</h2>
                </div>
                <div className='flex flex-col gap-0 items-center w-24'>
                    {     score > 90 ? <><h2 className='veryhigh-score-text m-0 text-5xl '>{score}</h2><p className='text-text-colour-tertiary m-0 text-sm'>/100</p></>
                        : score > 70 ? <><h2 className='high-score-text m-0 text-5xl'>{score}</h2><p className='text-text-colour-tertiary m-0 text-sm'>/100</p></>
                        : score > 50 ? <><h2 className='mid-score-text m-0 text-5xl'>{score}</h2><p className='text-text-colour-tertiary m-0 text-sm'>/100</p></>
                        : score > 30 ? <><h2 className='low-score-text m-0 text-5xl'>{score}</h2><p className='text-text-colour-tertiary m-0 text-sm'>/100</p></>
                        : score == "-" ? <h2 className='text-text-colour-tertiary font-normal m-0 text-base text-center'>No Score Recorded</h2>
                        : <><h2 className='verylow-score-text m-0 text-5xl'>{score}</h2><p className='text-text-colour-tertiary m-0 text-sm'>/100</p></>
                    }
                </div>
            </div>
            <div className='flex flex-col gap-0 justify-center items-center bg-bg-main-transparent rounded-b-xl p-1'>
                <h2 className='text-text-colour-secondary m-0 font-semibold text-sm'>View Details</h2>
            </div>
        </div>
    );
};

export default ScoreCard;