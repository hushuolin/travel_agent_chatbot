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
    if (message.toLowerCase().includes('how far is')) {
        return 'find_distance';
    } else if (message.toLowerCase().includes('flight time')) {
        return 'find_flight_time';
    }
    return 'unknown';
}

function extractEntitiesFromMessage(message, intent) {
    // Placeholder - in reality, use NLP techniques for entity recognition
    const pattern = /(?:how far is|flight time (?:between|from))? (\w+) (?:and|to) (\w+)/i;
    const match = message.toLowerCase().match(pattern);

    if (match) {
        return { 
            sourceCityName: match[1],
            destinationCityName: match[2]
        };
    } else {
        return { 
            sourceCityName: null, 
            destinationCityName: null 
        };
    }
}

async function queryDistance({ sourceCityName, destinationCityName }) {
    try {
        // First, find the city IDs from the city names
        const [sourceCity, destinationCity] = await Promise.all([
            City.findOne({ where: { name: sourceCityName } }),
            City.findOne({ where: { name: destinationCityName } })
        ]);    

        if (!sourceCity || !destinationCity) {
            return `City information not found for ${sourceCityName} or ${destinationCityName}.`;
        }    

        // Then, use the IDs to find the distance
        const distance = await Distance.findOne({
            where: {
                sourceCityId: sourceCity.id,
                destinationCityId: destinationCity.id
            }
        });

        if (distance) {
            return `The distance from ${sourceCityName} to ${destinationCityName} is ${distance.distanceValue} kilometers.`;
        } else {
            return `Distance information not found for ${sourceCityName} to ${destinationCityName}.`;
        }
    } catch (error) {
        console.error('Failed to query distance:', error);
        throw new Error('Error while querying the database.');
    }
}

async function queryFlightTime({ sourceCityName, destinationCityName }) {
    try {
        // First, find the city IDs from the city names
        const [sourceCity, destinationCity] = await Promise.all([
            City.findOne({ where: { name: sourceCityName } }),
            City.findOne({ where: { name: destinationCityName } })
        ]);    

        if (!sourceCity || !destinationCity) {
            return `City information not found for ${sourceCityName} or ${destinationCityName}.`;
        }    

        // Then, use the IDs to find the distance
        const flightTime = await FlightTime.findOne({
            where: {
                sourceCityId: sourceCity.id,
                destinationCityId: destinationCity.id
            }
        });
    
        if (flightTime) {
            return `The flight time from ${sourceCityName} to ${destinationCityName} is approximately ${flightTime.flightTimeHours} hours.`;
        } else {
            return `Flight time information not found for ${sourceCityName} to ${destinationCityName}.`;
        }
    } catch (error) {
        console.error('Failed to query flight time:', error);
        throw new Error('Error while querying the database.');
    }
}


module.exports = { nlQueryToSqlEngine };
