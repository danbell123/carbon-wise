import React, { useState, useEffect }from 'react';
import { UsageStatCard } from '../components/summaryWidgets/UsageStatCard';
import CarbonIntensityChart from '../components/dataVis/carbonIntensityChart';
import { fetchFutureCIData, fetchPastCIData } from '../services/getCarbonIntensity';
import cleanCIData from '../utils/cleanCIData';
import carbonIntensityDescription from '../utils/carbonIntensityDescription';
import BarLoader from '../components/loader/barLoader';

function CarbonIntensityPage() {
    const [cleanedData, setCleanedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [intensityInfo, setIntensityInfo] = useState({ level: '', description: '' });
    const [latestIntensityValue, setLatestIntensityValue] = useState();
    const [regionID, setRegionID] = useState(8);

    useEffect(() => {
        const fetchIntensityData = async () => {
        setIsLoading(true);
        try {
            const end = new Date();
            const start = new Date();
            start.setHours(end.getHours() - 12);
            const regionID = 8
            
            // Fetch past carbon intensity data
            const pastIntensityData = await fetchPastCIData(start.toISOString(), end.toISOString(), regionID);
            
            // Fetch forecasted carbon intensity data
            const futureIntensityData = await fetchFutureCIData(24, regionID);
    
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
            setIsLoading(false); // Set loading to false when the fetch completes
        }
        };
    
        fetchIntensityData();
    }, [regionID]);


  return (
    <div className="p-5 pt-28 sm:pt-10">
        <h1 className="text-3xl font-bold mb-2">Your Page Title</h1>
        <p className="text-lg">Here's a short description of your page. It explains what this page is about.</p>

        <div className='w-full h-screen'>
            <CarbonIntensityChart data={cleanedData} />       
        </div>
    </div>
  );
}

export default CarbonIntensityPage;
