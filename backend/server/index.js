const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

require('./config/env');

const { mongoose } = require('./database');
const userRoutes = require('./routes/user-routes');

const app = express();

// Midleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routers

app.use('/api/user', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `The server is running at port http://localhost:${process.env.PORT}`
  );
});
