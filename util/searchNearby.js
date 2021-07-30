const axios = require('axios');
const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyBoubJB4ISXCOefbW2qpLqBOEf19EepNmg';

async function getDataByKeyword(coordinates, keyword) {

    let location = coordinates.lat.toString() + "," + coordinates.lng.toString();
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=2500&keyword=${keyword}&key=${API_KEY}`);

    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS') {
        const error = new HttpError("Could not find Places for the specified keyword and coordinates.", 422);
        throw error;
    }

    const result = data.results;
    return result;
}

module.exports = getDataByKeyword;