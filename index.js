const express = require('express');
const path = require('path');
const config = require('dotenv').config().parsed;

const dataRouter = require("./src/server/dataRouter");

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/src/views'));

app.use(express.static('dist'));
app.use('/data', dataRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
