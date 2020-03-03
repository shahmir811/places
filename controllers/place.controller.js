const { User, Places } = require('../models');

exports.addPlace = async (req, res, next) => {
	const { id } = req.params;

	const { name, description } = req.body;

	try {
		const user = await User.findByPk(id);

		const place = await user.createPlace({
			name,
			description,
			image_path: req.file.path.replace('\\', '/'),
			image_name: req.file.originalname
		});

		res.status(200).json('File uploaded successfully');
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
