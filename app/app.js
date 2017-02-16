const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const trailerRouter = require('./routes/trailerRouter.js');
const userRouter = require('./routes/userRouter.js');
const authRouter = require('./routes/authRouter');
const authentication = require('./middleware/authentication');

const app = express();

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

if (!process.env) {
  require('dotenv').config();
}

if (process.env.ENV === 'dev') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


if(process.env.ENV !== 'dev') {
  app.use('/api', authentication);
  app.use('/api', authRouter);
}

app.use('/api/users', userRouter);
app.use('/api/trailers', trailerRouter);

module.exports = app;
