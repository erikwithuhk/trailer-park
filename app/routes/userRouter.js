const express = require('express');
const UserController = require('../controllers/UserController');
const UserTrailerController = require('../controllers/UserTrailerController');

const router = express.Router();

router.get('/', UserController.getAll);
router.get('/:user_id', UserController.getOne);
router.get('/:user_id/trailers', UserTrailerController.getTrailers);
router.post('/:user_id/trailers', UserTrailerController.addTrailer);
router.patch('/:user_id', UserController.update);
router.delete('/:user_id', UserController.delete);

module.exports = router;
