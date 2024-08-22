// panchangModel.js
const axios = require('axios');
require('dotenv').config();
// Function to get the latitude and longitude of a city
const getCoordinates = async (cityName) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: cityName,
        format: 'json',
        limit: 1,
      },
    });

    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { latitude: lat, longitude: lon };
    } else {
      throw new Error('City not found');
    }
  } catch (error) {
    throw new Error('Error fetching coordinates: ' + error.message);
  }
};

// Function to get Panchang details using the provided parameters
const getPanchangDetails = async (date, time, cityName) => {
  try {
    // Get the coordinates of the city
    const coordinates = await getCoordinates(cityName);

    // Call the Panchang API with the obtained coordinates
    const response = await axios.get('https://api.vedicastroapi.com/v3-json/panchang/panchang', {
      params: {
        api_key:  process.env.API_KEY, // Replace with your actual API key
        date: date,
        lat: coordinates.latitude,
        lon: coordinates.longitude,
        tz: 5.5, // Timezone (adjust according to the city)
        lang: 'en',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error fetching Panchang data: ' + error.message);
  }
};

module.exports = {
  getCoordinates,
  getPanchangDetails,
};
