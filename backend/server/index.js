const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')

require('./config/env');

const { mongoose } = require('./database')
const app = express();

// Midleware
app.use(morgan('dev'))
    // app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routers
app.use('/api/user', require('./routes/user-routes'));
app.use('/api/product', require('./routes/product-routes'));
app.use('/api/order', require('./routes/order-routes'));
app.use('/api/category', require('./routes/category-routes'));
app.use('/api/cart', require('./routes/cart-routes'));


app.listen(process.env.PORT, () => {
    console.log(`The server is running at port http://localhost:${process.env.PORT}`);
});