import axios from 'axios';

const BASE_URL = 'https://api.carbonintensity.org.uk/regional/intensity';

/**
 * Fetches past carbon intensity data for a specific region over a specific time frame.
 * @param {string} from Start time in ISO 8601 format. e.g "2023-08-25T12:35Z"
 * @param {string} to End time in ISO 8601 format.
 * @param {number} regionID The ID of the region for which to fetch data.
 * @returns {Promise} A promise that resolves with the carbon intensity data.
 */
export const fetchPastCIData = async (from, to, regionID) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${from}/${to}/regionid/${regionID}`, {
      params: { from, to, regionID },
    });
    return data;
  } catch (error) {
    console.error('Error fetching past carbon intensity data:', error);
    throw error;
  }
};

/**
 * Fetches forecasted carbon intensity data for a specific region over a specific time frame.
 * @param {number} length The amount of hours into the future to fetch data for.
 * @param {number} regionID The ID of the region for which to fetch data.
 * @returns {Promise} A promise that resolves with the carbon intensity data.
 */
export const fetchFutureCIData = async (length, regionID) => {
    const from = new Date().toISOString();
    if (length !== 24 && length !== 48) throw new Error('Invalid forecast length');
    try {
        const { data } = await axios.get(`${BASE_URL}/${from}/fw${length}h/regionid/${regionID}`, {
            params: { regionID },
        });

        // Destructure to get to the array of interest
        const { data: { data: dataArray } } = data;

        // Map over the array to extract only the required fields
        return dataArray.map(({ from, to, intensity: { forecast } }) => ({
            from,
            to,
            forecast
        }));

    } catch (error) {
        console.error('Error fetching carbon intensity forecast data:', error);
        throw error;
    }
  };

