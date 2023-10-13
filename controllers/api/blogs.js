const router = require('express').Router();
const { Blog, User } = require('../../models')
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const findAllBlog = await Blog.findAll({
            include: [{ model: User }]
        });

        res.status(200).json(findAllBlog);
    } catch (err) {

        res.status(500).json(err);
    }
});
router.get('/:id', withAuth, async (req, res) => {
    try {
        const blogById = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    include: 'name'

                }
            ]
        })

        res.status(200).json(blogById)
    } catch (err) {
        // console.error(err)
        res.status(500).json(err)
    }
})
router.delete('/:id', withAuth, async (req, res) => {
    // console.log('#######################################')
    try {
        const deleteBlog = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!deleteBlog) {
            res.status(404).json({ message: 'Does not exist' });
            return;
        }

        res.status(200).json(deleteBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({

            ...req.body,
            user_id: req.session.user_id,
        })
        res.status(200).json(newBlog)
    } catch (err) {
        res.status(400).json(err)
    }
})




// todo put route
module.exports = router;

