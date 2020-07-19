const { Router } = require('express');
const v = require('../helpers/validation');
const router = Router();
const { checkToken, onlyAdmin } = require('../middlewares/auth');
const product_controller = require('../controllers/product-controller');

router.post('/', [v.name_prod, v.desc_short, v.desc_long, v.price, v.stock, v.category],
    product_controller.insertProduct);

router.get('/category/:id', [v.param_id], product_controller.getProductsCategory);

router.get('/:id', product_controller.getproduct);

router.get('/', product_controller.getProducts);
router.get('/img/:name', product_controller.defineImage);

router.put('/:id', [checkToken, onlyAdmin, v.param_id, v.name_prod, v.desc_short, v.desc_long, v.price, v.category, v.stock], product_controller.updateProduct)

module.exports = router;