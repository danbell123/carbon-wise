import React, { useEffect, useState } from 'react';
import carbonIntensityDescription from '../../utils/carbonIntensityDescription';

const PeakTimeCard = ({ period, forecast, date }) => {
    const [intensityInfo, setIntensityInfo] = useState({ level: '', description: '' });
    const [isLowCarbon, setIsLowCarbon] = useState(false);

    useEffect(() => {
        const info = carbonIntensityDescription(forecast);
        setIntensityInfo(info);

        // Ensure 'Low' matches the case returned by carbonIntensityDescription for low levels
        if (info.level === 'Low' || info.level === 'Very Low') {
            setIsLowCarbon(true);
        }
    }, [forecast]); // If `level` prop directly impacts rendering, consider adding it as a dependency here

    // Correctly apply conditional classes
    const cardClasses = isLowCarbon
        ? "flex flex-row glassEffect bg-greenGradient p-5 mb-4 rounded-xl items-left justify-between gap-6"
        : "flex flex-row glassEffect bg-redGradient p-5 mb-4 rounded-xl items-left justify-between gap-6";

    const iconClasses = isLowCarbon
        ? "material-symbols-outlined text-text-colour-primary mt-1 text-3xl"
        : "material-symbols-outlined text-text-colour-primary mt-1 text-3xl rotate-180";

    return (
        <div className={cardClasses}>
            <div className='flex flex-row gap-3 '>
                <div>
                    <span className={iconClasses} style={{ fontSize: '30px' }}>arrow_cool_down</span>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-text-colour-primary m-0 text-xl pb-4'>{intensityInfo.level} Carbon</h2>
                    <p className='text-text-colour-primary text-base m-0'>{forecast} gCO2/kWh</p>
                </div>
            </div>
            <div className='w-full'>
                <p className='text-text-colour-primary text-sm m-0'>{date}</p>
                <p className='text-text-colour-secondary text-lg m-0'>{period}</p>
                <div className='flex flex-row gap-1 mt-2'>
                    <span className="material-symbols-outlined text-text-colour-tertiary mt-1 " style={{ fontSize: '14px' }}>schedule</span>
                    <p className='text-text-colour-tertiary text-sm m-0 mt-0.5'>{intensityInfo.description}</p>
                </div>
            </div>
        </div>
    );
};

export default PeakTimeCard;
