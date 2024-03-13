const { OpenAI } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

// Verify that the API key is set
if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set in the environment variables.');
  }

// Initialize OpenAI API client with the API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function getIntentFromMessage(message) {
    try {
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct", // Or "gpt-3.5-turbo-instruct", adjust as needed
            prompt: `Classify the intent of the traveler message: "${message}". 
            - If the message is asking for the distance between two cities, reply with 'find_distance'. 
            - If the message is asking about the time it takes to travel (flight time) between two cities, reply with 'find_flight_time'. 
            - For anything else, reply with 'unknown'.`,
            temperature: 0.5,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

        // Directly process the GPT-3.5 response to determine the intent
        const intentResponse = response.choices[0].text.trim().toLowerCase();

        // Direct mapping based on the customized prompt response
        switch(intentResponse) {
            case 'find_distance':
                return 'find_distance';
            case 'find_flight_time':
                return 'find_flight_time';
            default:
                return 'unknown';
        }
    } catch (error) {
        console.error('Error querying GPT-3 for intent:', error);
        throw error;
    }
}

module.exports = { getIntentFromMessage };