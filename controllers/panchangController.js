// panchangController.js
const panchangModel = require('../models/panchangModel');

const fetchPanchang = async (req, res) => {
  const { date, time, cityName } = req.query;  // Change to req.query for GET requests
  console.log(req.query);
  try {
      const panchangData = await panchangModel.getPanchangDetails(date, time, cityName);
      res.json({ status: 200, response: panchangData });
  } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
  }
};
  
  module.exports = {
    fetchPanchang,
  };