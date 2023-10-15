// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const analytics = require('@vercel/analytics');
// const cookieParser = require('cookie-parser');

// dotenv.config();

// const app = express();
// const db = process.env.DB_URL;
// const port = process.env.PORT;
// app.use(express.json());



// const allowCors = fn => async (req, res) => {
//     res.setHeader('Access-Control-Allow-Credentials', true)
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     // another common pattern
//     // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//     res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//     )
//     if (req.method === 'OPTIONS') {
//         res.status(200).end()
//         return
//     }
//     return await fn(req, res)
// }

// const handler = (req, res) => {
//     const d = new Date()
//     res.end(d.toString())
// }

// module.exports = allowCors(handler)




// app.use(allowCors);

// app.use(
//     cors({
//         origin: "*",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         credentials: true,
//     })
// );
// app.use(cookieParser());

// // Connect to MongoDB database
// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // Define routes
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// // Import routes
// app.use('/api/business', require('./routes/Business'));
// app.use('/api/user', require('./routes/User'));
// app.use('/api/vendor', require('./routes/Vendor'));

// // Error handling middleware for MongoDB duplicate key errors
// app.use((err, req, res, next) => {
//     if (err.name === 'MongoError' && err.code === 11000) {
//         // Duplicate key error
//         const duplicatedKey = err.message.match(/(["'])(\\?.)*?\1/)[0];
//         const message = `Duplicate key error: ${duplicatedKey} already exists.`;
//         console.error('MongoDB Duplicate Key Error:', message);
//         return res.status(400).json({ error: message });
//     }
//     // Handle other errors
//     return res.status(500).json({ error: 'Internal server error' });
// });


// // Start server
// app.listen(port, () => {
//     console.log('Server started on port ' + port);
// });


// analytics.inject();




const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const analytics = require('@vercel/analytics');
const cookieParser = require('cookie-parser');

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}

const handler = (req, res) => {
    const d = new Date()
    res.end(d.toString())
}

module.exports = allowCors(handler)

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

// Error handling middleware for MongoDB duplicate key errors
app.use((err, req, res, next) => {
    if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate key error
        const duplicatedKey = err.message.match(/(["'])(\\?.)*?\1/)[0];
        const message = `Duplicate key error: ${duplicatedKey} already exists.`;
        console.error('MongoDB Duplicate Key Error:', message);
        return res.status(400).json({ error: message });
    }
    // Handle other errors
    return res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

analytics.inject();
