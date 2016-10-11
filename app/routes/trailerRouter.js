const express = require('express');
const TrailerController = require('../controllers/TrailerController');

const router = express.Router();

router.get('/', TrailerController.searchTrailers);
router.get('/:trailer_id', TrailerController.getTrailerInfo);

module.exports = router;
