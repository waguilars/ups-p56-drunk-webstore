const { Router } = require('express');
const v = require('../helpers/validation');
const router = Router();

const product_controller = require('../controllers/product-controller');

router.post('/insert', [v.name_prod, v.desc_short, v.desc_long, v.price, v.stock, v.category],
    product_controller.insertProduct);

router.get('/:id', product_controller.getproduct);

router.get('/', product_controller.getProducts);
module.exports = router;