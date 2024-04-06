import React, { useState, useEffect } from 'react';
import { fetchFutureCIData, fetchPastCIData } from '../../services/getCarbonIntensity';
import cleanCIData from '../../utils/cleanCIData';
import CarbonIntensityChart from '../dataVis/carbonIntensityChart';
import carbonIntensityDescription from '../../utils/carbonIntensityDescription';
import BarLoader from '../../components/loader/barLoader';
import { getAuth } from 'firebase/auth';
import fetchUserData from '../../services/getUserDetails';
import Button from '../../components/buttons/btn';

const CarbonIntensityWidget = ({ regionID }) => {
  const [cleanedData, setCleanedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [intensityInfo, setIntensityInfo] = useState({ level: '', description: '' });
  const [latestIntensityValue, setLatestIntensityValue] = useState();

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
  }, [regionID]);


  return (
    <div className="bg-bg-main-transparent box-border border border-white backdrop-blur-sm w-full p-5 rounded-xl shadow-md h-full">
      {isLoading 
      ? 
        <div className='flex flex-col h-full justify-center justify-items-center p-5'>
          <BarLoader />
          <p className="text-center first-letter:text-text-colour-secondary">Loading Your Regional Carbon Intensity</p>
        </div>
      :
        <>
          <h1 className="text-lg m-0 text-text-colour-secondary text-right">Regional Data for North East England </h1>
          <h1 className="text-2xl font-semibold m-0 text-text-colour-primary text-right">NOW: <span className='text-green text-3xl'>{intensityInfo.level}</span> Carbon Intensity</h1>
          <p className="text-sm font-light text-text-colour-secondary text-right">{latestIntensityValue} gCO2/kWh</p>
          <p className="text-sm font-light text-text-colour-secondary text-right">{intensityInfo.description}</p>
          <div className='h-1/2 w-full'>
            <CarbonIntensityChart data={cleanedData} />
          </div>
          <div className='flex flex-row justify-end h-auto w-full'>
            <Button>
              View Full Forecast
            </Button>       
          </div> 
        </>
        }
    </div>
  );
};

export default CarbonIntensityWidget;
