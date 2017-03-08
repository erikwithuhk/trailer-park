
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const sassMiddleware = require('node-sass-middleware');

const config = require('./webpack.config');
const app = require('./app/app');

if (!process.env) {
  require('dotenv').config();
}

const port = process.env.PORT;

app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public', 'css'),
  debug: true,
  outputStyle: 'compressed',
  force: true,
  prefix: '/css',
  log: (severity, key, value) => console.log(severity, key, value),
}));

if (process.env.NODE_ENV === 'dev') {
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
  console.log(`Listening on port ${port}`);
});
