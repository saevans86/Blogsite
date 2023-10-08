const router = require('express').Router;
const { Blog } = require('../../models')
//todo pending withauth

router.post('/', async (req, res) => { //todo build auth in post
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        res,status(200).json(newBlog)
    } catch (err) {
        res.status(400).json(err)
    }
})