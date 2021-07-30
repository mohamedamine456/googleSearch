const express = require('express');

const placesControllers = require('../controllers/places-controller');

const router = express.Router();

router.get('/:city', placesControllers.getPlaces);

module.exports = router;