const express = require('express');
const WeatherController = require('../../controllers/weather.controller');

const router = express.Router();

// router.get('/day/:city', WeatherController.getWeatherByCity);
// router.get('/five/:city', WeatherController.getWeatherFiveDayByCity);
// router.get('/sixteen/:city', WeatherController.getWeatherSixteenDayByCity);
router.post('/', WeatherController.getWeatherBylonlat);





module.exports = router;