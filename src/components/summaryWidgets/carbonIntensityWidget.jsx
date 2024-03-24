import React, { useState, useEffect } from 'react';
import { fetchFutureCIData, fetchPastCIData } from '../../services/getCarbonIntensity';
import cleanCIData from '../../utils/cleanCIData';
import CarbonIntensityChart from '../dataVis/carbonIntensityChart';
import carbonIntensityDescription from '../../utils/carbonIntensityDescription';

const CarbonIntensityWidget = ({ regionID }) => {
  const [cleanedData, setCleanedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [intensityInfo, setIntensityInfo] = useState({ level: '', description: '' });
  const [latestIntensityValue, setLatestIntensityValue] = useState();

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
    <div className="bg-bg-main-transparent box-border border border-white backdrop-blur-sm w-full p-5 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold m-0 text-text-colour-primary text-right">{intensityInfo.level} Carbon Intensity</h1>
        <p className="text-sm font-light text-text-colour-secondary text-right">{latestIntensityValue} gCO2/kWh</p>
        <p className="text-sm font-light text-text-colour-secondary text-right">{intensityInfo.description}</p>
        <p className="text-sm font-light text-text-colour-secondary text-right">
            {isLoading ? "Loading..." : 'Last Updated: 12:00 PM'}
            </p>
        {isLoading ? (
            <div className="flex justify-center items-center h-full">
            <div className="loader"></div> {/* Placeholder for loader element */}
            </div>
        ) : (
            <CarbonIntensityChart data={cleanedData} />
        )}
    </div>
  );
};

export default CarbonIntensityWidget;
