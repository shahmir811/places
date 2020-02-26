const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const { User } = require('../models');
const AuthController = require('../controllers/auth.controller');
const isAuth = require('../middlewares/is-auth.middleware');

/////////////////////////// Register User ///////////////////////////

router.post(
	'/register',
	[
		check('name')
			.trim()
			.not()
			.isEmpty()
			.withMessage('Name field is required'),
		check('email')
			.isEmail()
			.withMessage('Please enter a valid email')
			.custom((value, { req }) => {
				return User.findOne({ where: { email: value } }).then(userDoc => {
					if (userDoc) {
						return Promise.reject('Email is already in use');
					}
				});
			})
			.normalizeEmail(),
		check('password')
			.trim()
			.isLength({ min: 5 })
			.withMessage('Password must be atleast 6 characters long')
	],
	AuthController.register
);

/////////////////////////// Login User ///////////////////////////
router.post(
	'/login',
	[
		check('email')
			.isEmail()
			.withMessage('Please enter a valid email')
			.normalizeEmail()
			.custom((value, { req }) => {
				return User.findOne({ where: { email: value } }).then(userDoc => {
					if (!userDoc) {
						return Promise.reject('Emai not found');
					}
				});
			}),
		check('password')
			.trim()
			.isLength({ min: 5 })
			.withMessage('Password must be atleast 6 characters long')
	],
	AuthController.login
);

/////////////////////////// Me ///////////////////////////
router.get('/me', isAuth, AuthController.check_me);

module.exports = router;
