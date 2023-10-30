const router = require('express').Router();
const userRoutes = require('./users');
const blogRoutes = require('./blogs');
const commentRoutes = require('./comment')

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);
// console.log(userRoutes)

module.exports = router;