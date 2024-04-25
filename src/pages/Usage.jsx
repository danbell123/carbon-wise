import React, { useState, useEffect } from 'react';
import CarbonIntensityChart from '../components/dataVis/carbonIntensityChart';
import BarLoader from '../components/loader/barLoader';
import { getAuth } from 'firebase/auth';
import fetchUserData from '../services/getUserDetails'; 
import UsageContainer from '../components/summaryWidgets/UsageContainer';
import CustomDateInput from '../components/inputs/CustomDateInput';
import fetchDeviceReadings from '../services/getDeviceReadings';
import findUserDeviceMacAddress from '../services/getUserDevice';
import UsageChart from '../components/dataVis/usageChart';
import GenerateReadings from '../components/GenerateReadings';

function UsagePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [deviceReadings, setDeviceReadings] = useState([]);
    const [pastStartDate, setPastStartDate] = useState(new Date(new Date().setHours(new Date().getHours() - 24)));
    const [pastEndDate, setPastEndDate] = useState(new Date());
    const [deviceID, setDeviceID] = useState(null);
    const [activeTab, setActiveTab] = useState('Live Usage');

    useEffect(() => {
        const fetchReadings = async () => {
            if (deviceID && pastStartDate && pastEndDate) {
                setIsLoading(true);
                const readings = await fetchDeviceReadings(
                    deviceID,
                    pastStartDate.toISOString(),
                    pastEndDate.toISOString()
                );
                setDeviceReadings(readings);
                setIsLoading(false);
            }
        };

        const auth = getAuth();
        if (auth.currentUser) {
            findUserDeviceMacAddress(auth.currentUser.uid)
                .then(deviceId => {
                    setDeviceID(deviceId);
                })
                .catch(error => console.error("Failed to find device ID:", error));
        }

        fetchReadings();
    }, [pastStartDate, pastEndDate, deviceID]);

    return (
        <div className="p-5 pt-20 sm:p-10 flex flex-col gap-5">
            <h1 className="text-4xl w-full m-0 text-text-colour-primary">Your Usage</h1>
            <p className="text-base text-text-colour-secondary">Home electricity usage data recorded from your energy monitor.</p>

            <div className="pt-4 ">
                <nav className="flex space-x-4" aria-label="Tabs">
                    {['Live Usage', 'Past Usage'].map((tab) => (
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
            <div className='bg-bg-main-transparent glassEffect rounded-b-lg p-5 border-t-8 border-solid border-primary-colour'>
                {activeTab === 'Live Usage' && 
                    <UsageContainer />
                }
                {activeTab === 'Past Usage' && 
                    <div>
                        <div className='flex flex-col gap-1 justify-start mb-4'>
                            <h1 className="text-xl m-0 text-text-colour-primary font-semibold">Past Home Usage Data</h1>
                        </div>
                        <GenerateReadings />
                        <div className="date-picker-container mb-4">
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <CustomDateInput
                                selected={pastStartDate}
                                onChange={date => setPastStartDate(date)}
                                showTimeSelect={false}
                                dateFormat="MMMM d, yyyy"  
                                value={pastStartDate}
                                />
                                <span className='text-text-colour-secondary text-lg'>-</span>
                                <CustomDateInput
                                selected={pastEndDate}
                                onChange={date => setPastEndDate(date)}
                                showTimeSelect={false}  
                                dateFormat="MMMM d, yyyy" 
                                value={pastEndDate}
                                />
                            </div>
                        </div>
                        {isLoading ? <BarLoader /> : <><UsageChart data={deviceReadings} pastStartDate={pastStartDate.toISOString()} pastEndDate={pastEndDate.toISOString()} /></>  } 
                    </div>
                }
            </div>
        </div>
    );
}

export default UsagePage;
