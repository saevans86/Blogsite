const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {


    res.render('home', {


        logged_in: req.session.logged_in
    });

});

router.get('/home', withAuth, async (req, res) => { //todo with auth
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

    try {
        const blogDeets = await Blog.findAll({
        
            where: { user_id: req.session.user_id }
        });
        const blogMap = blogDeets.get({ plain: true });

        const userProfile = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }]
        })
        const profileData = userProfile.get({ plain: true });
        res.render('home', {
            ...blogMap,
            profileData,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

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
