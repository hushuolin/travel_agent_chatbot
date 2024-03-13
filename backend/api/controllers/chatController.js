const { handleQueryWithChatGPT } = require('../services/chatService');

exports.handleMessage = async (req, res) => {
    const { message } = req.body;

    try {
        const chatResponse = await handleQueryWithChatGPT(message);
        // If you want to see more details in the server logs:
        console.log('ChatGPT response:', chatResponse);

        // Respond with success true and the chat response
        res.json({ success: true, response: chatResponse });
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
