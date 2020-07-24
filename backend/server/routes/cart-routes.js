const { Router } = require('express');
const router = Router();
const cart_controller = require('../controllers/cart-controller');
const { checkToken } = require('../middlewares/auth');
const v = require('../helpers/validation');

router.post('/:id', [checkToken, v.param_id, v.quantity], cart_controller.insertAndUpdateCart);

router.get('/', [checkToken], cart_controller.getCart);

router.delete('/:id', [checkToken, v.param_id], cart_controller.deleteProduct)

router.delete('/', [checkToken], cart_controller.emptyCart);

router.put('/:id', [checkToken, v.param_id, v.quantity], cart_controller.updateCart);

module.exports = router;