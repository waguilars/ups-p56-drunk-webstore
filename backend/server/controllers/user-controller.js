const express = require('express');
const bcrypt = require('bcrypt');

const user_model = require('../models/user-model');
const { user } = require('../routes/user-routes');


const UserCtr = {};


UserCtr.getUser = async(req, res) => {
    let users = await user.find();
    // console.log(users);
    res.json({
        status: "true"
    });
}

UserCtr.createUser = (req, res) => {
    let body = req.body;
    body.password = bcrypt.hashSync(body.password, 10);
    let new_user = new user_model(body);
    new_user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            status: "OK",
            user: userDB
        });
    });
    // // body.password = bcrypt.hashSync(body.password, 10);
    // let users = new user(req.body);

};

module.exports = UserCtr;