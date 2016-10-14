const express = require('express');
const TrailerController = require('../controllers/TrailerController');

const router = express.Router();

router.get('/search', TrailerController.searchTrailers);
router.get('/popular', TrailerController.popularTrailers);
router.get('/:trailer_id', TrailerController.getTrailerInfo);

module.exports = router;
