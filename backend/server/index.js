require('./config/env');
require('./database');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const userRoutes = require('./routes/user-routes');
// const prodRoutes = require('./routes/product-routes');
const categRoutes = require('./routes/category-routes');


const app = express();

// Midleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routers
app.use('/api/user', userRoutes);
// app.use('/api/prod', prodRoutes);
app.use('/api/categ', categRoutes)

app.listen(process.env.PORT, () => {
    console.log(
        `The server is running at port http://localhost:${process.env.PORT}`
    );
});