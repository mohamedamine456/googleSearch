const axios = require('axios');
const HttpError = require('../models/http-error');

async function getDataByKeyword(coordinates, keyword) {

    let location = coordinates.lat.toString() + "," + coordinates.lng.toString();
    const response = await axios.get(`${process.env.GOOGLE_SEARCHNEARBY_API_URL}/json?location=${location}&radius=2500&keyword=${keyword}&key=${process.env.GOOGLE_API_KEY}`);

    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS') {
        const error = new HttpError("Could not find Places for the specified keyword and coordinates.", 422);
        throw error;
    }

    const result = [];
    for (let index = 0; index < data.results.length; index++) {
        let infos = {
            name: data.results[index].name,
            geometry: data.results[index].geometry,
            photos: data.results[index].photos,
            rating: data.results[index].rating,
            types: data.results[index].types,
            vicinity: data.results[index].vicinity
        };
        result.push(infos);
    }
    return result;
}

module.exports = getDataByKeyword;