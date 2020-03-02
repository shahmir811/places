const { User } = require('../models');

/////////////////////////// Get All Users ///////////////////////////
exports.getUsers = async (req, res, next) => {
	try {
		const users = await User.findAll({
			attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
		});
		return res.status(200).json(users);
	} catch (error) {
		errorFunction(error, res);
	}
};

exports.getUserPlaces = async (req, res, next) => {
	const { id } = req.params;

	try {
		const user = await User.findByPk(id);
		const places = await user.getPlaces();

		return res.status(200).json(places);
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
