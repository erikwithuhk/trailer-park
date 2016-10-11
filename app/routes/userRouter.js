const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/', UserController.getAll);
router.get('/:id', UserController.getOne);

// router.get('/', (request, response) => {
//   response.status(200).send('All users');
// });

// router.get('/:id', (request, response) => {
//   const id = request.params.id;
//   response.status(200).send(`User: ${id}`);
// });

module.exports = router;
