const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const UserController = require('../controllers/user.controller');

/////////////////////////// Get All Users ///////////////////////////

router.get('/', UserController.getUsers);

router.get('/:id/places', UserController.getUserPlaces);

module.exports = router;
