'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');
const axios = require('axios')
const app = express();
const getMovies = require('./movie');

app.use(cors());

const PORT = process.env.PORT

const getWeather = async (req, res) => { 
    const lat = req.query.lat;
    const lon = req.query.lon;
    const searchQuery = req.query.searchQuery;
    console.log(weather);
try {
    // const cityLookingfor = weather.find(city => searchQuery === city.city_name);
    const url = `https://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;
    console.log(url);
    const cityLookingfor = await axios.get(url)
    console.log(cityLookingfor);
    const weatherArray = cityLookingfor.data.data.map(day => new Forecast(day));
    res.send(weatherArray);
    } catch(error) {
        console.log(error);
    } 
};

function Forecast(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
}


app.get('/movie', getMovies);
app.get('/weather', getWeather);
app.get('/*', (req, res) => res.status(404).send('not found'))





app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));