const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/', UserController.getAll);

router.get('/:user_id', UserController.getOne);
router.delete('/:user_id', UserController.delete);

module.exports = router;
