const express = require('express');
const user = require('../models/user-model');


const UserCtr = {};


UserCtr.getUser = async(req, res) => {
    const users = await user.find();
    res.json(users);
}

UserCtr.createUser = async(req, res) => {
    // req.body 
};

module.exports = UserCtr;