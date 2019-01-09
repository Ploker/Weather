var express = require('express');

var weather = require('./api/wheather.route');
var city = require('./api/city.route');

var router = express.Router();

router.use('/weather',weather);
router.use('/city',city);

module.exports = router;
