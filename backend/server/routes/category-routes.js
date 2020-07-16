const { Router } = require('express');
const v = require('../helpers/validation');
const router = Router();

const category_controller = require('../controllers/category-controller');

router.post('/insert', [v.name], category_controller.insertCategory)

router.get('/list', category_controller.getCategories)

module.exports = router;