const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
	res.render('home', {
		// logged_in: req.session.logged_in
	});
});

router.get('/home', withAuth, async (req, res) => {
	try {
		const userInfo = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] }
		});

		const blogs = await Blog.findAll({
			where: { user_id: req.session.user_id }
		});

		const comments = await Comment.findAll({
			where: { user_id: req.session.user_id }
		});
		console.log(blogs);

		const userData = userInfo.get({ plain: true });
		const blogData = blogs.map((blog) => blog.get({ plain: true }));
		const comment = comments.map((comments) => comments.get({ plain: true }));

		res.render('home', {
			...userData,
            blogs: blogData,
            comment: comment,

			logged_in: true
		});
	} catch (err) {
		res.status(500).json(err);
	}
});



router.get('/blog/:id', withAuth, async (req, res) => {
	try {
		console.log('PULL 1 TEST MAINPAGE.JS');
		const blogsById = await Blog.findByPk(req.params.id, {
			include: [{ model: Comment }]
		});

		const blogIdData = blogsById.get({ plain: true });
		console.log(blogIdData);
		res.render('blog', {
			...blogIdData,
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
