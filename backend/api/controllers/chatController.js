const chatService = require('../services/chatService');

exports.handleMessage = async (req, res) => {
    const { message } = req.body;

    try {
        const response = await chatService.processMessage(message);
        res.json({ success: true, response });
    } catch (error) {
        console.error('Error handling message:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
