const axios = require('axios');

const getMatchingData = async (params) => {
  try {
    const response = await axios.get('https://api.vedicastroapi.com/v3-json/matching/ashtakoot-with-astro-details', {
      params: {
        boy_dob: params.boy_dob,
        boy_tob: params.boy_tob,
        boy_tz: params.boy_tz,
        boy_lat: params.boy_lat,
        boy_lon: params.boy_lon,
        girl_dob: params.girl_dob,
        girl_tob: params.girl_tob,
        girl_tz: params.girl_tz,
        girl_lat: params.girl_lat,
        girl_lon: params.girl_lon,
        lang: params.lang,
        api_key: params.api_key
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch matching data: ${error.message}`);
  }
};

module.exports = {
  getMatchingData
};
