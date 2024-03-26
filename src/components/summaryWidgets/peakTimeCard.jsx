import React, { useEffect, useState } from 'react';
import carbonIntensityDescription from '../../utils/carbonIntensityDescription';

const PeakTimeCard = ({ period, forecast, level, date }) => {
    const [intensityInfo, setIntensityInfo] = useState({ level: '', description: '' });
    const [isLowCarbon, setIsLowCarbon] = useState(false);

    useEffect(() => {
        const info = carbonIntensityDescription(forecast);
        setIntensityInfo(info);

        // Ensure 'Low' matches the case returned by carbonIntensityDescription for low levels
        if (info.level === 'Low') {
            setIsLowCarbon(true);
        }
    }, [forecast]); // If `level` prop directly impacts rendering, consider adding it as a dependency here

    // Correctly apply conditional classes
    const cardClasses = isLowCarbon
        ? "flex flex-row bg-greenGradient p-5 mb-4 rounded-xl items-center justify-center gap-4"
        : "flex flex-row bg-redGradient p-5 mb-4 rounded-xl items-center justify-center gap-4";

    return (
        <div className={cardClasses}>
            <div>
                <span className="material-symbols-outlined text-text-colour-primary">schedule</span>
            </div>
            <div>
                <h2 className='text-text-colour-primary m-0 text-xl pb-4'>{intensityInfo.level} Carbon</h2>
                <p className='text-text-colour-primary text-base m-0'>{period}</p>
                <p className='text-text-colour-primary text-base m-0'>{date}</p>
                <p className='text-text-colour-primary text-base m-0'>{intensityInfo.description}</p>
            </div>
        </div>
    );
};

export default PeakTimeCard;
