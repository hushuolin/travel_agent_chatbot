const { handleQueryWithChatGPT, handleQueryWithDatabase } = require('./queryHelpers'); // You'll implement these functions

exports.processMessage = async (message) => {
    if (message.includes('example condition for ChatGPT')) {
        return await handleQueryWithChatGPT(message);
    } else {
        return await handleQueryWithDatabase(message);
    }
};
