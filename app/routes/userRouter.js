const express = require('express');
const UserController = require('../controllers/UserController');
const UserTrailerController = require('../controllers/UserTrailerController');

const router = express.Router();

router.get('/', UserController.index);
router.get('/:user_id', UserController.show);
router.patch('/:user_id', UserController.update);
router.delete('/:user_id', UserController.delete);
// router.get('/:user_id/trailers', UserTrailerController.getTrailers);
// router.post('/:user_id/trailers', UserTrailerController.addTrailer);

module.exports = router;
