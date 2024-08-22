// models/matchingModel.js
const axios = require('axios');
require('dotenv').config();

const API_URL = 'https://api.vedicastroapi.com/v3-json/pdf/matching';
const API_KEY = process.env.API_KEY;

const getMatchingData = async (params) => {
  try {
    const response = await axios.get(API_URL, { params: { ...params, api_key: API_KEY } });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

module.exports = { getMatchingData };
