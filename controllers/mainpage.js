const router = require('express').Router();
const { Blog, User } = require('../models');
// todo withauth

router.get('/', async (req, res) => {
    try {
        const blogDeets = await Blog.findAll({
            include: [{  model: User, attributes: ['name']}],
        });
        const mapBlogs = blogDeets.map((blog) => blog.get({ plain: true }));
        res.render('userprofile', { //should pull all blogs with users upon login
            mapBlogs, logged_in: req.session.logged_in
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

        res.render('blogpage', {  //used for rendering specific blogs on the blogpage
            ...blogIdMap,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/userprofile', async (req, res) => { //todo with auth
    try {
        const userDeets = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }, include: [{ model: Blog }],
        });
        const user = userDeets.get({ plain: true });
        res.render('userprofile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
