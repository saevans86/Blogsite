const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {


    res.render('home', {


        logged_in: req.session.logged_in
    });

});

router.get('/', async (req, res) => {
    try {
        console.log('777777777777777777777777777')
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const blogStuff = blogData.map((blog) => blog.get({ plain: true }));
       
        res.render('home', {
            blogStuff,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/home', withAuth, async (req, res) => {
    try {
        console.log(userDeets)
        const userDeets = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userDeets.get({ plain: true });

        res.render('home', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/blog/:id', async (req, res) => {
    try {
        const blogDeetsById = await Blog.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['name'] }],
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

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/home');
        return;
    }
    res.render('login');
});

module.exports = router;
