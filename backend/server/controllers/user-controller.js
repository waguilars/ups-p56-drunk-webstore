const bcrypt = require('bcrypt');
const _ = require('underscore');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const user_model = require('../models/user-model');
const userModel = require('../models/user-model');
const path = require('path');
const fs = require('fs');
const { isValidObjectId } = require('mongoose');
const { email } = require('../helpers/validation');
const UserCtr = {};

let order_text = (text) => {
    let palabras = text.split(' ');
    palabras.forEach((palabra, idx) => {
        palabras[idx] =
            palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    });
    return palabras.join(' ');
};

UserCtr.insertUser = (req, res) => {
    let errores = validationResult(req);
    if (errores.isEmpty()) {
        let body = req.body;
        let param = {
            name: order_text(body.name),
            lastname: order_text(body.lastname),
            password: bcrypt.hashSync(body.password, 10),
            email: body.email,
            img: body.img,
            role: body.role,
            status: body.status,
        };
        let new_user = new user_model(param);
        user_model.find({}, 'email').then((resp) => {
            let flag = resp.find((date) => date.email === new_user.email);
            if (flag) {
                return res.status(400).json({
                    msg: 'Correo ya en uso',
                });
            }
            new_user.save((err, userDB) => {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        msg: err,
                    });
                }
                return res.status(201).json({
                    status: true,
                    msg: 'Usuario Creado',
                    user: userDB,
                });
            });
        });
    } else {
        let new_err = {};
        errores.errors.forEach((element) => {
            let param = element.param;
            let msg_param = element.msg;
            new_err[param] = msg_param;
        });
        return res.status(400).json({
            status: false,
            msg: 'Credenciales no admitidas',
            error: new_err,
        });
    }
};

UserCtr.loginUser = (req, res) => {
    const body = req.body;

    userModel.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            return res.status(401).json({
                status: false,
                msg: 'Credenciales no validas.',
            });

        if (!userDB)
            return res.status(401).json({
                status: false,
                msg: 'Credenciales no validas.',
            });

        if (!userDB.status)
            return res.status(401).json({
                status: false,
                msg: 'La cuenta se encuentra deshabilitada.',
            });

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(401).json({
                status: false,
                msg: 'Credenciales no validas',
            });
        }
        // console.log(process.env.TOKEN_EXPIRATION, process.env.SEED);
        const userToken = jwt.sign({ user: userDB }, process.env.SEED, {
            expiresIn: process.env.TOKEN_EXPIRATION,
        });

        return res.json({
            status: true,
            user: userDB,
            token: userToken,
        });
    });
};

UserCtr.logedIn = (req, res) => {
    return res.json({
        status: true,
        data: req.user,
        msg: 'Sesion valida',
    });
};

UserCtr.getUsers = (req, res) => {
    user_model.find({}, (err, data) => {
        if (err) {
            res.json({
                status: false,
                msg: err,
            });
        }
        data.password = undefined;
        data.img = undefined;
        res.json({
            status: true,
            user: data,
        });
    });
};

UserCtr.getUser = (req, res) => {
    let id = req.params.id;
    // console.log(id);
    user_model.findById(id, (err, data) => {
        if (err) {
            return res.status(404).json({
                status: false,
                msg: 'Usuario no encontrado',
            });
        }

        return res.json({
            status: true,
            user: data,
        });
    });
};

UserCtr.deleteUser = (req, res) => {
    let id = req.params.id;

    user_model.findByIdAndUpdate(id, { status: false }, (err, data) => {
        if (err) {
            return res.json({
                status: false,
                msg: err,
            });
        }
        if (data.status) {
            data.status = false;
        } else {
            return res.json({
                status: false,
                msg: 'Este usuario ya se encuentra bloqueado',
            });
        }
        res.json({
            status: true,
            user: data,
            msg: 'Usuario bloqueado',
        });
    });
};

// metodo define default profile picture
UserCtr.defineImage = (req, res) => {
    let fileName = req.params.name;
    // console.log(fileName);

    let imagePath = path.resolve(
        __dirname,
        `../../uploads/images/users/${fileName}`
    );
    //   console.log(imagePath);

    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        let noImagePath = path.resolve(
            __dirname,
            '../../public/assets/img/defaultUser.png'
        );
        res.sendFile(noImagePath);
    }
};

UserCtr.updateUser = (req, res) => {
    let mistakes = validationResult(req);
    if (!(mistakes.isEmpty())) {
        let new_err = {};
        mistakes.errors.forEach((element) => {
            let param = element.param;
            let msg_param = element.msg;
            new_err[param] = msg_param;
        });
        return res.status(400).json({
            status: false,
            msg: 'Credenciales no admitidas',
            error: new_err,
        });
    } else {
        let id = req.params.id;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                status: false,
                msg: 'Peticion no valida',
            });
        }
        if (!id) {
            id = req.user.user._id;
        }
        let body = req.body;
        let param = {
            name: order_text(body.name),
            lastname: order_text(body.lastname),
            email: body.email,
            img: body.img,
            role: body.role || 'USER_ROLE',
            status: body.status,
        };

        // console.log(body);
        user_model.find({ email: param.email }, (err, data) => {
            if (err) {
                return (
                    res.status(500),
                    json({
                        status: false,
                        err,
                    })
                );
            }

            user_model.findByIdAndUpdate(id, param, { new: true }, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        msg: 'Credencailes no validas',
                        error: {
                            email: 'El correo ya se encuentra registrado a nombre de otro propietario',
                        },
                    });
                }
                return res.status(200).json({
                    status: true,
                    msg: 'Usuario actualizado',
                    user: data,
                });
            });
        });
    }
};

UserCtr.deteletest = (req, res) => {
    let mistakes = validationResult(req);
    if (!mistakes.isEmpty()) {
        let new_err = {};
        mistakes.errors.forEach((element) => {
            let param = element.param;
            let msg_param = element.msg;
            new_err[param] = msg_param;
        });
        return res.status(400).json({
            status: false,
            msg: 'Credenciales no validas',
            error: new_err,
        });
    }
    let id = req.params.id;
    user_model.findOneAndUpdate({ _id: id }, { status: false }, { new: true },
        (err, data) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    msg: 'Error del servidor',
                    error: err,
                });
            }

            return res.status(200).json({
                status: true,
                msg: 'Usuario bloqueado',
                user: data,
            });
        }
    );
};

module.exports = UserCtr;