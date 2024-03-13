const { City, Distance, FlightTime } = require('../models/models');
const faker = require('faker');
const sequelize = require('../config/sequelize');

async function createCities() {
    for (let i = 0; i < 1000; i++) {
        await City.create({
            name: faker.address.city()
        });
    }
}

async function createDistances() {
    const cities = await City.findAll();
    for (let i = 0; i < 1000; i++) {
        const sourceCity = faker.random.arrayElement(cities);
        let destinationCity = faker.random.arrayElement(cities.filter(city => city.id !== sourceCity.id));
        
        await Distance.create({
            sourceCityId: sourceCity.id,
            destinationCityId: destinationCity.id,
            distanceValue: faker.datatype.number({ min: 100, max: 1000 })
        });
    }
}

async function createFlightTimes() {
    const cities = await City.findAll();
    for (let i = 0; i < 1000; i++) {
        const sourceCity = faker.random.arrayElement(cities);
        let destinationCity = faker.random.arrayElement(cities.filter(city => city.id !== sourceCity.id));

        await FlightTime.create({
            sourceCityId: sourceCity.id,
            destinationCityId: destinationCity.id,
            flightTimeHours: faker.datatype.number({ min: 1, max: 20 }) // assuming flight times range from 1 to 20 hours
        });
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

