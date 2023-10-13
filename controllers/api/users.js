const router = require('express').Router();
const { User, Comment } = require('../../models');


router.post('/', async (req, res) => {
    try {
        const newUserDeets = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = newUserDeets.id;
            req.session.logged_in = true;
        
        });
    } catch (err) {
        res.status(400).json(err);
    }
});



router.post('/login', async (req, res) => {
    console.log('users.js ENDPOINT TEST')
    try {
        const userLogin = await User.findOne({ where: { email: req.body.email } });

        if (!userLogin) {
            res
                .status(400)
                .json({ message: 'Invalid' });
            return;
        }

        const validPassword = userLogin.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Invalid' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userLogin.id;
            req.session.logged_in = true;

            res.json({ user: userLogin, message: ':)' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    console.log('users.js logout endpoint')
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
