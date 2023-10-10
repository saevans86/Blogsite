const router = require('express').Router();
const userRoutes = require('./users');
const blogRoutes = require('./blogs');

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);

module.exports = router;