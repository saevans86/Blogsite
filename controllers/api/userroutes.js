const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newUserDeets = await User.create(req.body);
// todo pending handlebars
        req.session.save(() => {
            req.session.user_id = newUserDeets.id;
            req.session.logged_in = true;

        });
            res.status(200).json(newUserDeets);
    } catch (err) {
        res.status(400).json(err);
    }
});

//should not be needed since it will be included in mainpage routes
// router.get('/', async (req, res) => {
//     // console.log('00000000000000000000000000000000000000000')
//     try {
//         const getallUsers = await User.findAll({
//             // include: [{ model: Blog }]
//         });

//         res.status(200).json(getallUsers);
//     } catch (err) {

//         res.status(500).json(err);
//     }
// });

router.post('/login', async (req, res) => {
    try {
        const userDeets = await User.findOne({ where: { email: req.body.email } });

        if (!userDeets) {
            res
                .status(400)
                .json({ message: 'incorrect user info' });
            return;
        }

        const validPassword = await userDeets.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'incorrect password' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userDeets.id;
            req.session.logged_in = true;

            res.json({ user: userDeets, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
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