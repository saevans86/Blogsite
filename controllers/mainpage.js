const router = require('express').Router();
const { response } = require('express');
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
	res.render('home', {
		logged_in: req.session.logged_in
	});
});
router.get('/home', withAuth, async (req, res) => {
	console.log('111111111111111111111')
	try {
		const userInfo = await User.findByPk(req.session.user_id, {
			// attributes: { exclude: ['password'] }
		});

		console.log(userInfo);
		const blogs = await Blog.findAll();

		const comments = await Comment.findAll();

		const userData = userInfo.get({ plain: true });
		const blogData = blogs.map((blog) => blog.get({ plain: true }));
		const commentData = comments.map((comment) => comment.get({ plain: true }));

		if (blogData.length === 0) {
			blogData.push({ message: 'No blogs available' });
		}
		if (commentData.length === 0) {
			commentData.push({ message: 'No comments available' });
		}

		res.render('home', {
			...userData,
			blogs: blogData,
			comments: commentData,
			logged_in: true
		});
	} catch (err) {
		console.error(err);
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
