const sequelize = require('../config/connection'); //pending connection
const { User, Blog } = require('../models');

const newUserDeets = require('./users.json');
const blogDeets = require('./blogs.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const newUser = await User.bulkCreate(newUserDeets, {
        individualHooks: true,
        returning: true,
    });

    for (const blog of blogDeets) {
        await Blog.create({
            ...blog,
            user_id: newUser[Math.floor(Math.random() * newUser.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();