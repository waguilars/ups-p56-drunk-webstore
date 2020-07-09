const express = require('express');
const userctr = require('../controllers/user-controller');


const app = express();

app.get('/', userctr.getUser)

app.post('/', userctr.createUser);


module.exports = app;