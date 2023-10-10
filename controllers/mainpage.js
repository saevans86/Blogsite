const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userService.login(username, password);
        req.session.user = user;
        res.redirect('/userprofile');
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});


router.get('/userprofile', withAuth, async (req, res) => { //todo with auth
    try {
        const blogDeets = await Blog.findByPk(req.session.user_id, {
        
            where: { user_id: req.session.user_id }
        });
        const blog = blogDeets.get({ plain: true });

        const userProfile = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }]
        })
        const profileData = userProfile.get({ plain: true });
        res.render('userprofile', {
            ...blog,
            profileData,
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

// router.get('/login', (req, res) => {
//     if (req.session.logged_in) {
//         res.redirect('userprofile');
//         return;
//     }

//     res.render('login');
// });

module.exports = router;
