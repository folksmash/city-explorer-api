'use strict';
require('dotenv').config();
const axios = require('axios');

const weatherAPI = process.env.WEATHER_API_KEY;

class Forecast {
    constructor(obj) {
        this.date = obj.valid_date;
        this.description = obj.weather.description;
        this.clouds = obj.clouds;
        this.maxTemp = obj.max_temp;
        this.minTemp = obj.min_temp;
        this.highTemp = obj.min_temp;
        this.lowTemp = obj.low_temp;
    }
}

let getWeather = async (req, res) => {
    
    let lat = req.query.lat;
    let lon = req.query.lon;
    
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weatherAPI}&days=10`;
    
    try {
        let result = await axios(url);
        console.log(result);
        let weatherData = result.data.data.map(forcast => new Forecast(forcast));
        console.log(weatherData);
        if(weatherData) {
            res.status(200).send(weatherData);
        } else {
            res.status(404).send('undefined');
        }
    } catch {
        return res.status(500).send('no weather');
    }
}

module.exports = getWeather;