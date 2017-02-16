const express = require('express');
const TrailerController = require('../controllers/TrailerController');

const router = express.Router({ mergeParams: true });

router.get('/', TrailerController.index);
router.post('/', TrailerController.create);
router.get('/popular', TrailerController.popular);
router.get('/:tmdb_id', TrailerController.show);
router.patch('/:tmdb_id', TrailerController.update);
router.delete('/:tmdb_id', TrailerController.delete);

module.exports = router;
