import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePicker, InputGroup } from 'rsuite';
import { UsageStatCard } from '../components/summaryWidgets/UsageStatCard';
import CarbonIntensityChart from '../components/dataVis/carbonIntensityChart';
import { fetchFutureCIData, fetchPastCIData } from '../services/getCarbonIntensity';
import cleanCIData from '../utils/cleanCIData';
import carbonIntensityDescription from '../utils/carbonIntensityDescription';
import BarLoader from '../components/loader/barLoader';
import "rsuite/dist/rsuite.css";
import CarbonIntensityLive from '../components/intensity/CarbonIntensityLive';


function CarbonIntensityPage() {
    const [cleanedData, setCleanedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [intensityInfo, setIntensityInfo] = useState({ level: '', description: '' });
    const [latestIntensityValue, setLatestIntensityValue] = useState();
    const [regionID, setRegionID] = useState(8);
    const [startDate, setStartDate] = useState(new Date(new Date().setHours(new Date().getHours() - 12)));
    const [endDate, setEndDate] = useState(new Date());
    const [activeTab, setActiveTab] = useState('Live Data');

    useEffect(() => {
        const fetchIntensityData = async () => {
            setIsLoading(true);
            try {
                // Use startDate and endDate in the API calls
                const pastIntensityData = await fetchPastCIData(startDate.toISOString(), endDate.toISOString(), regionID);
                
                // For future data, calculate the difference in hours between endDate and now
                const hoursDiff = Math.floor((endDate - new Date()) / 36e5);
                const futureIntensityData = hoursDiff > 0 ? await fetchFutureCIData(hoursDiff, regionID) : [];
        
                // Clean the fetched data and set it to state
                const newCleanedData = cleanCIData(pastIntensityData, futureIntensityData);
                
                // Calculate the latest intensity from the newly cleaned data
                const now = new Date();
                const closestPastData = newCleanedData
                    .filter(d => new Date(d.from) <= now)
                    .reduce((prev, current) => {
                        return (prev === null || new Date(current.from) > new Date(prev.from)) ? current : prev;
                    }, null);

                const currentIntensityValue = closestPastData ? closestPastData.forecast : 0;
                setCleanedData(newCleanedData);
                setLatestIntensityValue(currentIntensityValue);
                setIntensityInfo(carbonIntensityDescription(currentIntensityValue));

            } catch (error) {
                console.error('Failed to fetch carbon intensity data:', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchIntensityData();   
    }, [regionID, startDate, endDate]);

  return (
    <div className="p-5 pt-28 sm:pt-10">
        <h1 className="text-4xl w-full m-0 text-text-colour-primary">Carbon Intensity</h1>
        <h3 className="m-0 text-lg font-normal text-text-colour-secondary">Monitoring your electricty usage 24/7</h3>

        <div className="pt-6">
            <nav className="flex space-x-4" aria-label="Tabs">
                {['Live Data', 'Past Data', 'Future Data'].map((tab) => (
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
            {activeTab === 'Live Data' && 
                <CarbonIntensityLive />
            }
            {activeTab === 'Past Data' && 
                <div>
                    <div className="date-picker-container">
                    <InputGroup style={{ width: "50%", border: "0px" }}>
                        <DatePicker 
                            format="dd-MM-yyyy - HH:mm"
                            block appearance="subtle"
                            style={{ width: "50%", marginRight: "10px" }} // Added marginRight
                            selected={startDate}
                            onChange={date => setStartDate(date)} 
                            showTimeSelect
                            dateFormat="Pp"
                            timeIntervals={15}
                        />
                        <InputGroup.Addon style={{ margin: "0 10px" }}>to</InputGroup.Addon> {/* Adjusted spacing around Addon */}
                        <DatePicker
                            format="dd-MM-yyyy - HH:mm"
                            block appearance="subtle"
                            style={{ width: "50%", marginLeft: "10px" }} // Added marginLeft
                            selected={endDate}
                            onChange={date => setEndDate(date)} 
                            showTimeSelect
                            dateFormat="Pp"
                            timeIntervals={15}
                        />
                    </InputGroup>
                    </div>
                    <CarbonIntensityChart data={cleanedData} />       
                </div>}
            {activeTab === 'Future Data' && 
            <div>
                <div className="date-picker-container">
                <InputGroup style={{ width: "50%", border: "0px" }}>
                    <DatePicker 
                        format="dd-MM-yyyy - HH:mm"
                        block appearance="subtle"
                        style={{ width: "50%", marginRight: "10px" }} // Added marginRight
                        selected={startDate}
                        onChange={date => setStartDate(date)} 
                        showTimeSelect
                        dateFormat="Pp"
                        timeIntervals={15}
                    />
                    <InputGroup.Addon style={{ margin: "0 10px" }}>to</InputGroup.Addon> {/* Adjusted spacing around Addon */}
                    <DatePicker
                        format="dd-MM-yyyy - HH:mm"
                        block appearance="subtle"
                        style={{ width: "50%", marginLeft: "10px" }} // Added marginLeft
                        selected={endDate}
                        onChange={date => setEndDate(date)} 
                        showTimeSelect
                        dateFormat="Pp"
                        timeIntervals={15}
                    />
                </InputGroup>
                </div>
                    <CarbonIntensityChart data={cleanedData} />       
                </div>}
        </div>
    </div>
  );
}

export default CarbonIntensityPage;
