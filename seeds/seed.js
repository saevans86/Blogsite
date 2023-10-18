const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
const bcrypt = require('bcrypt');

const userDeets = require('./users.json');
const blogDeets = require('./blogs.json');
const comments = require('./comment.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    for (const userPw of userDeets) {
        userPw.password =await bcrypt.hash(userPw.password, 10)
    }
    const newUser = await User.bulkCreate(userDeets);

    for (const blog of blogDeets) {
        const newBlog = await Blog.create({
            ...blog,
            user_id: newUser[Math.floor(Math.random() * newUser.length)].id,
        });

        const numRandomComments = Math.floor(Math.random() * comments.length) + 1;
        for (let i = 0; i < numRandomComments; i++) {
            await Comment.create({
                ...comments[Math.floor(Math.random() * comments.length)],
                user_id: newUser[Math.floor(Math.random() * newUser.length)].id,
                blog_id: newBlog.id,
            });
        }
    }

    process.exit(0);
};

seedDatabase();
