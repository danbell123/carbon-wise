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

function ScoresPage() {
    const [activeTab, setActiveTab] = useState('Monthly');

    useEffect(() => {

    }, []); 

  return (
    <div className="p-5 pt-28 sm:pt-10">
        <div className='mb-10'>
            <h1 className="text-4xl w-full m-0 text-text-colour-primary">Your Daily Carbon Scores</h1>
            <p className="text-base pt-2 text-text-colour-secondary">Carbon intensity is a measure of the amount of carbon (CO2) emissions produced per unit of electricity consumed. The lower the carbon intensity, the cleaner the electricity. Aim to use your electricity during times of lower carbon intensity.</p>
        </div>
        <div className='bg-bg-outer rounded-lg p-8'>
            <h1 className="text-xl w-full m-0 text-text-colour-primary">Summary</h1>
            <p className="text-base text-text-colour-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id ullamcorper urna, nec ornare quam.</p>
            <div className="flex flex-row gap-4 pt-4">
                <div className="w-1/3 h-min bg-bg-main p-4 justify-center items-center text-center flex flex-col gap-2 rounded-lg">
                    <h1 className="text-lg w-full m-0 text-text-colour-primary ">Daily Average</h1>
                    <h2 className='veryhigh-score-text m-0 text-5xl '>56</h2>
                    <p className='text-text-colour-tertiary m-0 text-sm'>/100</p>
                    <p className='text-text-colour-secondary m-0 text-base'>Last 30 Days</p>
                </div>
                <div className="w-1/3 h-min bg-bg-main p-4 justify-center items-center text-center flex flex-col gap-2 rounded-lg">
                    <h1 className="text-lg w-full m-0 text-text-colour-primary ">Highest Score</h1>
                    <h2 className='veryhigh-score-text m-0 text-5xl '>56</h2>
                    <p className='text-text-colour-tertiary m-0 text-sm'>/100</p>
                    <p className='text-text-colour-secondary m-0 text-base'>23/09/2020</p>
                </div>
                <div className="w-1/3 h-min bg-bg-main p-4 justify-center items-center text-center flex flex-col gap-2 rounded-lg">
                    <h1 className="text-lg w-full m-0 text-text-colour-primary ">Lowest Score</h1>
                    <h2 className='veryhigh-score-text m-0 text-5xl '>56</h2>
                    <p className='text-text-colour-tertiary m-0 text-sm'>/100</p>
                    <p className='text-text-colour-secondary m-0 text-base'>23/09/2020</p>
                </div>
            </div>
        </div>
        <div className="pt-6">
            <nav className="flex space-x-4" aria-label="Tabs">
                {['Daily', 'Weekly', 'Monthly'].map((tab) => (
                <a
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 font-medium text-lg rounded-t-lg cursor-pointer
                    ${activeTab === tab ? 'bg-primary-colour text-white' : 'text-text-colour-secondary hover:text-text-colour-primary'}`}
                >
                    {tab}
                </a>
                ))}
            </nav>
        </div>
        <div className='bg-bg-outer rounded-b-lg p-5 border-t-8 border-solid border-primary-colour'>
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
