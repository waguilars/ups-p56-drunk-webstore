const express = require('express');
const userctr = require('../controllers/user-controller');


const app = express();

app.get('/users', userctr.getUser)

app.post('/create', userctr.createUser);


module.exports = app;