const axios = require('axios');
const HttpError = require('../models/http-error');

async function getCityCoordinates(city) {
    // to be changed after
    city = "Morocco, " + city;
    const response = await axios.get(`${process.env.GOOGLE_GEOCODE_API_URL}/json?address=${city}&key=${process.env.GOOGLE_API_KEY}`);

    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS') {
        const error = new HttpError("Could not find Coordinates for the specified Address.", 422);
        throw error;
    }

    const result = data.results[0].geometry.location;
    return result;
}

module.exports = getCityCoordinates;