const cleanCIData = (pastData, forecastData) => {
  // Extract the actual data array from pastData, considering its nested structure
  const pastDataArray = pastData.data && pastData.data.data ? pastData.data.data : [];

  // Ensure forecastData is an array before proceeding
  const safeForecastData = Array.isArray(forecastData) ? forecastData : [];

  // Combine both data sets
  const combinedData = [...pastDataArray, ...safeForecastData];

  // Extract 'from', 'to', and 'forecast' from each entry
  // Note that pastData requires accessing 'intensity.forecast', while forecastData already has 'forecast' at the top level
  const extractedData = combinedData.map(({ from, to, intensity, forecast }) => ({
    from,
    to,
    forecast: forecast || (intensity ? intensity.forecast : null) // Use forecast directly if present, else try to get intensity.forecast
  }));

  console.log('CLEANED DATA:', extractedData);

  return extractedData;
};

export default cleanCIData;
