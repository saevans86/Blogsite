const router = require('express').Router();
const { Blog, User } = require('../../models')
//todo pending withauth

router.post('/', async (req, res) => { //todo build with in post
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
    try {
        const newBlog = await Blog.create({
        
            ...req.body,
            // user_id: req.session.user_id, //user routes not defined
        })
        res.status(200).json(newBlog)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/', async (req, res) => {
    console.log(')))))00000000000000000000000000000000000000000')
    try {
        const findAllBlog = await Blog.findAll({
            include: [{ model: User }]
        });

        res.status(200).json(findAllBlog);
    } catch (err) {

        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => { //todo withauth
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

module.exports = router;

