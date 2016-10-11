const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/', UserController.getAll);

router.get('/:id', UserController.getOne);
router.delete('/:id', UserController.delete);

module.exports = router;
