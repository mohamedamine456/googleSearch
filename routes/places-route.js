const express = require('express');

const hairdresserControllers = require('../controllers/hairdresser-controller');
const beautysalonControllers = require('../controllers/beautysalon-controller');
const spaControllers = require('../controllers/spa-controller');

const router = express.Router();

router.get('/hairdresser/:city', hairdresserControllers.getPlaces);

router.get('/beautysalon/:city', beautysalonControllers.getPlaces);

router.get('/spa/:city', spaControllers.getPlaces);

module.exports = router;