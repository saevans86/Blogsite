const router = require('express').Router();
const apiRoutes = require('./api');
const mainpageroutes = require('./mainpageroutes');
router.unsubscribe('/', mainpageroutes);
router.use('/api', apiRoutes);
module.exports = router;