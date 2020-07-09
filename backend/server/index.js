const express = require('express');
const morgan = require('morgan');



require('./config/env');

const { mongoose } = require('./database')
const app = express();

// Midleware
app.use(morgan('dev'))
app.use(express.json())

// Routers
app.use('/api/user', require('./routes/user-routes'))


app.listen(process.env.PORT, () => {
    console.log(`The server is running at port http://localhost:${process.env.PORT}`);
});