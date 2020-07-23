const { Router } = require('express');
const router = Router();
const cart_controller = require('../controllers/cart-controller');
const { checkToken } = require('../middlewares/auth');
const v = require('../helpers/validation');

router.post('/:id', [checkToken, v.param_id, v.quantity], cart_controller.insertAndUpdateCart)

router.get('/', [checkToken], cart_controller.getCart)



module.exports = router;