'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const getWeather = require('./weather');
const getMovies = require('./movie');

app.use(cors());

const PORT = process.env.PORT

app.get('/movie', getMovies);
app.get('/weather', getWeather);
app.get('/*', (req, res) => res.status(404).send('not found'))





app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));