const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	// Check if there is Authorization header
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		return res.status(401).json({
			msg: 'Not authenticated'
		});
	}

	const token = authHeader.split(' ')[1];
	// let decodedToken;

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = decoded.user;
		next();
	} catch (error) {
		res.status(401).json({ msg: 'Invalid token' });
	}
};
