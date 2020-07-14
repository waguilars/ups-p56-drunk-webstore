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

UserCtr.getUser = async (req, res) => {
  let users = await user_model.find();
  console.log(users);
  res.json({
    status: 'true',
    users,
  });
};

UserCtr.createUser = async (req, res) => {
  let body = req.body;
  body.password = bcrypt.hashSync(body.password, 10);
  let new_user = new user_model(body);
  let data = await user_model.find({}, 'email');
  let band = data.find((date) => date.email === new_user.email);
  if (band === 'undefined') {
    return res.json({
      status: 'BAD',
      massage: 'el correro esta repetido',
    });
  }

  await new_user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      status: 'OK',
      // user: userDB
    });
  });
};

UserCtr.selectUser = async (req, res) => {
  // console.log(req.params.id);
  let user = await user_model.findById(req.params.id);
  res.json({
    status: 'recivido',
    user,
  });
};

UserCtr.editUser = async (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['name', 'email', 'lastname', 'role', 'estado']);
  await user_model.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true, context: 'query' },
    (err, userBD) => {
      if (err) {
        return res.status(400).json({
          status: false,
          err,
        });
      }
      res.json({
        status: true,
      });
    }
  );
};

UserCtr.deleteUser = async (req, res) => {
  await user_model.findByIdAndRemove(req.params.id);
  res.json({ status: 'User deleted' });
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

module.exports = UserCtr;
