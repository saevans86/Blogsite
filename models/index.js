const User = require('./users');
const Blog = require('./blogs');

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { Blog, User };
