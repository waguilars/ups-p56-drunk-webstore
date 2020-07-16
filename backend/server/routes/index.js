const express = require('express');
const router = express.Router();
const userRoutes = require('./user-routes');
const prodRoutes = require('./product-routes');
const categRoutes = require('./category-routes');


router.use('/api/user', userRoutes);
router.use('/api/product', prodRoutes);
router.use('/api/category', categRoutes)

module.exports = router;