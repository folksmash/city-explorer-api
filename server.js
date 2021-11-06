'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const getWeather = require('./getWeather')

const app = express();

app.use(cors());

const PORT = process.env.PORT 

// app.get('/weather', getWeather);
app.get('/*', (req, res) => res.status(404).send('not found'))

app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));