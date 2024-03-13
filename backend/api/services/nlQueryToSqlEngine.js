const { City, Distance, FlightTime } = require('../../models/models'); 

/**
 * Interprets a natural language query and translates it to an SQL query to fetch data from the database.
 * @param {string} message - The user's query message.
 * @returns {Promise<string>} - The result of the query.
 */
async function nlQueryToSqlEngine(message) {
    // Determine the intent of the message
    const intent = getIntentFromMessage(message);
    // Extract entities based on the recognized intent
    const entities = extractEntitiesFromMessage(message, intent);

    // Process the query based on the intent
    switch (intent) {
        case 'find_distance':
            return await queryDistance(entities);
        case 'find_flight_time':
            return await queryFlightTime(entities);
        default:
            return "I'm not sure how to help with that.";
    }
}

function getIntentFromMessage(message) {
    // Placeholder - in reality, use NLP techniques or keyword matching
    if (message.includes('how far is')) {
        return 'find_distance';
    } else if (message.includes('flight time')) {
        return 'find_flight_time';
    }
    return 'unknown';
}

function extractEntitiesFromMessage(message, intent) {
    // Placeholder - in reality, use NLP techniques for entity recognition
    const words = message.split(' ');
    const entities = {
        sourceCity: words[words.length - 3],
        destinationCity: words[words.length - 1]
    };
    return entities;
}

async function queryDistance({ sourceCity, destinationCity }) {
    // Here you would implement your logic to query the database for the distance
    // using the ORM that interacts with your Distance model
    // This is a simplified example
    try {
        const distance = await Distance.findOne({
            where: {
                sourceCity,
                destinationCity
            }
        });
        if (distance) {
            return `The distance from ${sourceCity} to ${destinationCity} is ${distance.value} kilometers.`;
        } else {
            return `Distance information not found for ${sourceCity} to ${destinationCity}.`;
        }
    } catch (error) {
        console.error('Failed to query distance:', error);
        throw new Error('Error while querying the database.');
    }
}

async function queryFlightTime({ sourceCity, destinationCity }) {
    // Similar to queryDistance, you would implement your logic to query the
    // database for flight time using the ORM that interacts with your FlightTime model
    // Again, this is a simplified example
    try {
        const flightTime = await FlightTime.findOne({
            where: {
                sourceCity,
                destinationCity
            }
        });
        if (flightTime) {
            return `The flight time from ${sourceCity} to ${destinationCity} is approximately ${flightTime.flightTimeHours} hours.`;
        } else {
            return `Flight time information not found for ${sourceCity} to ${destinationCity}.`;
        }
    } catch (error) {
        console.error('Failed to query flight time:', error);
        throw new Error('Error while querying the database.');
    }
}

module.exports = { nlQueryToSqlEngine };
