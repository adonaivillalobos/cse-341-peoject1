const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', usersController.getALL);

router.get('/:id' , usersController.getSingle);

router.post('/', usersController.createUser);

router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;