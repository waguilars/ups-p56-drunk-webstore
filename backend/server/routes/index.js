const express = require('express');
const router = express.Router();
const userRoutes = require('./user-routes');
const prodRoutes = require('./product-routes');
const categRoutes = require('./category-routes');


router.use('/api/user', userRoutes);
router.use('/api/prod', prodRoutes);
router.use('/api/categ', categRoutes)

module.exports = router;