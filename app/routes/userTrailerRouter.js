const express = require('express');
const UserTrailerController = require('../controllers/UserTrailerController');

const router = express.Router({ mergeParams: true });

router.get('/', UserTrailerController.index);
router.post('/', UserTrailerController.create);
router.patch('/:tmdb_id', UserTrailerController.update);
router.delete('/:tmdb_id', UserTrailerController.delete);

module.exports = router;
