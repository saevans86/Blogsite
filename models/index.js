const User = require('./users');
const Blog = require('./blogs');
const Comment = require('./comment');

User.hasMany(Blog, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
	foreignKey: 'user_id'
});

Comment.belongsTo(User, {
	foreignKey: 'user_id'
});
Comment.belongsTo(Blog, {
	foreignKey: 'blog_id'
});
User.hasMany(Comment, {
	foreignKey: 'user_id'
});
Blog.hasMany(Comment, {
	foreignKey: 'blog_id'
});

module.exports = { User, Blog, Comment };
