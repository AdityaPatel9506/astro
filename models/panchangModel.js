const axios = require('axios');
const cities = require('all-the-cities');
require('dotenv').config();

// Function to get the latitude and longitude of a city using `all-the-cities`
const getCoordinates = async (cityName) => {
  console.log("Location data called");

  try {
      // Find the city in the `all-the-cities` data
      const city = cities.find(city => city.name.toLowerCase() === cityName.toLowerCase());
      
      if (city) {
          console.log("Location data fetched");
          const { coordinates } = city.loc;
          const [longitude, latitude] = coordinates;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          return { latitude, longitude };
      } else {
          console.log("City not found");
          throw new Error('City not found');
      }
  } catch (error) {
      console.error('Error fetching coordinates:', error.message); // Log the error message
      throw new Error('Error fetching coordinates: ' + error.message);
  }
};

// Function to get Panchang details using the provided parameters
const getPanchangDetails = async (date, time, cityName) => {
  console.log("Panchang data called");
  try {
    // Get the coordinates of the city
    const coordinates = await getCoordinates(cityName);
    
    // Call the Panchang API with the obtained coordinates
    const response = await axios.get('https://api.vedicastroapi.com/v3-json/panchang/panchang', {
      params: {
        api_key: process.env.API_KEY, // Replace with your actual API key
        date: date,
        lat: coordinates.latitude,
        lon: coordinates.longitude,
        tz: 5.5, // Timezone (adjust according to the city)
        lang: 'en',
      },
    });
    
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching Panchang data: ' + error.message);
  }
};

module.exports = {
  getCoordinates,
  getPanchangDetails,
};
