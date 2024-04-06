import React, { useState, useEffect } from 'react';
import { fetchFutureCIData, fetchPastCIData } from '../../services/getCarbonIntensity';
import cleanCIData from '../../utils/cleanCIData';
import carbonIntensityDescription from '../../utils/carbonIntensityDescription';
import BarLoader from '../../components/loader/barLoader';
import { getAuth } from 'firebase/auth';
import fetchUserData from '../../services/getUserDetails';
import regions from '../../data/regions.json';
import CarbonIntensityVisualization from '../../components/dataVis/carbonIntensityVisualisation';


const CarbonIntensityLive = () => {
  const [cleanedData, setCleanedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [intensityInfo, setIntensityInfo] = useState({ level: '', description: '' });
  const [latestIntensityValue, setLatestIntensityValue] = useState();
  const [regionName, setRegionName] = useState(''); 

  useEffect(() => {

    const fetchIntensityData = async () => {
      setIsLoading(true);
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error('No authenticated user found.');

        // Fetch user data to get the region ID
        const userData = await fetchUserData(user.uid);
        const regionID = userData.regionID;

        const userRegion = regions.find(region => region.id === Number(regionID));
        if (userRegion) {
          setRegionName(userRegion.name); // Step 3: Dynamically set the region name
        }

        const end = new Date();
        const start = new Date();
        start.setHours(end.getHours() - 12);
        
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
  }, []);

  const intensityColour = 
    latestIntensityValue < 50
    ? "veryhigh-score-text"
    : latestIntensityValue >= 50 && latestIntensityValue < 120
    ? "high-score-text"
    : latestIntensityValue >= 120 && latestIntensityValue < 280
    ? "mid-score-text"
    : latestIntensityValue >= 320 && latestIntensityValue < 380
    ? "low-score-text"
    : "verylow-score-text";

  return (
    <div className="w-full h-full">
      {isLoading 
      ? 
        <div className='flex flex-col h-full justify-center justify-items-center p-5'>
          <BarLoader />
          <p className="text-center text-text-colour-secondary p-2">Loading Your Regional Carbon Intensity</p>
        </div>
      :
        <div className='flex flex-row justify-between'>
            <div className='flex flex-col gap-3 justify-start mb-4'>
                <div className='flex flex-row gap-1 justify-start mb-4'>
                    <span className="material-symbols-outlined text-text-colour-secondary mt-0.5">location_on</span>
                    <h1 className="text-base m-0 text-text-colour-secondary font-normal">Regional Data for {regionName}</h1>
                </div>
                <div className='flex flex-col gap-1 justify-start mb-4'>
                    <p className="text-xl font-semibold m-0 text-text-colour-secondary">Latest Carbon Intensity:</p>
                    <p className="text-5xl font-semibold m-0">
                        <span className={intensityColour}>
                            {intensityInfo.level}
                        </span>
                    </p>
                </div>
                <div className='flex flex-row gap-1 justify-start mb-4'>
                    <span className="material-symbols-outlined text-text-colour-secondary mt-2">info</span>
                    <p className="text-base pt-2 text-text-colour-secondary">{intensityInfo.description}</p>
                </div>
            </div>
            <div className='flex flex-col gap-1 justify-start mb-4'>
                <CarbonIntensityVisualization value={latestIntensityValue} maxValue={400} />
            </div>
        </div>
        }
    </div>
  );
};

export default CarbonIntensityLive;
