const express = require('express');
const UserTrailerController = require('../controllers/UserTrailerController');

const router = express.Router();

router.get('/', UserTrailerController.index);

module.exports = router;
