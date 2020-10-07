const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const data = require("./data.json");

router.get('/', (req, res) => {
  res.send(data);
});

router.get('/add', (req, res) => {
  res.render('addData');
});

router.post('/add', jsonParser, (req, res) => {
  data.push(req.body);
  res.sendStatus(200);
});

module.exports = router;
