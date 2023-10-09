const router = require('express').Router();

const apiRoutes = require('./api');
const mainPage = require('./mainpage'); //pending handlebars

router.use('/', mainPage);
router.use('/api', apiRoutes);

module.exports = router;