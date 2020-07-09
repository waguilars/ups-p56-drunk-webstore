const express = require('express');
const bcrypt = require('bcrypt');
const user_model = require('../models/user-model');

const UserCtr = {};


UserCtr.getUser = async(req, res) => {
    let users = await user_model.find();
    res.json({
        status: "true",
        users
    });
}

UserCtr.createUser = async(req, res) => {
    let body = req.body;
    body.password = bcrypt.hashSync(body.password, 10);
    let new_user = new user_model(body);
    let data = await user_model.find({}, 'email');
    let band = data.find(date => date.email === new_user.email)
    if (band === 'undefined') {
        return res.json({
            status: "BAD",
            massage: "el correro esta repetido"
        })
    }
    await new_user.save((err, userDB) => {
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
};




module.exports = UserCtr;