
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const trailerRouter = require('./routes/trailerRouter.js');
const userRouter = require('./routes/userRouter.js');

const app = express();

process.env.ENV = process.env.ENV || 'dev';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));

app.use('/api/users', userRouter);
app.use('/api/trailers', trailerRouter);

module.exports = app;
