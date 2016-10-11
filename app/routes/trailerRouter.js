const express = require('express');
const TrailerController = require('../controllers/TrailerController');

const router = express.Router();

router.get('/', TrailerController.searchTrailers);
router.get('/:id', TrailerController.getTrailerInfo);

module.exports = router;
