const express = require('express');
const bodyParser = require('body-parser');

const HttpError = require('./models/http-error');

const placesRoutes = require('./routes/places-route');

const app = express();

app.use(bodyParser.json());

app.use('/places', placesRoutes);

app.use((req, res, next) => {
    throw new HttpError("Could not find this Route", 404)
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown Error occurred!' });
});

app.listen(3000);