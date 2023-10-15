const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const analytics = require('@vercel/analytics');
const cookieParser = require('cookie-parser');


app.use(
    cors({
        origin: ['https://aresuno.vercel.app', 'http://localhost:5173'],
        credentials: true,
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers'
    })
);

dotenv.config();

const app = express();
const db = process.env.DB_URL;
const port = process.env.PORT;
app.use(express.json());



app.use(cookieParser());

// Connect to MongoDB database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Import routes
app.use('/api/business', require('./routes/Business'));
app.use('/api/user', require('./routes/User'));
app.use('/api/vendor', require('./routes/Vendor'));

// Start server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});