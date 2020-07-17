require('./config/env');
require('./database');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');

const app = express();

// Midleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileupload());

// Routers
app.use(require('./routes/index'));

app.listen(process.env.PORT, () => {
    console.log(
        `The server is running at port http://localhost:${process.env.PORT}`
    );
});