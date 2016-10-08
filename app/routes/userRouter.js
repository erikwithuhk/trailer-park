const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
  response.status(200).send('All users');
});

router.get('/:id', (request, response) => {
  const id = request.params.id;
  response.status(200).send(`User: ${id}`);
});

module.exports = router;
