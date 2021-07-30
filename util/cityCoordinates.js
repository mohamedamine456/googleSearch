const axios = require('axios');
const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyBoubJB4ISXCOefbW2qpLqBOEf19EepNmg';

async function getCityCoordinates(city) {
    // to be changed after
    city = "Morocco, " + city;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${API_KEY}`);

    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS') {
        const error = new HttpError("Could not find Coordinates for the specified Address.", 422);
        throw error;
    }

    const result = data.results[0].geometry.location;
    return result;
}

module.exports = getCityCoordinates;