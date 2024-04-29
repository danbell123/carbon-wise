import React, { useState, useEffect } from 'react';
import { fetchFutureCIData } from '../../services/getCarbonIntensity';
import carbonIntensityDescription from '../../utils/carbonIntensityDescription';
import PeakTimeCard from './peakTimeCard';
import Button from '../../components/buttons/btn';
import fetchUserData from '../../services/getUserDetails';
import regions from '../../data/regions.json';
import { getAuth } from 'firebase/auth';

const CarbonIntensityPeakTimes = () => {
  const initialVisibleItems = 3;
  const [data, setData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(initialVisibleItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [regionName, setRegionName] = useState('');

  useEffect(() => {
    const initializeData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error('No authenticated user found.');

        // Fetch user data to get the region ID
        const userData = await fetchUserData(user.uid);
        if (!userData || userData.regionID === undefined) {
          throw new Error('Region ID for the user is not available');
        }
        const userRegionID = userData.regionID;

        const userRegion = regions.find(region => region.id === Number(userRegionID));
        if (!userRegion) {
          throw new Error('Region not found');
        }
        setRegionName(userRegion.name); // Dynamically set the region name

        // Now fetch the carbon intensity data using the region ID
        await fetchData(userRegionID);
      } catch (error) {
        console.error(error);
        setError(error.message || 'An error occurred');
      }
    };

    initializeData();
  }, []);

  const fetchData = async (regionID) => {
    setLoading(true);
    setError('');
    try {
      const rawData = await fetchFutureCIData(48, regionID);
      const groupedData = groupPeriodsByIntensity(rawData);
      const topPeriods = rankPeriodsBySignificance(groupedData);
      setData(topPeriods); // Set ranked data without sorting it here
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error('No authenticated user found.');

        // Fetch user data to get the region ID
        const userData = await fetchUserData(user.uid);
        if (!userData || userData.regionID === undefined) {
          throw new Error('Region ID for the user is not available');
        }
        const userRegionID = userData.regionID; // This variable holds the region ID


        const userRegion = regions.find(region => region.id === Number(userRegionID));
        if (!userRegion) {
          throw new Error('Region not found');
        }
        setRegionName(userRegion.name); // Set the dynamically determined region name

        // Now fetch the carbon intensity data using the region ID
        await fetchData(userRegionID); // Correctly passing userRegionID to fetchData
      } catch (error) {
        console.error(error);
        setError(error.message || 'An error occurred');
      }
    };

    initializeData();
  }, []);


  const loadMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 3);
  };

  const showLess = () => {
    setVisibleItems(initialVisibleItems); // Reset to initial number of visible items
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col w-full justify-start gap-0 pb-4'>
        <h2 className='text-2xl font-semibold m-0 text-text-colour-primary'>Carbon Intensity Forecast</h2>
        <p className='text-base font-normal  m-0 text-text-colour-tertiary'>{regionName}</p>
      </div>

      {loading && <p className='mt-0 text-base text-text-colour-secondary animate-pulse'>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && sortByDate(data.slice(0, visibleItems))
        .map((item, index) => (
          <PeakTimeCard
            key={index}
            period={item.period}
            forecast={item.averageForecast}
            date={item.date}
            level={item.level}
          />
        ))}
      {!loading && data.length > visibleItems && (
        <Button onClick={loadMore} className="mt-4">
          Show More
        </Button>
      )}
      {!loading && visibleItems >= data.length && visibleItems > initialVisibleItems && (
        <Button onClick={showLess} className="mt-4">
          Show Less
        </Button>
      )}
    </div>
  );
};

export default CarbonIntensityPeakTimes;


function rankPeriodsBySignificance(groupedData) {
  const significanceMap = {
    'Very Low': 3,
    'Low': 1,
    'Moderate': 0,
    'High': 1,
    'Very High': 3
  };

  // Rank periods by significance and then by chronological order to break ties
  return groupedData.map(period => ({
    ...period,
    significance: significanceMap[period.level]
  })).sort((a, b) => b.significance - a.significance || new Date(a.from) - new Date(b.from))
    .slice(0, 3); // Take only the top 5 most significant periods
}


  function sortByDate(data) {
    const sortedData = data.sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate));
    console.log("sortedData: ",sortedData);
    return sortedData;
  }  

  
  function groupPeriodsByIntensity(rawData) {
    let groupedData = rawData.reduce((acc, curr) => {
      const { level } = carbonIntensityDescription(curr.forecast);
      if (acc.length > 0 && acc[acc.length - 1].level === level) {
        acc[acc.length - 1].to = curr.to;
        acc[acc.length - 1].forecasts.push(curr.forecast);
        acc[acc.length - 1].averageForecast = Math.round(acc[acc.length - 1].forecasts.reduce((a, b) => a + b, 0) / acc[acc.length - 1].forecasts.length);
      } else {
        acc.push({ from: curr.from, to: curr.to, level, forecasts: [curr.forecast], averageForecast: curr.forecast });
      }
      return acc;
    }, []);
  
    return groupedData.map(({ from, to, level, averageForecast }) => ({
        period: `${new Date(from).toLocaleTimeString()} - ${new Date(to).toLocaleTimeString()}`,
        date: formatDate(from),
        averageForecast,
        level,
        fullDate: new Date(from)
      }));      
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Format date as DD/MM/YYYY, adjusting month correctly
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return formattedDate; // Display formatted date as DD/MM/YYYY
    }
}