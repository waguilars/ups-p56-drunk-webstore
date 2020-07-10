const { Router } = require('express');
const router = Router();

const user_controller = require('../controllers/user-controller')

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

module.exports = router;