const { Router } = require('express');
const router = Router();
const { any } = require('underscore');
const { body, check } = require('express-validator');
const user_model = require('../models/user-model');
const user_controller = require('../controllers/user-controller');
const v = require('../helpers/user-model-validation');
const { checkToken } = require('../middlewares/auth');

// Registrar un usuario
router.post(
    '/registro', [v.name, v.lastname, v.email, v.password],
    user_controller.insertUser
);

router.post('/login', user_controller.loginUser);

router.post('/auth', [checkToken], user_controller.logedIn);

router.get('/list', user_controller.getUsers);

router.get('/user/:id', user_controller.getUser);

router.delete('/block/:id', user_controller.deleteUser);

module.exports = router;