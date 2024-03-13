const { handleQueryWithChatGPT } = require('../services/chatService');
const { nlQueryToSqlEngine } = require('../services/nlQueryToSqlEngine');
const { getIntentFromMessage } = require('../services/intentService');

exports.handleMessage = async (req, res) => {
    const { message } = req.body;

    try {
        // Analyze the message to decide on the handling method
        let response;

        // Now this is an async call
        const handleWithDatabase = shouldHandleWithDatabase(message);

        // Condition to decide if the message should be handled by the database
        if (handleWithDatabase) {
            response = await nlQueryToSqlEngine(message);
        } else {
            response = await handleQueryWithChatGPT(message);
        }

        res.json({ success: true, response: response });
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

/**
 * A simple function to determine if a message should be handled by the database.
 * @param {string} message - The user's query message.
 * @returns {boolean} - True if the message should be handled by the database; otherwise, false.
 */
async function shouldHandleWithDatabase(message) {
    // This is the key change: getIntentFromMessage is an async function
    const intent = await getIntentFromMessage(message);
    return ['find_distance', 'find_flight_time'].includes(intent);
}
