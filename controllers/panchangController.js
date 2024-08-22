// panchangController.js
const panchangModel = require('../models/panchangModel');


const fetchPanchang = async (req, res) => {
    const { date, time, cityName } = req.body;  // Change to req.body
  
    try {
      const panchangData = await panchangModel.getPanchangDetails(date, time, cityName);
      res.json(panchangData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    fetchPanchang,
  };