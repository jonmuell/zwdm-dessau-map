const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const data = require("./data.json");
const events = require("./events.json");

router.get('/', (req, res) => {
  res.send(data);
});

router.get('/events', (req, res) => {
  const pageName = req.query.pageName

  const filteredEvents = events[pageName];

  if(filteredEvents) {
    res.send(filteredEvents);
  } else {
    res.send([]);
  }
});

router.post('/add', jsonParser, (req, res) => {
  data.push(req.body);
  res.sendStatus(200);
});

module.exports = router;
