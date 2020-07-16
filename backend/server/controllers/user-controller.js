const bcrypt = require('bcrypt');
const _ = require('underscore');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const user_model = require('../models/user-model');
const userModel = require('../models/user-model');

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
      return res.status(400).json({
        status: false,
        msg: 'Credenciales no validas.',
      });

    if (!userDB)
      return res.status(400).json({
        status: false,
        msg: 'Credenciales no validas.',
      });

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.json({
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

UserCtr.updateUser = (req, res) => {
  const id = req.params.id;
  let errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      status: false,
      err: errores.errors,
    });
  }

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

  userModel.findOneAndUpdate(
    { _id: id },
    param,
    {
      new: true,
      runValidators: 'query',
    },
    (err, updatedUser) => {
      if (err)
        return res.status(500).json({
          status: false,
          err,
        });

      if (!updatedUser)
        return res.status(404).json({
          status: false,
          err,
        });

      return res.json({
        status: true,
        user: updatedUser,
        msg: 'Datos actualizados correctamente.',
      });
    }
  );
};

module.exports = UserCtr;
