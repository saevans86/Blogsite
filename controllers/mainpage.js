const router = require('express').Router();
const { Blog, User } = require('../models');
// todo withauth

router.get('/', async (req, res) => {
    try {
        const blogDeets = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const blogs = blogDeets.map((blog) => blog.get({ plain: true }));

        res.render('', { //todo pending handbars pages
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
