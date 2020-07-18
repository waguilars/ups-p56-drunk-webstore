const { Router } = require('express');
const router = Router();
const user_controller = require('../controllers/user-controller');
const v = require('../helpers/validation');
const { checkToken, checkrole, checkparams } = require('../middlewares/auth');

// Registrar un usuario
router.post(
    '/registro', [v.name, v.lastname, v.email, v.password],
    user_controller.insertUser
);

router.post('/login', user_controller.loginUser);

router.post('/auth', [checkToken], user_controller.logedIn);

router.get('/', [checkToken, checkrole], user_controller.getUsers);

router.get('/:id', [checkToken], user_controller.getUser);

router.delete('/:id', [checkToken, checkrole, v.param_id], user_controller.deteletest);

router.get('/img/:name', user_controller.defineImage);

router.put(
    '/:id?', [checkToken, checkparams, v.name, v.lastname, v.email], user_controller.updateUser)

module.exports = router;