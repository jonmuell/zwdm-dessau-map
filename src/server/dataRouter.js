const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {getEventsForLocation} = require("./dynamoDb");

const jsonParser = bodyParser.json();

const data = require("./data.json");
const events = require("./events.json");

router.get('/', (req, res) => {
  res.send(data);
});

router.get('/events', (req, res) => {
  const locationId = req.query.locationId;

  getEventsForLocation(locationId, (data, err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const eventsMap = data.events;
      const eventIds = Object.keys(eventsMap);

      const events = eventIds.map(id => eventsMap[id]);

      res.send(events);
    }
  });
});

router.post('/add', jsonParser, (req, res) => {
  data.push(req.body);
  res.sendStatus(200);
});

module.exports = router;
