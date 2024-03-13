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

/**
 * Sends a query to OpenAI's ChatGPT and returns the response.
 * @param {string} message - The user's query message.
 * @returns {Promise<string>} - The response from ChatGPT.
 */
async function handleQueryWithChatGPT(message) {
  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct", 
      prompt: message,
      temperature: 0.5, // Adjust for creativity. Lower is more deterministic.
      max_tokens: 150, // Adjust based on the expected length of the response
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    return response.choices[0].text.trim();
  } catch (error)  {
    console.error('Error querying ChatGPT:', error);

    if (error instanceof OpenAIApi.errors.OpenAIError) {
      // Handle OpenAI specific errors
      console.error('OpenAI Error', error);
    } else {
      // Handle other errors
      console.error('General Error', error);
    }
    
    // Rethrow the error to be handled by the caller
    throw error;
  }
}

module.exports = { handleQueryWithChatGPT };
