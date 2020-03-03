const express = require('express');
const { check } = require('express-validator');
const multer = require('multer');

const router = express.Router();
const { User, Places } = require('../models');
const isAuth = require('../middlewares/is-auth.middleware');
const PlaceController = require('../controllers/place.controller');

// Multer setup for storing files in storage
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, './uploads/');
	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + file.originalname.split(' ').join('_')); // replace space with underscores
	}
});

const fileFilter = (req, file, callback) => {
	// only upload images of type jpeg, png or jpg
	if (
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg'
	) {
		//accept file
		callback(null, true);
	} else {
		// reject file
		callback(
			new Error('Only upload files with extension jpeg, jpg or png'),
			false
		);
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 1024 * 1024 * 10 } // only allow 10MB
});

/////////////////////////// Add new place ///////////////////////////

router.post('/:id', [isAuth, upload.single('image')], PlaceController.addPlace);

module.exports = router;
