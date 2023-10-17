const router = require('express').Router();
const { User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const loadComments = await Comment.findAll({
            include: [{ model: User }]
        });

        res.status(200).json(loadComments);
    } catch (err) {

        res.status(500).json(err);
    }
});


// router.post('/', async (req, res) => {
//     try {
//         const newComment = await Comment.create(req.body);
//         req.session.save(() => {
//             req.session.user_id = newComment.id;
//             req.session.logged_in = true;

//         });
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });


// router.delete('/:id', withAuth, async (req, res) => {
  
//     try {
//         const deletedComment = await Comment.destroy({
//             where: {
//                 id: req.params.id,
//                 user_id: req.session.user_id,
//             },
//         });

//         if (!deletedComment) {
//             res.status(404).json({ message: 'Comment does not exist' });
//             return;
//         }

//         res.status(200).json(deletedComment);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;