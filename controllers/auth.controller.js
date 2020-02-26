const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const { User } = require('../models');

/////////////////////////// Register User ///////////////////////////

exports.register = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const { name, email, password } = req.body;

	try {
		// Encrypt password
		const salt = await bcrypt.genSalt(10);
		const encryptedPassword = await bcrypt.hash(password, salt);

		await User.create({
			name,
			email: email.toLowerCase(),
			password: encryptedPassword
		});

		res.status(200).json({
			msg: 'New user registered successfully'
		});
	} catch (error) {
		errorFunction(error, res);
	}
};

/////////////////////////// Login User ///////////////////////////

exports.login = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	try {
		// Get User from database
		const user = await User.findOne({
			where: { email }
		});

		// Check Password
		const isMatched = await bcrypt.compare(password, user.password);
		// console.log('RESULT: ', isMatched);
		if (!isMatched) {
			return res.status(400).json({ errors: [{ msg: 'Password incorrect' }] });
		}

		const payload = {
			user: {
				id: user.id,
				email: user.email
			}
		};

		// JWT Token
		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: 3600000 },
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (error) {
		console.log(error);
		error.message = [{ msg: 'User not found' }];
		errorFunction(error, res);
	}
};

/////////////////////////// Me ///////////////////////////
exports.check_me = async (req, res, next) => {
	try {
		const user = await User.findByPk(req.user.id, {
			attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
		});
		res.status(200).json(user);
	} catch (error) {
		errorFunction(error, res);
	}
};

/////////////////////////// Error Function ///////////////////////////

const errorFunction = (error, res) => {
	console.log('---------------------------------------------');
	console.log(error.message);
	console.log('---------------------------------------------');
	return res.status(500).json({
		errors: error.message
	});
};
