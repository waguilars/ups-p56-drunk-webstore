const { Router } = require('express');
const router = Router();

const { checkToken } = require('../middlewares/auth');
const { onlyImages } = require('../middlewares/upload');
const uploadCtrl = require('../controllers/images-controller');

router.put('/user', [checkToken, onlyImages], uploadCtrl.uploadUser);
router.put('/product/:id', [checkToken, onlyImages], uploadCtrl.uploadProduct);

module.exports = router;