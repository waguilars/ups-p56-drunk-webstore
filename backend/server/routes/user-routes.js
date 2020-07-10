const { Router } = require('express');
const router = Router();

const user_controller = require('../controllers/user-controller')

router.get('/', user_controller.getUser)

router.post('/', user_controller.createUser);


module.exports = router;