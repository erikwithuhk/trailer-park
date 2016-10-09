
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

////ANNIE'S API CALLS BEGIN HERE///////////////////////////////////////////
const apiKey = process.env.API;
const movieId = 550;

/// ONCE WE ALREADY HAVE THE movieId (above)
// GET DETAILS BASED ON movieId
app.get('/', (req, res) => {
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
// original_title: Movie Title
// genres:
// id: Movie ID - need to store this
// poster_path:
// overview:
// credits:Credits (include Director/Crew/Cast)


module.exports = app;
