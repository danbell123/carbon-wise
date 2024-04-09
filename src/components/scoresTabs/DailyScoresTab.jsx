import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import "rsuite/dist/rsuite.css";

function DailyScoreTab() {
    const [cleanedFutureData, setCleanedFutureData] = useState([]);
    const [cleanedPastData, setPastCleanedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [regionID, setRegionID] = useState(null);
    const [futureStartDate, setFutureStartDate] = useState(new Date(new Date().setHours(new Date().getHours() - 12)));
    const [futureEndDate, setFutureEndDate] = useState(new Date());
    const [pastStartDate, setPastStartDate] = useState(null);
    const [pastEndDate, setPastEndDate] = useState(null);
    const [activeTab, setActiveTab] = useState('Live Data');
    const [regionName, setRegionName] = useState(''); 

    useEffect(() => {

    }, []); 

  return (
    <div className="p-5 pt-28 sm:pt-10">
        <div className='mb-10'>
            <h1 className="text-xl w-full m-0 text-text-colour-primary">Yesterday</h1>
        </div>
        <div className="flex flex-row gap-4">
            <div className="w-min h-min bg-bg-main p-6 justify-center items-center text-center flex flex-col gap-2 rounded-lg">
                <h2 className='veryhigh-score-text m-0 text-5xl '>92</h2>
                <p className='text-text-colour-tertiary m-0 text-sm'>/100</p>
            </div>
            <div className="w-full h-min px-4 justify-center items-start text-center flex flex-col gap-2 rounded-lg">
                <h1 className="text-lg m-0 text-text-colour-primary ">Very Good Score</h1>
                <div className='flex flex-row gap-2 items-start justify-start'>
                    <p className='text-text-colour-tertiary m-0 text-base'>Your total CO2 Emissions:</p>
                    <p className='text-text-colour-secondary m-0 text-base'>1689 gCo2</p>
                </div>
                <div className='flex flex-row gap-2 items-start justify-start'>
                    <p className='text-text-colour-tertiary m-0 text-base'>Optimal CO2 Emissions:</p>
                    <p className='text-text-colour-secondary m-0 text-base'>1547 gCo2/kWh</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default DailyScoreTab;
