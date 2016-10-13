
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const trailerRouter = require('./routes/trailerRouter.js');
const userRouter = require('./routes/userRouter.js');
const authRouter = require('./routes/authRouter');
const authentication = require('./middleware/authentication');
const session = require('express-session');

const app = express();

process.env.ENV = process.env.ENV || 'dev';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: true,
}));

app.use(logger('dev'));

app.use('/api', authentication);
app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/trailers', trailerRouter);

module.exports = app;
