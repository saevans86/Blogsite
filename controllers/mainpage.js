const router = require('express').Router();
const { Blog, User } = require('../models');
// todo withauth

router.get('/', async (req, res) => {
    try {
        const blogDeets = await Blog.findAll({
            include: [{  model: User, attributes: ['name']}],
        });
        const mapBlogs = blogDeets.map((blog) => blog.get({ plain: true }));
        res.render('', { //todo pending handbars pages..
            mapBlogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogDeetsById = await Blog.findByPk(req.params.id, {
            include: [{  model: User, attributes: ['name']}],
        });
        const blogIdMap = blogDeetsById.get({ plain: true });

        res.render('', { // todo build in page that pulls id for specific blog via handlebars
            ...blogIdMap,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
