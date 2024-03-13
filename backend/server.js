const express = require('express');
const bodyParser = require('body-parser');
const chatRoutes = require('./api/routes/chatRoutes');

const app = express();
app.use(bodyParser.json());

// Use chatRoutes for the /api prefix
app.use('/api', chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
