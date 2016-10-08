const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));

app.get('/api', (request, response) => {
  response.status(200).send('App loaded');
});

module.exports = app;
