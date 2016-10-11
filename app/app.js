
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const userRouter = require('./routes/userRouter.js');
const request = require('superagent');

const app = express();

require('dotenv').config();
process.env.ENV = process.env.ENV || 'dev';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));

app.use('/api/users', userRouter);

const apiKey = process.env.API;
const movieId = 550;

/// ONCE WE ALREADY HAVE THE movieId (above)
// GET DETAILS BASED ON movieId
app.get('/api/trailers/:id', (req, res) => {
  request
    .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos,credits`)
    .catch((err) => {
      res.send(err);
    })
    .then((movieDetails) => {
      res.send(movieDetails.text)
    });
}),

//NEXT WE NEED TO TAKE OUT THE RELEVANT DATA WE WANT (CLEAN IT UP):

module.exports = app;
