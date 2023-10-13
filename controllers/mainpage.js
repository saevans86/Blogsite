const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    res.render('home', {
        logged_in: req.session.logged_in
    });

});
router.get('/home', withAuth, async (req, res) => {
    try {
        console.log('PULL ALL TEST');
        const blogs = await Blog.findAll({
            where: { user_id: req.session.user_id },
            attributes: { exclude: ['password'] },
            include: [{ model: User }]
        });
        console.log(blogs);

        const blogData = blogs.map((blog) => blog.get({ plain: true }));

        res.render('home', {
            blogs: blogData, // Pass the data as an array of objects
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        console.log('PULL 1 TEST        ')
        const blogsById = await Blog.findByPk(req.params.id, {

        });

        const blogIdData = blogsById.get({ plain: true });
        console.log(blogIdData)
        res.render('blogpage', {
            ...blogIdData,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get('/blogpage', withAuth, async (req, res) => {
    try {
        const pullUsers = await Blog.findByPk(req.session.user_id, req.params.id, {
            // attributes: { exclude: ['password'] },
            // include: [{ model: User }],
        })
        console.log(pullUsers)
        const user = pullUsers.get({ plain: true });
        res.render('blogpage', {
            ...user,
            logged_in: true
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
