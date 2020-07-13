const { Router } = require('express');
const router = Router();
const { any } = require('underscore');
const { body, check } = require('express-validator');
const user_model = require('../models/user-model');
const user_controller = require('../controllers/user-controller');
const user_validator = require('../models-validation/user-model-validation')


// Lista de Usuarios
router.get('/', user_controller.getUser)
    // Insertar Usuario
router.post('/', user_controller.createUser);
// Seleccionar un usuario
router.get('/:id', user_controller.selectUser);
// Editar un usuario
router.put('/:id', user_controller.editUser);
// Eliminar un Usuario
router.delete('/:id', user_controller.deleteUser);

router.post('/test', user_validator.password, user_controller.insertUser);

module.exports = router;