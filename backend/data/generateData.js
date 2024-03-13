const { City, Distance, FlightTime } = require('../models/models');
const faker = require('faker');
const sequelize = require('../config/sequelize');

async function createCities() {
    for (let i = 0; i < 100; i++) {
        await City.create({
            name: faker.address.city()
        });
    }
}

async function createDistances() {
    const cities = await City.findAll();
    // Iterate through each city
    for (let i = 0; i < cities.length; i++) {
        // Create distance entries for each other city
        for (let j = 0; j < cities.length; j++) {
            if (i !== j) { // Ensure not the same city
                await Distance.create({
                    sourceCityId: cities[i].id,
                    sourceCityName: cities[i].name,
                    destinationCityId: cities[j].id,
                    destinationCityName: cities[j].name,
                    distanceValue: faker.datatype.number({ min: 100, max: 1000 })
                });
            }
        }
    }
}

async function createFlightTimes() {
    const cities = await City.findAll();
    // Iterate through each city
    for (let i = 0; i < cities.length; i++) {
        // Create flight time entries for each other city
        for (let j = 0; j < cities.length; j++) {
            if (i !== j) { // Ensure not the same city
                await FlightTime.create({
                    sourceCityId: cities[i].id,
                    sourceCityName: cities[i].name,
                    destinationCityId: cities[j].id,
                    destinationCityName: cities[j].name,
                    flightTimeHours: faker.datatype.number({ min: 1, max: 20 })
                });
            }
        }
    }
}

// Define similar functions for TravelAgent, and TravelPackage

async function main() {
    await sequelize.sync({ force: true }); // Be cautious with force: true as it will drop tables
    console.log('Database synced and tables created.');

    await createCities();
    console.log('Cities created.');

    await createDistances();
    console.log('Distances created.');

    await createFlightTimes(); // Create flight times
    console.log('Flight times created.');
}

main().then(() => console.log('Data generation completed')).catch(err => console.error(err));

