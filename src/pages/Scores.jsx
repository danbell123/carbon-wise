import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePicker, InputGroup } from 'rsuite';
import CarbonIntensityChart from '../components/dataVis/carbonIntensityChart';
import { fetchFutureCIData, fetchPastCIData } from '../services/getCarbonIntensity';
import cleanCIData from '../utils/cleanCIData';
import carbonIntensityDescription from '../utils/carbonIntensityDescription';
import BarLoader from '../components/loader/barLoader';
import "rsuite/dist/rsuite.css";
import CarbonIntensityLive from '../components/intensity/CarbonIntensityLive';
import regions from '../data/regions.json';
import { getAuth } from 'firebase/auth';
import fetchUserData from '../services/getUserDetails'; 
import DailyScoreTab from '../components/scoresTabs/DailyScoresTab';
import MonthlyScoreTab from '../components/scoresTabs/MonthlyScoresTab';
import ScoresKeyData from '../components/scoresTabs/ScoresSummary';

function ScoresPage() {
    const [activeTab, setActiveTab] = useState('Monthly');

    useEffect(() => {

    }, []); 

  return (
    <div className="p-5 pt-20 sm:p-10 flex flex-col gap-5">
        <div className='mb-0'>
            <h1 className="text-4xl w-full m-0 text-text-colour-primary">Your Daily Carbon Scores</h1>
            <p className="text-base pt-2 text-text-colour-secondary">
                Your carbon scores are calculated based on your daily carbon emissions rated along side the carbon intensity in your region. If you used your eneergy during low carbon intensity periods, you will score higher. Using energy during high carbon intensity periods will result in a lower score.
            </p>
            <p className="text-base pt-2 text-text-colour-secondary">
                Carbon Scores are calulcated just after midnight each day and are based on the previous days energy usage. Come back tommorow to see how you scored today.
            </p>
        </div>
        <ScoresKeyData />
        <div className="pt-4">
            <nav className="flex space-x-4" aria-label="Tabs">
                {['Daily', 'Weekly', 'Monthly'].map((tab) => (
                <a
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 font-medium text-base rounded-t-lg cursor-pointer bg-bg-main-transparent glassEffect
                    ${activeTab === tab ? 'bg-primary-colour text-white' : 'text-text-colour-secondary hover:text-text-colour-primary'}`}
                >
                    {tab}
                </a>
                ))}
            </nav>
        </div>
        <div className='bg-bg-main-transparent glassEffect rounded-b-lg border-t-8 border-solid border-primary-colour'>
            {activeTab === 'Daily' && 
                <DailyScoreTab />
            }
            {activeTab === 'Monthly' && 
                <MonthlyScoreTab />
            }
        </div>
    </div>
  );
}

export default ScoresPage;
