const { Router } = require('express');
const router = Router();
const { any } = require('underscore');
const { body, check } = require('express-validator');
const user_model = require('../models/user-model');
const user_controller = require('../controllers/user-controller');
const v = require('../helpers/user-model-validation');
const { checkToken } = require('../middlewares/auth');

// Lista de Usuarios
// router.get('/', user_controller.getUser)
// Insertar Usuario
router.post('/', user_controller.createUser);
// Seleccionar un usuario
router.get('/:id', user_controller.selectUser);
// Editar un usuario
router.put('/:id', user_controller.editUser);
// Eliminar un Usuario
router.delete('/:id', user_controller.deleteUser);

// Registrar un usuario
router.post(
  '/registro',
  [v.name, v.lastname, v.email, v.password],
  user_controller.insertUser
);

router.post('/login', user_controller.loginUser);

router.post('/auth', [checkToken], user_controller.logedIn);

module.exports = router;
