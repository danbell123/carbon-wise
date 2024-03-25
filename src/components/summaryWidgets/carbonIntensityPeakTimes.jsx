import React, { useState, useEffect } from 'react';
import { fetchFutureCIData } from '../../services/getCarbonIntensity';
import carbonIntensityDescription from '../../utils/carbonIntensityDescription';
import PeakTimeCard from './peakTimeCard';

const CarbonIntensityPeakTimes = () => {
  const [forecastLength, setForecastLength] = useState(24);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const regionID = 8;

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const rawData = await fetchFutureCIData(48, regionID);
      console.log("Raw Data:",rawData);
      const groupedData = groupPeriodsByIntensity(rawData);
      console.log("Grouped Data:",groupedData);
      const topPeriods = rankPeriodsBySignificance(groupedData);
      console.log("Top Periods:",topPeriods);
      setData(topPeriods);
    } catch (error) {
      setError('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [forecastLength, regionID]);

  const handleChange = (event) => {
    setForecastLength(event.target.value);
  };

  return (
    <div className='w-full'>
        <div className='flex justify-center gap-4 pb-4'>
            <h2 className='text-2xl font-semibold m-0 text-text-colour-primary'>Carbon Intensity Forecast</h2>
            <select className="h-min" value={forecastLength} onChange={handleChange}>
                <option value={24}>Next 24 hours</option>
                <option value={48}>Next 48 hours</option>
            </select>
        </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && data.map((item, index) => (
        <PeakTimeCard
          key={index}
          period={item.period}
          forecast={item.averageForecast}
          date={item.date}
          level={item.level}
        />
      ))}
    </div>
  );
};

export default CarbonIntensityPeakTimes;

function rankPeriodsBySignificance(groupedData) {
    console.log("Grouped Data:",groupedData);

    const significanceMap = {
      'Very Low': 3,
      'Low': 1,
      'Moderate': 0,
      'High': 1,
      'Very High': 3
    };
  
    // Rank periods by significance
    let rankedPeriods = groupedData.map(period => ({
      ...period,
      significance: significanceMap[period.level]
    })).sort((a, b) => b.significance - a.significance || new Date(a.from) - new Date(b.from));
  
    // Return the top 4 periods in chronological order
    return rankedPeriods.slice(0, 4).sort((a, b) => new Date(a.from) - new Date(b.from));
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
      }));      
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
  
    // Format date as DD/MM if neither today nor tomorrow
    const formattedDate = `${date.getDate() + 1}/${date.getMonth()}`;
  
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return formattedDate; // Or any other format you prefer
    }
  }