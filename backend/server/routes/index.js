const express = require('express');
const router = express.Router();
const userRoutes = require('./user-routes');
const prodRoutes = require('./product-routes');
const categRoutes = require('./category-routes');
const imgRoutes = require('./images-routes');
const cartRouter = require('./cart-routes');

router.use('/api/user', userRoutes);
router.use('/api/product', prodRoutes);
router.use('/api/category', categRoutes);
router.use('/api/upload', imgRoutes);
router.use('/api/cart', cartRouter);



module.exports = router;