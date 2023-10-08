const router = require('express').Router();
const userRoutes = require('./userroutes');
const blogRoutes = require('./blogroutes');


router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);

module.exports = router;
