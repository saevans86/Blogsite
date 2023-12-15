const router = require('express').Router();
const { User, Comment, Blog } = require('../../models');

router.get('/', async (req, res) => {
	try {
		const getLogins = await User.findAll({
			include: [{ model: Comment }, { model: Blog }]
		});

		res.status(200).json(getLogins);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.post('/', async (req, res) => {
	console.log('6666666666666666666666666666666666666666666666666666666');
	try {
		const newUser = await User.create(req.body);
		console.log(req.body);

		req.session.save(() => {
			req.session.user_id = newUser.user_id;
			req.session.logged_in = true;
			res.status(200).json(newUser);
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/login', async (req, res) => {
	try {
		console.log(req.body);
		const userLogin = await User.findOne({
			where: { email: req.body.email }
		});
		if (!userLogin) {
			res.status(400).json({ message: 'Invalid e-mail' });
			return;
		}
		const validPassword = userLogin.checkPassword(req.body.password);
		console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
		console.log(validPassword);
		if (!validPassword) {
			res.status(400).json({ message: 'Invalid password' });
			return;
		}

		req.session.save(() => {
			req.session.user_id = userLogin.id;
			req.session.logged_in = true;
			res.json({ user: userLogin, message: '!!!!!!!!!!!!!!!!!!!!!!!!!!!' });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/logout', (req, res) => {
	console.log('users.js logout endpoint');
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
