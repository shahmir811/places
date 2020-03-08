const path = require('path');
const fs = require('fs');
const { User, Place } = require('../models');

/////////////////////////// Add new place ///////////////////////////
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

/////////////////////////// Update place ///////////////////////////
exports.updatePlace = async (req, res, next) => {
	const { id } = req.params;

	const { name, description } = req.body;

	try {
		const place = await Place.findByPk(id);

		place.name = name;
		place.description = description;

		// if there is new image. Then delete old first
		if (req.file.path) {
			clearImage(place.image_path);
			place.image_path = req.file.path.replace('\\', '/');
			place.image_name = req.file.originalname;
		}

		place.save();

		res.status(200).json('Records updated successfully');
	} catch (error) {
		errorFunction(error, res);
	}
};

/////////////////////////// Remove place ///////////////////////////
exports.removePlace = async (req, res, next) => {
	const { id } = req.params;

	try {
		// get place to be deleted
		const place = await Place.findByPk(id);

		// remove image from drive
		clearImage(place.image_path);

		// remove record from database
		await place.destroy();

		// success message
		res.status(200).json('File deleted successfully');
	} catch (error) {
		errorFunction(error, res);
	}
};

/////////////////////////// Remove image from drive ///////////////////////////

const clearImage = filePath => {
	filePath = path.join(__dirname, '..', filePath);
	fs.unlink(filePath, err => console.log(err));
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
