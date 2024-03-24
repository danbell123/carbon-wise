import React, { useState, useEffect } from 'react';
import { fetchFutureCIData } from '../../services/getCarbonIntensity'; // Ensure these functions are implemented correctly
import CustomLineChart from '../dataVis/lineGraph'; 

const CarbonIntensityWidget = () => {
    const [formattedData, setFormattedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFutureCIData(24, '7') // Assuming this function correctly fetches and resolves with the data needed
        .then(fetchedData => {
            const formatted = formatDataForGraph(fetchedData);
            console.log("FORMATTED DATA: ", formatted); // Good for debugging
            setFormattedData(formatted);
            setIsLoading(false);
        })
        .catch(err => {
            setError(err);
            setIsLoading(false);
        });
    }, []); // Empty array to run only once on mount    

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div style={{ height: '400px' }}>
            <CustomLineChart data={formattedData} />
        </div>
    );
};

const formatDataForGraph = (data) => {
    return [
      {
        id: "Carbon Intensity",
        data: data.map(entry => ({
          x: entry.from,
          y: entry.forecast
        }))
      }
    ];
};

export default CarbonIntensityWidget;
