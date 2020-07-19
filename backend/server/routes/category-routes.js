const { Router } = require('express');
const v = require('../helpers/validation');
const { checkToken, onlyAdmin } = require('../middlewares/auth');
const router = Router();

const category_controller = require('../controllers/category-controller');

router.post('/', [checkToken, onlyAdmin, v.name], category_controller.insertCategory)

router.get('/', category_controller.getCategories)

module.exports = router;