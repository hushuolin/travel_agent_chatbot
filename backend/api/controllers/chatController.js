const { handleQueryWithChatGPT } = require('../services/chatService');
const { nlQueryToSqlEngine } = require('../services/nlQueryToSqlEngine');

exports.handleMessage = async (req, res) => {
    const { message } = req.body;

    try {
        // Analyze the message to decide on the handling method
        let response;

        // Condition to decide if the message should be handled by the database
        if (shouldHandleWithDatabase(message)) {
            // Handle query with database
            response = await nlQueryToSqlEngine(message);
        } else {
            // Handle query with ChatGPT
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
function shouldHandleWithDatabase(message) {
    return message.toLowerCase().includes('distance') || message.toLowerCase().includes('flight time');
}
