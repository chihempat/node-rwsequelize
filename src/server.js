const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');

const app = express();

// user morgan
morgan(':method :url :status :res[content-length] - :response-time ms');

// For POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/api', require('./routes/api'));

app.listen(7788, () => console.log('Running on port 7788'));