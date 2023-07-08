const User = require('./User');
const Book = require('./Book');
const Comment = require('./Comment')

User.hasMany(Book, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Book.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Book, {
  foreignKey: "book_id",
  onDelete: "CASCADE",
});

Book.hasMany(Comment, {
  foreignKey: "book_id",
  onDelete: "CASCADE",
}); 

module.exports = { User, Book, Comment };
