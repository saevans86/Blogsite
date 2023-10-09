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

//todo pending login/logout with password validation, session destroy


module.exports = router;