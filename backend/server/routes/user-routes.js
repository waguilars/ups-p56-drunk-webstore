const { Router } = require('express');
const router = Router();
const user_controller = require('../controllers/user-controller');
const v = require('../helpers/validation');
const { checkToken } = require('../middlewares/auth');

// Registrar un usuario
router.post(
  '/registro',
  [v.name, v.lastname, v.email, v.password],
  user_controller.insertUser
);

router.post('/login', user_controller.loginUser);

router.post('/auth', [checkToken], user_controller.logedIn);

router.get('/', user_controller.getUsers);

router.get('/:id', user_controller.getUser);

router.delete('/block/:id', user_controller.deleteUser);

router.put(
  '/:id',
  [checkToken, v.name, v.lastname, v.email, v.password],
  user_controller.updateUser
);

module.exports = router;
