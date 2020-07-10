const express = require('express');
const bcrypt = require('bcrypt');
const user_model = require('../models/user-model');
const _ = require('underscore')

const UserCtr = {};


UserCtr.getUser = async(req, res) => {
    let users = await user_model.find();
    console.log(users);
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
            // user: userDB
        });
    });
};

UserCtr.selectUser = async(req, res) => {
    // console.log(req.params.id);
    let user = await user_model.findById(req.params.id);
    res.json({
        status: 'recivido',
        user
    })
}

UserCtr.editUser = async(req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'lastname', 'role', 'estado'])
    await user_model.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, userBD) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    err
                });
            }
            res.json({
                status: true,
                // usuario: userBD
            })
        })

};

UserCtr.deleteUser = async(req, res) => {
    await user_model.findByIdAndRemove(req.params.id);
    res.json({ status: 'User deleted' });
};





module.exports = UserCtr;