const express = require('express');
const TrailerController = require('../controllers/TrailerController');

const router = express.Router();

router.get('/', TrailerController.index);
router.post('/', TrailerController.create);
router.get('/:trailer_id', TrailerController.show);
router.patch('/:trailer_id', TrailerController.update);
router.delete('/:trailer_id', TrailerController.delete);

module.exports = router;
