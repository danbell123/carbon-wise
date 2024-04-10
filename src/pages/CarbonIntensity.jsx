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

function CarbonIntensityPage() {
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
        const fetchUserRegion = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) throw new Error('No authenticated user found.');

            // Fetch user data to get the region ID
            const userData = await fetchUserData(user.uid);
            setRegionID(userData.regionID);

            const userRegion = regions.find(region => region.id === Number(regionID));
            if (userRegion) {
            setRegionName(userRegion.name); // Step 3: Dynamically set the region name
            }
        };

        const fetchFutureIntensityData = async () => {
            setIsLoading(true);
            try {
                const futureIntensityData = await fetchFutureCIData(48, regionID);
                setCleanedFutureData(futureIntensityData);

            } catch (error) {
                console.error('Failed to fetch future carbon intensity data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserRegion();

        if (pastStartDate && pastEndDate) {
            setIsLoading(true);
            const fetchPastIntensityData = async () => {
                try {
                    const pastIntensityData = await fetchPastCIData(pastStartDate.toISOString(), pastEndDate.toISOString(), regionID);
                    const newCleanedPastData = cleanCIData(pastIntensityData);
                    setPastCleanedData(newCleanedPastData);
                } catch (error) {
                    console.error('Failed to fetch past carbon intensity data:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchPastIntensityData();
        }
        
        fetchFutureIntensityData();   
    }, [regionID, futureStartDate, futureEndDate, pastStartDate, pastEndDate]); 

  return (
    <div className="p-5 pt-20 sm:p-10 flex flex-col gap-10">
        <h1 className="text-4xl w-full m-0 text-text-colour-primary">Carbon Intensity</h1>
        <p className="text-base pt-2 text-text-colour-secondary">Carbon intensity is a measure of the amount of carbon (CO2) emissions produced per unit of electricity consumed. The lower the carbon intensity, the cleaner the electricity. Aim to use your electricity during times of lower carbon intensity.</p>

        <div className="pt-6 pb-2">
            <nav className="flex space-x-4" aria-label="Tabs">
                {['Live Data', 'Past Data', 'Future Data'].map((tab) => (
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
            <div className='bg-bg-main-transparent glassEffect rounded-b-lg p-5'>
            {activeTab === 'Live Data' && 
                <CarbonIntensityLive />
            }
            {activeTab === 'Past Data' && 
                <div>
                    <div className='flex flex-col gap-1 justify-start mb-4'>
                        <h1 className="text-xl m-0 text-text-colour-primary font-semibold">Past Carbon Intensity Data</h1>
                        <p className="text-base pt-2 text-text-colour-secondary">View past carbon intensity data for {regionName}</p>
                    </div>
                    <div className="date-picker-container mb-4">
                        <InputGroup style={{ width: "50%", border: "0px" }}>
                            <DatePicker 
                                format="dd-MM-yyyy - HH:mm"
                                block appearance="subtle"
                                style={{ width: "50%", marginRight: "10px" }} 
                                selected={pastStartDate}
                                onChange={date => setPastStartDate(date)} 
                                showTimeSelect
                                dateFormat="Pp"
                            />
                            <InputGroup.Addon style={{ margin: "0 10px" }}>to</InputGroup.Addon>
                            <DatePicker
                                format="dd-MM-yyyy - HH:mm"
                                block appearance="subtle"
                                style={{ width: "50%", marginLeft: "10px" }}
                                selected={pastEndDate}
                                onChange={date => setPastEndDate(date)} 
                                showTimeSelect
                                dateFormat="Pp"
                            />
                        </InputGroup>
                    </div>
                    <CarbonIntensityChart data={cleanedPastData} />       
                </div>
            }
            {activeTab === 'Future Data' && 
            <div>
                <div className='flex flex-col gap-1 justify-start mb-8'>
                    <h1 className="text-xl m-0 text-text-colour-primary font-semibold">{regionName}'s' 48 Hour Forecast</h1>
                    <p className="text-base pt-2 text-text-colour-secondary">To keep your carbon footprint low, try use your energy during low times.</p>
                </div>
                <CarbonIntensityChart data={cleanedFutureData} />       
            </div>}
        </div>
    </div>
  );
}

export default CarbonIntensityPage;
