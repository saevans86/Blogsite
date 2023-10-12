const router = require('express').Router();
const apiRoutes = require('./api');
const mainpage = require('./mainpage');

router.use('/', mainpage);
router.use('/api', apiRoutes);

module.exports = router;
