const mongoose = require('mongoose');

const HttpError = require('../models/http-error');

const City = require('../models/city');

const getAllCities = async (req, res, next) => {

    let cities;
    try {
        cities = await City.find();
    } catch (err) {
        const error = new HttpError('Something Went Wrong could not find cities', 500);
        return next(error);
    }
    
    if (!cities || cities.length === 0) {
        const error = new HttpError('Could not find any city.', 404);
        return next(error);
    }

    res.json({ cities: cities.map(city=> city.toObject({ getters:true })) });
};

exports.getAllCities = getAllCities;