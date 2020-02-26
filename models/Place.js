'use strict';
module.exports = (sequelize, DataTypes) => {
	const Place = sequelize.define(
		'Place',
		{
			name: DataTypes.STRING,
			description: DataTypes.TEXT,
			image_name: DataTypes.STRING,
			image_path: DataTypes.STRING,
			UserId: DataTypes.INTEGER
		},
		{
			tableName: 'places',
			quoteIdentifiers: true
		}
	);
	Place.associate = function(models) {
		Place.belongsTo(models.User, { foreignKey: 'UserId', as: 'user' });
	};
	return Place;
};
