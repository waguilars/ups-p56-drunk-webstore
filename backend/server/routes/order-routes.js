const { Router } = require('express');
const router = Router();

const order_controller = require('../controllers/order-controller');
const { checkToken } = require('../middlewares/auth');

router.post('/', [checkToken], order_controller.insertOrder);

router.get('/', [checkToken], order_controller.getOrders);

module.exports = router;