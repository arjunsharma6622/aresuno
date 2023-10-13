const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const db = process.env.DB_URL;
app.use(express.json());

// Connect to MongoDB database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Import routes
app.use('/api/service', require('./routes/Business'));
app.use('/api/user', require('./routes/User'));



// Start server
app.listen(8000, () => {
    console.log('Server started on port 8000');
});



