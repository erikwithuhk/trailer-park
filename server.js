
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-DEV-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config');
const app = require('./app/app');

if (!process.env) {
  require('dotenv').config();
}

const port = process.env.PORT;

if (process.env.ENV === 'dev') {
  const compiler = webpack(config);
  const middleware = webpackDevMiddleware(compiler, {
    stats: {
      colors: true,
      chunks: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(port, () => {
  console.log(`${process.env.ENV.toUpperCase()}: Listening on port ${port}`);
});
