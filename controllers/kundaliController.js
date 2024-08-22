// controllers/matchingController.js
const matchingModel = require('../models/kundaliModel');

const getMatching = async (req, res) => {
  try {
    const params = {
      boy_dob: req.query.boy_dob,
      boy_tob: req.query.boy_tob,
      boy_tz: req.query.boy_tz,
      boy_lat: req.query.boy_lat,
      boy_lon: req.query.boy_lon,
      girl_dob: req.query.girl_dob,
      girl_tob: req.query.girl_tob,
      girl_tz: req.query.girl_tz,
      girl_lat: req.query.girl_lat,
      girl_lon: req.query.girl_lon,
      lang: req.query.lang,
      style: req.query.style,
      color: req.query.color,
      boy_pob: req.query.boy_pob,
      girl_pob: req.query.girl_pob,
      boy_name: req.query.boy_name,
      girl_name: req.query.girl_name
    };

    const data = await matchingModel.getMatchingData(params);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMatching };
