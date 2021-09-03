const HttpError = require('../models/http-error');

const getDataByKeyword = require('../util/searchNearby');
const getCityCoordinates = require('../util/cityCoordinates');

const getPlaces = async (req, res, next) => {
    const city = req.params.city;
    
    let coordinates;
    try {
        coordinates = await getCityCoordinates(city);
    } catch (error) {
        return next(error);
    }

    if (!coordinates){
        const error = new HttpError('Could not find a coiffeurs for the provided City.', 404);
        return next(error);
    }

    let places;
    try {
        places = await getDataByKeyword(coordinates, "salon de coiffeure");
    } catch (error) {
        return next(error);
    }

    if (!places){
        const error = new HttpError('Could not find a coiffeurs for the provided City.', 404);
        return next(error);
    }

    res.json({ city: city, length: places.length, places: places });
};

exports.getPlaces = getPlaces;