const axios = require('axios');
const HttpError = require('../models/http-error');

async function getAllCities() {

    const response = await axios.post(`${process.env.COUNTRIES_SNOW_API}`,
    {
        country: "Morocco"
    });

    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS') {
        const error = new HttpError("Could not find Coordinates for the specified Address.", 422);
        throw error;
    }

    const result = data.data;
    return result;
}

module.exports = getAllCities;