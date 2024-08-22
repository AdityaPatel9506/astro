const matchingModel = require('../models/kundaliModel');

const getMatching = async (req, res) => {
  try {
    const params = {
      boy_dob: req.body.boy_dob || req.query.boy_dob,
      boy_tob: req.body.boy_tob || req.query.boy_tob,
      boy_tz: req.body.boy_tz || req.query.boy_tz,
      boy_lat: req.body.boy_lat || req.query.boy_lat,
      boy_lon: req.body.boy_lon || req.query.boy_lon,
      girl_dob: req.body.girl_dob || req.query.girl_dob,
      girl_tob: req.body.girl_tob || req.query.girl_tob,
      girl_tz: req.body.girl_tz || req.query.girl_tz,
      girl_lat: req.body.girl_lat || req.query.girl_lat,
      girl_lon: req.body.girl_lon || req.query.girl_lon,
      lang: req.body.lang || req.query.lang,
      api_key: process.env.API_KEY // API key from environment variable
    };

    const data = await matchingModel.getMatchingData(params);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMatching
};
