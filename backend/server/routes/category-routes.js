const { Router } = require('express');
const v = require('../helpers/validation');
const router = Router();

const category_controller = require('../controllers/category-controller');

router.post('/catinsert', [v.name], category_controller.insertCategory)


module.exports = router;