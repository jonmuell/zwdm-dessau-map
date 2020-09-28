const express = require('express');
const path = require('path');
const config = require('dotenv').config().parsed;

const app = express();
const port = 3000;

const MAPBOX_API_KEY = config["MAPBOX_API_KEY"];

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/src/views'));

app.get('/', (req, res) => {
  res.render('index', { MAPBOX_API_KEY });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
