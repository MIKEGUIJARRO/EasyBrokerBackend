const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const errorHandler = require('./middlewares/error');

// Loads auth config
dotenv.config({ path: './config/config.env' });

// Routes
const propertyRoute = require('./routes/property');


const app = express();

// Body parser
app.use(express.json())

// Log dev dependencies
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// CORS Config
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST',
}))

// Routes
app.use('/api/v1/property', propertyRoute);

// Error Handling
app.use(errorHandler)
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold);
});