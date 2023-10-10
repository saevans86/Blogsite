const router = require('express').Router();
const { User } = require('../../models');


router.post('/', async (req, res) => {
    try {
        const newUserDeets = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = newUserDeets.id;
            req.session.logged_in = true;
        
        });
    } catch (err) {
        res.status(400).json({ error: 'Failed to register' });
    }
});

router.post('/login', async (req, res) => {
    console.log('ENDPOINT ############### TEST')
    try {
        const userDeets = await User.find({ where: { email: req.body.email } });

        if (!userDeets) {
            return res.status(400).json({ error: 'Incorrect user info' });
        }

        const validPassword = await userDeets.checkPassword(req.body.password);

        if (!validPassword) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        req.session.save(() => {
            req.session.user_id = userDeets.id;
            req.session.logged_in = true;
            res.redirect('/home')
           
        });
    } catch (err) {
        res.status(400).json({ error: 'Login failed' });
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
