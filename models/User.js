'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING
		},
		{
			tableName: 'users',
			quoteIdentifiers: true
		}
	);
	User.associate = function(models) {
		User.hasMany(models.Place, { as: 'places' });
	};

	// User.addScope('defaultScope', {
	// 	attributes: { exclude: ['password'] }
	// });

	return User;
};
