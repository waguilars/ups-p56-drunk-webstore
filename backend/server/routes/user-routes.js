const { Router } = require('express');
const router = Router();
const userctr = require('../controllers/user-controller');


router.get('/', userctr.getUser)

module.exports = router;