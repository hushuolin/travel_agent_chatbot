const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const City = sequelize.define('City', {
    name: DataTypes.STRING
});

const Distance = sequelize.define('Distance', {
    sourceCityId: DataTypes.INTEGER,
    destinationCityId: DataTypes.INTEGER,
    distanceValue: DataTypes.INTEGER
});

const FlightTime = sequelize.define('FlightTime', {
    sourceCityId: DataTypes.INTEGER,
    destinationCityId: DataTypes.INTEGER,
    flightTimeHours: DataTypes.INTEGER
});

// Define other models (TravelAgent, TravelPackage) similarly

module.exports = { City, Distance, FlightTime };
