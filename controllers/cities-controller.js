const HttpError = require('../models/http-error');
const getAllCities = require('../util/getAllCities');

const getCities = async(req, res, next) => {

    let cities;
    try {
        cities = await getAllCities();
    } catch (error) {
        return next(error);
    }

    if (!cities) {
        const error = new HttpError('Could not find cities in Morocco.', 404);
        return next(error);
    }

    res.json({ cities: cities });
};

exports.getCities = getCities;