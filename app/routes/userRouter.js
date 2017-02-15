const express = require('express');
const trailerRouter = require('./trailerRouter');
const UserController = require('../controllers/UserController');
const UsersTrailersController = require('../controllers/UsersTrailersController');

const router = express.Router();

router.use('/:user_id/trailers', UsersTrailersController.index);

router.get('/', UserController.index);
router.get('/:user_id', UserController.show);
router.patch('/:user_id', UserController.update);
router.delete('/:user_id', UserController.delete);

module.exports = router;
