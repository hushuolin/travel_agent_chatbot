const express = require('express');
const router = express.Router();
const { handleMessage } = require('../controllers/chatController');

// POST endpoint to handle chat messages
router.post('/message', handleMessage);

module.exports = router;
